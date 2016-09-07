
chrome.commands.onCommand.addListener(function (command) {
    if (command === "find") {
        chrome.tabs.executeScript( {
		  	code: "window.getSelection().toString();"
			}, function(selection) {
				sendMessage(selection[0]);
		});

    }
});

function sendMessage(message){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, {message: message});
	});
}


