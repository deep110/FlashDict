
chrome.commands.onCommand.addListener(function (command) {
    if (command === "find") {
        chrome.tabs.executeScript( {
		  	code: "window.getSelection().toString();"
			}, function(selection) {
				console.log(selection.length);
		  		alert(selection[0]);
		});
    }
});