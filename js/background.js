var result = null;
var active = true;

chrome.browserAction.onClicked.addListener(function(tab) {
	if(active) {
		chrome.browserAction.setTitle({title:"Click to Enable"});
		chrome.browserAction.setIcon({path:"images/icon48_disabled.png"});
	} else {
		chrome.browserAction.setTitle({title:"Click to Disable"});
		chrome.browserAction.setIcon({path:"images/icon48.png"});
	}
	active = !active;
})

chrome.extension.onMessage.addListener(function(request, sender){
	if(active) {
		getMeaning(request.message);
	} else {
		result = {};
		result["active"] = active;
		sendResult(result);
	}
});

function getMeaning(word){
	var url = "http://services.aonaware.com/DictService/DictService.asmx/Define?word="+String(word);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			parseXmlData(word,xmlHttp.responseXML);      
		}
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.send(null);
}

function parseXmlData(word,xmlDoc){
	result = {};
	result["word"] = word;

	var x = xmlDoc.getElementsByTagName("Definition");
	var meaning,alt = null;
	
	for(var i=x.length-1;i >= 0;i--){
		var dictionaryId = x[i].getElementsByTagName("Dictionary")[0].getElementsByTagName("Id")[0].firstChild.data;
		if(meaning==null){
			if(dictionaryId.valueOf()== new String("wn").valueOf()){
				meaning = x[i].getElementsByTagName("WordDefinition")[0].firstChild.data;
				break;
			}else if(dictionaryId.valueOf()== new String("gcide").valueOf()){
				meaning = x[i].getElementsByTagName("WordDefinition")[0].firstChild.data;
				break;
			}else if(dictionaryId.valueOf()== new String("foldoc").valueOf()){
				meaning = x[i].getElementsByTagName("WordDefinition")[0].firstChild.data;
				break;
			}else{
				alt = x[i].getElementsByTagName("WordDefinition")[0].firstChild.data;
			}
		}
	}
	if(meaning==null) {
		if(alt!=null) {
			meaning = alt;
		}else meaning = "No meanings found";
	}	
	result["meaning"] = meaning;
	result["active"] = active;
	sendResult(result);
}

function sendResult(result){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, result);
	});
}




