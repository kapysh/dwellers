$(document).ready(function() {

  function chuteLoop() {
    var i = 0;
    body = $('body');
    setInterval(function() {
      body.append('<div class="chute-container" id="' + i + '"></div>');
      var chute = $("#"+i); //caching selector

      chute.css({"left": ((Math.random()*100) - 10) + "%"});
      chute.animate({"bottom":"0%"}, 20000,"linear", function(){chute.remove()}); //using linear to start the animation faster

      //applying draggable: stopping animation ondragstart, switching to class that uses same image as hover
      //so that when dragging, the icon doesn't flicker when the cursor isn't directly above it
      chute.draggable({
        start: function(){
          chute.switchClass("chute-container","chute-dragging",0);  
          chute.stop();
          chute.clearQueue();
        },
        stop: function(){
          chute.switchClass("chute-dragging","chute-container",0);
          chute.animate({top:"88%"}, 20000, "linear");
        }
      });

      i++;  //incrementing counter
    }, 1200);
  }  
  //initiating chute destruct sequence when submit is pressed. timeout is so that the
  //chutes hit the bottom of the page independently
  $("input[type='submit']").click(function(){
    $(".chute-container").each(function(index){
      var self = this;
      setTimeout(function(){
        chutePop(self);
      }, index*50);
    });
  });

  var prev;
  //animating random chutes while typing in inputbox
  $("input[type='email']").keypress(function(){
    if(i < 20){
      var random = Math.floor(Math.random() * i);
    }
    else{
      var random = Math.floor(Math.random()*(i-(i-20))+(i-20));
    }
    if(random !== prev){
      console.log("random is: " + random + " and prev is: " + prev);
      randChute = $("#"+random);
      randChute.clearQueue();
      randChute.switchClass("chute-container","chute-dragging",0);
      randChute.switchClass("chute-dragging","chute-container",125);
      prev = random;
    }
  });

  //starting loop
  chuteLoop();
});


$(window).load(function(){
  animLogo();
});

//animating the logo, must be done in window.load to receive correct offset values on images
function animLogo(){
  logoPiece = $("#logo-piece");
  logo = $("#logo");
  header = $("header");
  var offset = logoPiece.offset();

  //creating copy of logo and snapping it to logo position on page
  logo.offset({top:offset.top, left:offset.left});
  //hiding logo2 and then animating it to slowly reveal
  logo.show('clip', {direction:'vertical'}, 800);
  //changing img src on original logo (to save original css formatting), and removing logo2
  setTimeout(function(){
    logoPiece.remove();
  },800);
}

//self-destruct sequence for parachutes
function chutePop(elem){
  $(elem).stop()
    .clearQueue()
    .animate({top:"88%"}, 1000, "linear")
    .switchClass("chute-container","cloud", 0)
    .hide("puff",{percent:300},1800);
  return false;
}
