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

    $('#game-input, #game-option, #game-output, #information').addClass('disappear');
    $('#button-zurueck, #button-weiter').removeClass('disappear');
    $('#button-intro, #button-refresh').addClass('disapper');

// click event weiter
    $('#button-weiter').click(function (){
        // intro -> input
        $('#gameinput').addClass('down');
        $('#introduction').addClass('disappear');
        setTimeout(function(){
            $('#introduction').addClass('hide');
            $('#gameinput').addClass('down');
        }, 500);
        setTimeout(function(){
            window.location.href = 'squareinput.html';
        }, 1000);
    });
    
    //click event zurueck
    $('#button-zurueck').click(function (){
        //intro -> menu
            $('#introduction').addClass('disappear');
            $('svg').addClass('disappear');
            setTimeout(function(){
                $('#body-wrapper').css('top','-100vh');
            }, 1000);
            setTimeout(function(){
                window.location.href = 'menu.html';
            }, 2000);
    });
});