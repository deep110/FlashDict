
chrome.commands.onCommand.addListener(function (command) {
    if (command === "find") {
        chrome.tabs.executeScript( {
		  	code: "window.getSelection().toString();"
			}, function(selection) {
				console.log(selection[0]);
				getMeaning("hello");
		  		//alert(selection[0]);
		});
    }
});

function getMeaning(word){

	var url = "http://services.aonaware.com/DictService/DictService.asmx/Define?word="+String(word);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            console.log("request executed");
            var a = xmlHttp.responseXML;
            console.log(a);
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}