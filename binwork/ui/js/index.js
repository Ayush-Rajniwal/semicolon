$(document).ready(function (){ 

  $("#menu").click(function(){ 

    $("#sidebar").toggle();
  });
        
    if (/firefox/.test(navigator.userAgent.toLowerCase())) {
      console.log("Firefox");
      } else {
        console.log("Other than Firefox");
        if(wid<750){
        $("#sidebar").addClass("ml-3"); //For rotate screen
        $("#screen").addClass("ml-3");
        $("#navbar").addClass("ml-3");
      console.log("hello");
      }
    }
        
      var wid = $( document ).width();
        if (wid > 750){
        $("#menu").hide(); //So that, menu button will only appear for small screen
        }
        if(wid<750){
        $("#sidebar").addClass("col-sm-3"); //For rotate screen
        $("#screen").addClass("col-sm-9");
        console.log("hello");
        }
    });

  //Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 10px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};


    function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

    function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}