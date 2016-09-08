document.body.addEventListener("dblclick", function(){
	var selectedText = window.getSelection().toString().trim();
	chrome.runtime.sendMessage({message: selectedText});
});


chrome.runtime.onMessage.addListener(function(request, sender) {
    if(!sender.tab){
    	var result = "<b>"+request.word +"</b><br>"+request.meaning;
    	//result = result.replace(/(\r\n|\n|\r)/gm,"");
    	console.log(result);
    	showDialog(result);
    }
});

function showDialog(textContent){
	var dialog = document.createElement("dialog");
	dialog.textContent = textContent;
	var button = document.createElement("button");
	button.textContent = "Close";
	dialog.appendChild(button);
	button.addEventListener("click", function() {
	  dialog.close();
	});
	document.body.appendChild(dialog);
	dialog.showModal();
}




