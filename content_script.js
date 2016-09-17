// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

document.body.addEventListener("dblclick", function(e){
	var selectedText = window.getSelection().toString().trim();
	if (selectedText.length > 0) {
    chrome.runtime.sendMessage({message: selectedText});
    var y_pos = document.body.scrollTop + e.clientY;
    var x_pos = document.body.scrollLeft + e.clientX;
    renderBubble(x_pos, y_pos);
  }
});

// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  bubbleDOM.style.visibility = 'hidden';
  bubbleDOM.innerHTML = "";
}, true);


chrome.runtime.onMessage.addListener(function(request, sender) {
  if(!sender.tab) {
   var result = request.meaning;
   bubbleDOM.innerHTML = result;
    	// showDialog(result);
    	//result = result.replace(/(\r\n|\n|\r)/gm,"");
    	//console.log(result);
    	// alert(result);
    }
  });

function renderBubble(mouseX, mouseY) {
  bubbleDOM.style.top = (mouseY + 20) + 'px';
  bubbleDOM.style.left = (mouseX - 150) + 'px';
  bubbleDOM.style.visibility = 'visible';
}

// function showDialog(textContent){
// 	var dialog = document.createElement("dialog");
// 	dialog.innerHTML= textContent;
// 	var button = document.createElement("button");
// 	button.textContent = "Close";
// 	dialog.appendChild(button);
// 	button.addEventListener("click", function() {
// 	  dialog.close();
// 	});
// 	document.body.appendChild(dialog);
// 	dialog.showModal();

// 	window.onclick = function(event) {
// 	  if (event.target == dialog) {
// 	      dialog.close();
// 	  }
// 	}
// }




