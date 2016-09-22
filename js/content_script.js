var $x=0,$y=0;

// Add bubble to the top of the page.
var $box = $("<div>", {"class": "box_overlay"});
$("body").append($box);
$box = $(".box_overlay");

$("body").dblclick(function(e){
  var selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    selectedText = pluralize(selectedText,1);
    $x = $(window).scrollLeft() + e.clientX;
    $y = $(window).scrollTop() + e.clientY;
    chrome.runtime.sendMessage({message: selectedText});
  }
});

// Close the bubble when we click on the screen.
$("body :not(.box_overlay)").on("click", function () {
  $box.removeClass("visible");
  $box.html("");
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if(!sender.tab) {
    if(request.active) {
      $box.html(request.meaning);
    }
  }
});

$box.bind("DOMSubtreeModified",function(){
  $box.addClass("visible");
  $x -= $(this).width()/2;
  $y -= $(this).height() + 50;
  if($x<0)
    $x=0;
  if($y<0)
    $y += $(this).height() + 60;
  $(this).offset({top:($y>0?$y:0),left:$x});
});
