$(document).ready(function() {

  var i = 0;	//chute counter
  function chuteLoop() {
    var body = $('body');
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
          chute.animate({top:"88%"}, 20000, "linear", function(){chute.remove()});
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

  //animating random chutes while typing in inputbox
  $("input[type='email']").keypress(function(){
    if(i < 20){
      var random = Math.floor(Math.random() * i);
    }
    else{
      var random = Math.floor(Math.random()*(i-(i-20))+(i-20));
    }

	var randChute = $("#"+random);
	randChute.clearQueue()
		.switchClass("chute-container","chute-dragging",0)
		.switchClass("chute-dragging","chute-container",125);
  });

  //starting loop
  chuteLoop();
});

//self-destruct sequence for parachutes
function chutePop(elem){
  $(elem).stop()
    .clearQueue()
    .animate({top:"88%"}, 1000, "linear")
    .switchClass("chute-container","cloud", 0)
    .hide("puff",{percent:300},1800);
  return false;
}
