


    $(document).ready(function (){ 

        $("#menu").click(function(){ 

          $("#sidebar").toggle();
        });
        
        $(document).ready(function (){ 
          var wid = $( document ).width();
          console.log(wid);
          if (wid > 600){
              $("#menu").hide();
          }
      })
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