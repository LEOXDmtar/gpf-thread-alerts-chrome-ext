function Update(p_oCallback) {
	var forums = Object.keys(JSON.parse(localStorage["options"]));
	var oldData = !localStorage["data"] ? {rss: []} : JSON.parse(localStorage["data"]);
	var data = {rss: []};
	var newItems = 0;
	var requestsLeft = forums.length;

	for (var i = 0; i < forums.length; i++) {
		var url = "https://productforums.google.com/forum/feed/" + forums[i] + "/topics/rss.xml?num=15";
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
		if (newItems > 0)
			chrome.browserAction.setBadgeText({'text': newItems + ""});
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

function notifyMe() {
  if (!Notification) {
    alert('Please us a modern version of Chrome, Firefox, Opera or Firefox.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();

  var notification = new Notification('TC Alerts', {
    icon: 'img/nothreads.png',
    body: "Test",
  });


  notification.onclick = function () {
    window.open(url);
  }
}

