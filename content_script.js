var $x=0,$y=0;
// Add bubble to the top of the page.
var $box = $("<div>", {"class": "box_overlay"});
$("body").append($box);
$box = $(".box_overlay");

$("body").dblclick(function(e){
  var selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    chrome.runtime.sendMessage({message: selectedText});
    console.log("left3:" + $(window).scrollLeft() + " , top3:" + $(window).scrollTop());
    $x = $(window).scrollLeft() + e.clientX;
    $y = $(window).scrollTop() + e.clientY;
    $box.addClass("visible");
  }
});

// Close the bubble when we click on the screen.
$("body :not(.box_overlay)").on("click", function () {
  $box.removeClass("visible");
  $box.html("");
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if(!sender.tab) {
   var result = request.meaning;
   $box.html(result);
 }
});

$box.bind("DOMSubtreeModified",function(){
  // $a = $(this).offset();
  console.log("left1:"+ $x + " , top1:" + $y);
  $x -= $(this).width()/2;
  $y -= $(this).height() + 50;
  console.log("left2:"+ $x + " , top2:" + $y);
  if($x<0)
    $x=0;
  if($y<0)
    $y += $(this).height() + 60;
  $(this).offset({top:($y>0?$y:0),left:$x});
});
