// background.js


var iframe_on = null;

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({'key': false})


})


chrome.commands.onCommand.addListener((command) => {
	console.log(`Command "${command}" triggered`);
	console.log('iframe value: '+iframe_on);

	//get current tab
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		//get tab id
		let tabId = tabs[0].id;
		let targetted = { tabId: tabId};
		if (iframe_on == null || iframe_on == false) {
			console.log("downloading without iframe");
			chrome.scripting.executeScript({
				target: targetted,
				files: ['content.js'],
			});
		} else {
			console.log("downloading with iframe");
			chrome.scripting.executeScript({
				target: targetted,
				files: ['content2.js'],
			});
		}
	});

});


chrome.storage.onChanged.addListener(function (changes, areaName) {
	if (areaName == "local") {
		for (key in changes) {
			var storageChange = changes[key];
			if (key === "key") {
				console.log('Storage key "%s" in namespace "%s" changed. ' +
					'Old value was "%s", new value is "%s".',
					key,
					areaName,
					storageChange.oldValue,
					storageChange.newValue);
				console.log(typeof storageChange.newValue);
				iframe_on = storageChange.newValue;
			}
		}
	}
})

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

	//iframe_on=msg;
	//console.log(iframe_on);
	/*
	chrome.storage.sync.get("key", function (obj) {
		console.log(obj);

	});*/

	console.log(msg);

})