document.body.addEventListener("dblclick", function(){
	var selectedText = window.getSelection().toString().trim();
	chrome.runtime.sendMessage({message: selectedText});
});


chrome.runtime.onMessage.addListener(function(request, sender) {
    if(!sender.tab){
    	var result = request.meaning;
    	//result = result.replace(/(\r\n|\n|\r)/gm,"");
    	//console.log(result);
    	alert(result);
    }
});

function showDialog(textContent){
	var dialog = document.createElement("dialog");
	dialog.innerHTML= textContent;
	var button = document.createElement("button");
	button.textContent = "Close";
	dialog.appendChild(button);
	button.addEventListener("click", function() {
	  dialog.close();
	});
	document.body.appendChild(dialog);
	dialog.showModal();

	window.onclick = function(event) {
	  if (event.target == dialog) {
	      dialog.close();
	  }
	}
}




