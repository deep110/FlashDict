
document.body.addEventListener("dblclick", function(){
	var selectedText = window.getSelection().toString();
	console.log(selectedText);
});

chrome.runtime.onMessage.addListener(
  function(request, sender) {
  	if(!sender.tab){
  		var text = request.message;
    	console.log("msg received is: "+text);
  	}
    
  
});

function getMeaning(word){

	var url = "http://services.aonaware.com/DictService/DictService.asmx/Define?word="+String(word);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            var a = xmlHttp.responseXML;
            console.log(a);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}