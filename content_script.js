var bubbleDOM = null;

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
  if(bubbleDOM!=null && bubbleDOM.style.visibility == 'visible'){
    bubbleDOM.style.visibility = 'hidden';
    bubbleDOM.innerHTML = "";
  }
}, true);


chrome.runtime.onMessage.addListener(function(request, sender) {
  if(!sender.tab) {
    var result = request.meaning;
    bubbleDOM.innerHTML = result;
  	//result = result.replace(/(\r\n|\n|\r)/gm,"");
  	// alert(result);
    }
  });

function renderBubble(posX, posY) {
  // Add bubble to the page.
  if(bubbleDOM==null){
    bubbleDOM = document.createElement('div');
    bubbleDOM.setAttribute('class', 'selection_bubble');
    document.body.appendChild(bubbleDOM);
  }
  
  bubbleDOM.style.top = (posY + 20) + 'px';
  bubbleDOM.style.left = (posX - 150) + 'px';
  bubbleDOM.style.visibility = 'visible';
}




