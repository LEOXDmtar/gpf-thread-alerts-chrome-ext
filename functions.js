// Global variables
var _gaq = _gaq || [];
var search_date = getYesterdaysDate();
var base_url = "https://productforums.google.com/forum/search/?q=-has:authoritativereply%20-is:duplicate%20-is:answered%20-is:complete%20-is:bestanswer%20after:" + search_date;

// Functions
function storageWrite(key, value) {
  var save = {};
  save[key] = value;
  chrome.storage.sync.set(save, function() {
		console.log(key + ":" + value +" saved");
		if (chrome.runtime.error) {
			console.log("Runtime error.");
		}
	});
}

function getYesterdaysDate() {
  var date = new Date();
  date.setDate( date.getDate() - 2 );
  return date.getFullYear() + '/' + ( date.getMonth() + 1 ) + '/' + date.getDate();
}



function Update(p_oCallback) {
  chrome.storage.sync.get('tc-forums', function(items){
    localStorage["options"] = items['tc-forums'];
  });

	var forums = localStorage["options"].split(',');
	var oldData = !localStorage["data"] ? {rss: []} : JSON.parse(localStorage["data"]);
	var data = {rss: []};
	var newItems = 0;
	var requestsLeft = forums.length;
  console.log(forums);
	for (var i = 0; i < forums.length; i++) {
		var url = "https://productforums.google.com/forum/feed/" + forums[i] + "/topics/rss.xml?num=15";
		console.log(url);
		$.ajax({
			url: url,
			dataType: "xml",
			success: (function(id) {
				return function(xml) {
					$(xml).find("item:lt(10)").each(function() {
						if (new Date($(this).find("pubDate").text()) > new Date(localStorage["lastDate"]))
							newItems++;
						data.rss.push({
							pubDate: $(this).find("pubDate").text(),
							author: $(this).find("author").text(),
							title: $(this).find("title").text(),
							desc: $(this).find("description").text(),
							guid: $(this).find("guid").text(),
							forum: forums[id]
						});
					});
					requestsLeft--;
					if (requestsLeft <= 0)
						save();
				};
			})(i),
			fail: function() {
				requestsLeft--;
				if (requestsLeft <= 0)
					save();
			}
		});
	}

	function save() {
		console.log("Save");
		if (newItems > 0) {
			chrome.browserAction.setBadgeText({'text': newItems + ""});
			chrome.browserAction.setIcon({path: 'img/threads.png'});
		}
			//notifyMe();
		data.rss.sort(function(a, b) {
			return new Date(b.pubDate) - new Date(a.pubDate);
		});
		for (var i = 0; i < data.rss.length; i++)
			for (var j = 0; j < oldData.rss.length; j++) {
				if (data.rss[i].guid == oldData.rss[j].guid) {
					data.rss[i].seen = oldData.rss[j].seen;
					break;
				}
			}
		localStorage["data"] = JSON.stringify(data);
		if (p_oCallback !== undefined)
			p_oCallback();
	}
};

function setIcon() {
  var t = JSON.parse(localStorage["threads"]);
  t = t.rss;
	if(t.length <= 0) {
		//green
		chrome.browserAction.setIcon({path: 'img/nothreads.png'});
		chrome.browserAction.setBadgeText({text: ""});
	} else {
		//red
		chrome.browserAction.setIcon({path: 'img/threads.png'});
		chrome.browserAction.setBadgeText({text: t.length.toString()});
		if(localStorage["count"] > localStorage["oldCount"]) {
		  notifyMe(t.length.toString());
		}
		//Notify here
	}
};

function generateDOM() {
  var forums = [];
  var t = JSON.parse(localStorage["threads"]);
  var dismissedItems = [];
  if(localStorage["dismissed"]) {
    dismissedItems = localStorage["dismissed"];
  }
  t = t.rss;
  $('#results').empty();
  if(t.length === 0) {
    $('#results').css("background-color","#7baaf7");
    $('#results').append('<img class="zeroinbox" src="img/ic_zero_inbox_2x.png"></img>');
  }
  for(var i in t) {
    var forum = t[i].url.split("/")[5];
    var id = t[i].url.split("/")[6];

    if(forums.indexOf(forum) === -1){
      $('#results').css("background-color","#fff");
      $('#results').append(
        '<section id="' + forum + '" class="forum">' +
        '<div class="header">' + forum + '</div>' +
        '</section>'
        );
      forums.push(forum);
    }

    if(dismissedItems.indexOf(id) === -1){
     //console.log(id + " hidden");

      $('#'+forum).append(
        '<core-item id="item-' + id + '" class="thread-item" horizontal="" center="" layout="">' +
          '<a href="' + t[i].url + '" target="_blank"></a>' +
          '<div flex="">' +
            '<div class="title"><truncate-text characters="40" break-last-word="true" class="title">' + t[i].title + '</truncate-text></div>' +
            '<div class="snippet"><truncate-text characters="70" break-last-word="true" class="snippet">' + t[i].snippet + '</truncate-text></div>' +
          '</div>' +
          '<div>' +
            '<div class="time">' + $.timeago(parseInt(t[i].date)) + '</div>' +
        '<div class="close"><core-icon id="' + id + '" icon="check"></core-icon></div></div></core-item>'
      );
    }
  }
}

var notifyMe = function(c) {
  if (!Notification) {
    alert('Please us a modern version of Chrome, Firefox, Opera or Firefox.');
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  var text = "threads";
  if(c === 1) {
    text = "thread";
  }

  var notification = new Notification('New Threads for you!', {
    icon: 'img/gpfalert.png',
    body: "There are " + c + " " + text + " that need your attention!"
  });
}

chrome.runtime.onInstalled.addListener(function() {
	if (!localStorage["lastDate"]) {
		localStorage["lastDate"] = Date.now().add({days: -1}).toString();
	};
	chrome.storage.sync.get('tc-forums', function(items){
	  if(!items['tc-forums']) {
	    console.log("no Data");
	    chrome.tabs.create({"url":"options.html"});
	  } else {
	    console.log("data");
	    Update();
		  chrome.alarms.create({periodInMinutes: 1});
	  }
  });
});

chrome.runtime.onStartup.addListener(function() {
	if (!localStorage["lastDate"]) {
		localStorage["lastDate"] = Date.now().add({days: -1}).toString();
	};
	chrome.storage.sync.get('tc-forums', function(items){
	  if(!items['tc-forums']) {
	    console.log("no Data");
	    chrome.tabs.create({"url":"options.html"});
	  } else {
	    console.log("data");
	    Update();
		  chrome.alarms.create({periodInMinutes: 1});
	  }
  });
});

chrome.alarms.onAlarm.addListener(function() {
	Update();
});