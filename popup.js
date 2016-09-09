var modal = document.getElementById('myModal');
var jsonData = chrome.extension.getBackgroundPage().result;
console.log(jsonData);

document.getElementById("main-text").innerHTML = "<b>"+jsonData.word +"</b><br>"+jsonData.meaning;

var span = document.getElementsByClassName("close-modal")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}
