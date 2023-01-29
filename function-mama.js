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

    $('#game-input, #game-output, #information').addClass('disappear');
    $('#button-zurueck, #button-weiter').removeClass('disappear');
    $('#button-intro, #button-refresh').addClass('disapper');

    //click event weiter
    $('#button-weiter').click(function (){
        if (!$('#introduction').hasClass('disappear')){   //intro -> input
            $('#gameinput').addClass('down');
            $('#introduction').addClass('disappear');
            setTimeout(function(){
                $('#game-input').removeClass('disappear');
                $('#introduction').addClass('hide');
            }, 500);
            setTimeout(function(){
                $('#gamebar').removeClass('disappear');
                $('#button-refresh, #button-intro').removeClass('disappear');
            }, 1000);
    }

        else if (!$('#game-input').hasClass('disappear')){ //input -> output
            $('#game-input').addClass('disappear');
            $('#game-output').removeClass('disappear');
            $('#game-input').css('pointer-events','none');
            setTimeout(function(){  
                $('#game-input').addClass('disappear');    
                $('#game-output').removeClass('disappear');
            }, 1000); 
        }

        else if (!$('#game-output').hasClass('disappear')){  //output -> info
            $('#game-output').addClass('disappear');
            $('#information').removeClass('disappear');
            $('#button-intro, #button-refresh, #gamebar').addClass('disappear');
            $('#information').css('pointer-events','');
            $('#game-output').css('pointer-events','none');
            setTimeout(function(){     
                $('#gameinput').removeClass('down'); 
                $('#gamebar').addClass('hide');
                $('#button-intro').addClass('disappear');
                $('#button-refresh').addClass('disappear');
            }, 1000);
        }

        else if (!$('#information').hasClass('disappear')){  //info -> menu
            $('#information').addClass('disappear');
            $('svg').addClass('disappear');
            setTimeout(function(){
                $('#gameinput').removeClass('down');
            }, 1000);
            setTimeout(function(){
                window.location.href = 'menu.html';
            }, 2000);
        }
    });    

    //click event zurueck
    $('#button-zurueck').click(function (){

        if (!$('#introduction').hasClass('disappear')){  //intro -> menu
                $('#introduction').addClass('disappear');
                $('svg').addClass('disappear');
                setTimeout(function(){
                    $('#body-wrapper').css('top','-100vh');
                }, 1000);
                setTimeout(function(){
                    window.location.href = 'menu.html';
                }, 2000);
        }
        else if (!$('#game-input').hasClass('disappear')){ //input -> intro
            $('#gameinput').removeClass('down');
            $('#introduction').removeClass('disappear');
            $('#introduction').removeClass('hide');
            $('#game-input').addClass('disappear');
            $('#button-intro, #button-refresh').addClass('disappear');
            $('#gamebar').addClass('disappear');
            setTimeout(function(){
                $('#introduction').removeClass('disappear');
            }, 1000);
        }        

        else if (!$('#game-output').hasClass('disappear')){ //output -> input
            $('#game-input').removeClass('disappear');
            $('#game-output').addClass('disappear');
            setTimeout(function(){
                $('#game-input').removeClass('disappear');
                $('#game-output').addClass('disappear');
            }, 1000);
        }        
        
        else if (!$('#information').hasClass('disappear')){  //info -> output
            $('#game-output').removeClass('disappear');
            $('#information').addClass('disappear');
            $('#information').css('pointer-events','none');
            $('game-output').css('pointer-events','');
            setTimeout(function(){
                $('#information').addClass('disappear');
            }, 500);
            setTimeout(function(){
                $('#game-output').removeClass('disappear');
                $('#button-intro, #button-refresh').removeClass('disappear');
            }, 1000);
        }
    });


$('#button-intro').click(function (){
    $('#intro-wrapper').removeClass('hide');
    $('#intro').addClass('turn-animation');
    setTimeout(function(){
        $('#intro-wrapper').css('background-color','rgba(0, 0, 0, 0.35)');
    }, 5);     
    setTimeout(function(){
        $('#intro').removeClass('turn');
    }, 500);     
    setTimeout(function(){
        $('#intro').removeClass('turn-animation');
    }, 1000);     
});

 
 $('#button-okay').click(function (){
    $('#intro').addClass('turnBack-animation');
    $('#intro-wrapper').css('background-color','rgba(0, 0, 0, 0)');
    setTimeout(function(){
    }, 500);     
    setTimeout(function(){
        $('#intro').addClass('turn');
        $('#intro').removeClass('turnBack-animation');
        $('#intro-wrapper').addClass('hide');
    }, 1000);     
});    

// Text ausklappen
    $('#button-mehr').click(function (){
        $('#button-mehr').css('display','none');
        $('.dont-show').css('display','block');
    });
});