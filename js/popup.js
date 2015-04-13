$(function() {
	$('#results').empty();
	$('#overlay').hide();
  	$('#results').show();
	var oDate2 = new Date(localStorage["lastDate"]);
	var data = JSON.parse(localStorage["data"]);
	console.log(data.rss);
	var forums = [];
	for (var i=0; i<Math.min(20, data.rss.length); i++) {
		var forum = data.rss[i].forum;
		var oDate = new Date(data.rss[i].pubDate);
		var timestamp = (oDate.getDate()<10?"0":"")+oDate.getDate()+'.'+(oDate.getMonth()+1<10?"0":"")+(oDate.getMonth()+1)+'.'+oDate.getFullYear()+'&nbsp; &nbsp;'+(oDate.getHours()<10?"0":"")+oDate.getHours()+':'+(oDate.getMinutes()<10?"0":"")+oDate.getMinutes()

		if(forums.indexOf(forum) === -1){
			console.log(data.rss[i].forum);
			$('#results').css("background-color","#fff");
      		$('#results').append(
      			'<ul class="collection z-depth-1" id="' + forum + '">' +
      			'<li class="collection-header"><h6><strong>' + forum + '</strong></h6></li>' + 
      			'</ul>'
        	);
			forums.push(forum);
		}

		if(oDate - oDate2 > 0) {
			var isNew = '<a class="secondary-content" style="color:green;"><i class="mdi-av-new-releases small"></i></a>';
		} else {
			var isNew = '';
		}

		if(data.rss[i].seen) {
			//hide content
		} else {
			//show
		}

		$('#'+forum).append(
	        '<li class="collection-item avatar" id="' + i + '" style="cursor:pointer;">' + 
	        '<i class="mdi-action-question-answer circle green"></i>' + 
	        '<p class="title truncate"><strong>' + data.rss[i].title + '</strong></p>' +
	        '<p class="truncate" style="font-size: 12px;">' + data.rss[i].desc + '<br>' + 
	        '<span class="grey-text">By ' + data.rss[i].author + '' + timestamp + '</span>' +
	        '</p>' +
	        isNew +
	        '</li>'
      	);

		var oDate = new Date(data.rss[i].pubDate);
	};
	chrome.browserAction.setBadgeText({'text': ""});
	chrome.browserAction.setIcon({path: 'img/nothreads.png'});
	if (data.rss.length > 0)
		localStorage["lastDate"] = data.rss[0].pubDate;
	$('.collection-item').click(function() {
		console.log($(this));
		data.rss[$(this).attr('id')].seen = 1;
		localStorage["data"] = JSON.stringify(data);
		chrome.tabs.create({url: data.rss[$(this).attr('id')].guid});
	});
});