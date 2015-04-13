$(function() {
	$(document).ready(function(){
    	$('.collapsible').collapsible({
      		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    	});
  	});

  	var data = (localStorage["options"] ? JSON.parse(localStorage["options"]) : {});

  	//console.log(data);

  	$("input[name=product]").each(function() {
  		var that = $(this).context;
		if (data[$(this).attr("id")])
			$(this).attr("checked", "checked");
	}).change(function() {
		if ($(this).is(":checked"))
			data[$(this).attr("id")] = 1;
		else {
			delete data[$(this).attr("id")];
		}
	});

  	$('#save').click(function(){
  		toast('Settings saved!', 2000);

  		if (Object.keys(data) == 0) {
			delete localStorage["options"];
			chrome.browserAction.setPopup({"popup":""});
			chrome.alarms.clearAll();				
			return;
		}

		localStorage["options"] = JSON.stringify(data);
		Update(window.close);
		//setTimeout( function() { window.close(); }, 1000);
  		chrome.alarms.create({periodInMinutes: 1});
  	});
});