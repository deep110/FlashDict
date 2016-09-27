$x=0,$y=0;

// Add bubble to the top of the page.
$box = $("<div>", {"class": "box_overlay"});
$content = $("<div>",{"class": "meaning_content"});
$moreButton = $("<div>",{"class": "more_button"});
$moreLink = $("<a>",{"target":"_blank"});
$moreButton.append($moreLink);
$box.append($content);
$box.append($moreButton);
$("body").append($box);

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
$("body :not(.box_overlay, .box_overlay *)").on("click", function () {
  changeContent('','');
  $box.removeClass("visible");
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if(!sender.tab) {
    if(request.active) {
      changeContent(request.word, request.meaning);
    }
  }
});

$box.bind("DOMSubtreeModified",function(){
  $box.addClass("visible");
  $x -= $(this).width()/2;
  $y -= $(this).height() + 50;
  if($x<0) $x=0;
  if($y<0) $y += $(this).height() + 60;
  $(this).offset({top:($y>0?$y:0),left:$x});
});

function changeContent(word, meaning) {
  if(meaning.length == 0) {
    $moreButton.hide();
  } else {
    if(meaning.length > 500) {
      meaning = meaning.substring(0,500).concat('...');
    }
    meaning = '<pre>' + meaning + '</pre>';
    $moreLink.attr('href','http://www.google.com/search?q='+encodeURIComponent(word));
    $moreButton.show();
  }
  $content.html(meaning);
}
