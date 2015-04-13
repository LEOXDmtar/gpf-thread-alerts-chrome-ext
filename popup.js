var _gaq = _gaq || [];
_gaq.push(['_trackEvent', 'Popup-new', 'Popup opened']);

var data = JSON.parse(localStorage["data"]);

function dismiss(e) {
  if (e.target !== e.currentTarget) {
    data.rss[$(e.target).attr('id')].seen = 1;
    localStorage["data"] = JSON.stringify(data);
    console.log(data.rss);
  }
}

$(function() {
	$('#results').empty();
  $('#results').show();
	var oDate2 = new Date(localStorage["lastDate"]);
	var data = JSON.parse(localStorage["data"]);


	console.log(data.rss);
	var forums = [];
	if(data.rss.length === 0) {
    $('#results').css("background-color","#7baaf7");
    $('#results').append('<img class="zeroinbox" src="img/ic_zero_inbox_2x.png"></img>');
  }
  console.log(data.rss);
	for (var i=0; i<data.rss.length; i++) {
		var forum = data.rss[i].forum;
		var oDate = new Date(data.rss[i].pubDate);
		var timestamp = (oDate.getDate()<10?"0":"")+oDate.getDate()+'.'+(oDate.getMonth()+1<10?"0":"")+(oDate.getMonth()+1)+'.'+oDate.getFullYear()+'&nbsp; &nbsp;'+(oDate.getHours()<10?"0":"")+oDate.getHours()+':'+(oDate.getMinutes()<10?"0":"")+oDate.getMinutes()


		if(forums.indexOf(forum) === -1){
      $('#results').css("background-color","#fff");
      $('#results').append(
        '<section id="' + forum + '" class="forum">' +
        '<div class="header">' + forum + '</div>' +
        '</section>'
        );
      forums.push(forum);
    }

		if(oDate - oDate2 > 0) {
			var isNew = '<core-icon class="new" icon="mail"></core-icon>';
		} else {
			var isNew = '<core-icon class="unread" icon="mail"></core-icon>';
		}

		if(data.rss[i].seen) {
			var isNew = '<core-icon class="read" icon="drafts"></core-icon>';
		}

  	if(data.rss[i].author.indexOf('@') === -1){
  	  console.log("TC");
  	  var author = data.rss[i].author;
  	} else {
  	  console.log("Googler");
  	  var author = data.rss[i].author.split("(")[1].split(")")[0];
  	}
    $('#'+forum).append(
      '<core-item class="thread-item" horizontal="" center="" layout="">' +
        '<a href="' + data.rss[i].guid + '" id="' + i + '" target="_blank"></a>' +
        '<div flex="">' +
          '<div class="title"><truncate-text characters="40" break-last-word="true" class="title">' + data.rss[i].title + '</truncate-text></div>' +
          '<div class="snippet"><truncate-text characters="60" break-last-word="true" class="snippet">' + data.rss[i].desc + '</truncate-text></div>' +
        '</div>' +
        '<div>' +
          '<div class="time">' + timestamp + '</div>' +
          '<div class="close">' + isNew + '</div>'+
        '</div></core-item>'
    );

		var oDate = new Date(data.rss[i].pubDate);
	};
	chrome.browserAction.setBadgeText({'text': ""});
	chrome.browserAction.setIcon({path: 'img/nothreads.png'});
	if (data.rss.length > 0)
		localStorage["lastDate"] = data.rss[0].pubDate;
});

var _gaq = _gaq || [];
_gaq.push(['_trackEvent', 'Popup-new', 'Popup opened']);

//document.addEventListener('DOMContentLoaded', generateDOM);

chrome.browserAction.setBadgeText({'text': ""});
chrome.browserAction.setIcon({path: 'img/nothreads.png'});

document.addEventListener('polymer-ready', function(){
  //document.querySelector("#results").addEventListener('click', dismiss, false);
});

document.querySelector("#results").addEventListener('click', dismiss, false);

document.getElementById("settings").addEventListener('click', function() {
  _gaq.push(['_trackEvent', 'Options-new', 'Options opened']);
  chrome.tabs.create({'url': 'options.html'});
});
