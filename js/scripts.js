var video = document.querySelector("#live");

// if (navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({ video: true })
//     .then(function (stream) {
//         video.srcObject = stream;
//         video.play()
//     })
//     .catch(function (err0r) {
//         console.log("Something went wrong!", err0r);
//     });

// }

const gdmOptions = {
    video: {
      cursor: "always"
    },
  }

async function startCapture(displayMediaOptions) {
    let captureStream = null;
  
    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch(err) {
      console.error("Error: " + err);
    }
    return captureStream;
}

(function($){
  let heartsInterval = 0;
  let heartsTimeout = 0;
  let item = 0;

  function stopAnimation(heartsInterval, hearts, heartsTimeout){
    if(heartsInterval){clearInterval(heartsInterval);}
    if(heartsTimeout) {clearTimeout(heartsTimeout);}
    hearts.removeClass("animate")
  }
  
  function animateHearts(delay = 110){
    let hearts = $(".hearts img");
    
    if(heartsInterval){
      stopAnimation(heartsInterval, hearts, heartsTimeout)  
      item = 0;
      heartsInterval = 0;
      heartsTimeout = 0;
    }
    
    heartsInterval = setInterval(function(){
      hearts.eq(item++).addClass("animate");
    }, delay);

    heartsTimeout = setTimeout(function(){
        if(heartsInterval){
          stopAnimation(heartsInterval, hearts, heartsTimeout)
        }
      }, delay * 30)
  }

  $.fn.doubleTap = function (doubleTapCallback) {
      return this.each(function () {
          var elm = this;
          var lastTap = 0;
          $(elm).bind('vmousedown', function (e) {
              var now = (new Date()).valueOf();
              var diff = (now - lastTap);
              lastTap = now;
              if (diff < 250) {
                  if ($.isFunction(doubleTapCallback)) {
                      doubleTapCallback.call(elm);
                  }
              }
          });
      });
  }

  $(".collapser").on("click", function(){
    $(this).parents(".msgInput").toggleClass("collapsed");
  });
  $(".action_icons > span").on("click", function(){
    $(this).toggleClass("inactive")
  });

  $("#message").on("click", function(){
    $("#type_message").toggleClass("closed");
  });
  $("#share_screen").on("click", function(){
    $(".screen").toggle();
  });
  $("#camera").on("click", function(){
    $(".camera").toggle();
  });
  

  $(document).on("dblclick", function(){
    animateHearts()
  });
  $("body").doubleTap(function(){
    animateHearts()
  });

    $(window).on("load",function(){
        $(".messagesContainer .messages").mCustomScrollbar({
            theme:"minimal-dark",
            setTop:"-999999px",
            scrollButtons:{ enable: false }
        });
    });

})(jQuery);