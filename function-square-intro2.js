$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
// Slider    
    
   // $('.slider').slick({
   //     dots: true,
   //     infinite: true,
    //    speed: 300,
    //    slidesToShow: 1,
  //      adaptiveHeight: true
  //  });
  let touchstartX = 0
  let touchendX = 0
  
  function ChangeDirection() {
    if (touchendX < touchstartX) {                     //weiter
     window.location.href = 'squareoption.html';
    }
    else if (touchendX > touchstartX) {                     //zurueck
     window.location.href = 'squareinput.html';
    }
   }
   
   document.addEventListener('touchstart', e => {
   touchstartX = e.changedTouches[0].screenX
   })
   
   document.addEventListener('touchend', e => {
   touchendX = e.changedTouches[0].screenX
   ChangeDirection()
   })

    $('#introduction').removeClass('disappear');
    $('#introduction').removeClass('hide');

    $('#button-zurueck, #button-weiter').removeClass('disappear');
    $('#button-intro, #button-refresh').addClass('disapper');

    $('#button-weiter').click(function (){
        $('#introduction').addClass('disappear');
        $('svg').addClass('disappear');
        setTimeout(function(){
            window.location.href = 'squareoption.html';
        }, 2000);
    });    

    $('#button-zurueck').click(function (){
       $('#introduction').addClass('disappear');
        $('svg').addClass('disappear');
        setTimeout(function(){
            window.location.href = 'squareinput.html';
        }, 2000);
    });
});