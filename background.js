chrome.extension.onMessage.addListener(function(request, sender){
 	getMeaning(request.message); 	
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
	var jsonResult = {};
	jsonResult["word"] = word;

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
	jsonResult["meaning"] = meaning;
	sendResult(jsonResult);
}

function sendResult(result){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  	chrome.tabs.sendMessage(tabs[0].id, result);
	});
}




