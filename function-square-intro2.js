$(document).ready(function (){
    
/* Get innerHeight für vh  */   
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
// Slider    
    
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    
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