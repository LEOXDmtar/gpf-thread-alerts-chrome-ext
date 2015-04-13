chrome.runtime.onInstalled.addListener(function() {
	console.log("OnInstall");
	if (!localStorage["lastDate"]) {
		localStorage["lastDate"] = Date.now().add({days: -1}).toString();
	};
	if (!localStorage["options"]) {
		chrome.tabs.create({"url":"options.html"});
	} else {
		console.log("Options set");
		Update();
		chrome.alarms.create({periodInMinutes: 1});
	};
});

chrome.runtime.onStartup.addListener(function() {
	console.log("OnStartup");
	if (localStorage["options"]) {
		Update();
		chrome.alarms.create({periodInMinutes: 1});
	};
});

chrome.alarms.onAlarm.addListener(function() {
	Update();
});

