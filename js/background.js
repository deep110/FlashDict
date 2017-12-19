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
			result["meaning"] = meaning;
			result["active"] = active;
			sendResult(result);
		}else {
			searchWikipedia(word);
		}
	}else {	
		result["meaning"] = meaning;
		result["active"] = active;
		sendResult(result);
	}	
}


function searchWikipedia(word){
	var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ word +"&format=json";
	$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json; charset=utf-8",
			async: false,
        	dataType: "json",
			success: function(data, status, jqXHR) {
        		parseWikiXmlData(word, data);
        	}
		}
	);   
}

function parseWikiXmlData(word,data){

	var horizontal_space = "     ";

	var meaning = word + "\n" + horizontal_space;

	if (data[1].length == 0){
		meaning = "No meaning found!!"
	}else{
		$.each( data[1], function( key, value ) {

			// display the related word
			var index = key + 1;
			meaning = meaning + index.toString() + ": " + data[1][key] + ": ";

			// indent the meaning of the word obtained
			var word_meaning = data[2][key];
			var words_array = word_meaning.split(" ");
			
			// display the first line of the meaning found
			var words_first_line = 6;
			var first_line_words = words_array.slice(0, words_first_line);
			var first_line_string = first_line_words.join(" ");
	  		meaning = meaning + first_line_string + "\n" + horizontal_space;

			var rest_line_words = words_array.slice(words_first_line, words_array.length);
			var words_per_line = 9;

			// display the remaining lines of the meaning
			for (var i = 0; i < rest_line_words.length; i += words_per_line){
	  			var limit = Math.min(i + words_per_line, rest_line_words.length);
	  			var one_line_words = rest_line_words.slice(i, limit);
	  			var one_line_string = one_line_words.join(" ");
	  			meaning = meaning + one_line_string + "\n" + horizontal_space;
	  		}
		});
	}

	result = {};
	result["word"] = word;	
	result["meaning"] = meaning;
	result["active"] = active;
	sendResult(result);
}

function sendResult(result){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, result);
	});
}
