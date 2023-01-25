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
    
// Navigation einblenden
    $('#button-zurueck').removeClass('disappear');
    $('#button-weiter').removeClass('disappear');

// Navigation  
    $('#button-weiter').click(function (){
        if ($('#introduction').hasClass('disappear') == false){ // intro -> input
                $('#introduction').addClass('disappear'); 
                $('#game-input').removeClass('hide');
                //$('#game').addClass('down');

                setTimeout(function(){
                    $('#introduction').addClass('hide');
                    $('#game-input').removeClass('disappear');
                }, 500);
                setTimeout(function(){
                    $('#gamebar').removeClass('disappear');
                    $('#button-intro').removeClass('disappear');
                    $('#button-download').removeClass('disappear');
                    $('#button-stamp').removeClass('disappear');
                    $('#button-refresh').removeClass('disappear');
                }, 1000);
            }

            //change the below to input-letter, input-size, output

            else if ($('#game-input').hasClass('disappear') == false){ //input -> output
                $('#game-input').addClass('disappear');
                $('#game-output').removeClass('hide'); 
                $('#button-intro').addClass('disappear');
                $('#button-download').addClass('disappear');
                $('#button-gamebar').addClass('disappear');
                $('#button-refresh').addClass('disappear');
                $('#game-output').css('pointer-events','');
                $('#game-input').css('pointer-events','none');

                setTimeout(function(){      
                    $('#game-output').removeClass('disappear');
                    $('#gamebar').addClass('hide');
                }, 1000);
            }


            else if ($('#game-output').hasClass('disappear') == false){  //output -> info
                $('#game-output').addClass('disappear');
                $('#information').removeClass('disappear');
                $('#button-intro').addClass('disappear');
                $('#button-download').addClass('disappear');
                $('#button-gamebar').addClass('disappear');
                $('#information').css('pointer-events','');
                $('#game-output').css('pointer-events','none');

                setTimeout(function(){      
                    $('#information').removeClass('disappear');
                    $('#gamebar').addClass('hide');
                }, 1000);
            }

            else if ($('#information').hasClass('disappear') == false){  //info -> menu
                $('#information').addClass('disappear');
                $('svg').addClass('disappear');
                setTimeout(function(){
                    window.location.href = 'menu.html';
                }, 2000);
            }
        });    
    


    $('#button-zurueck').click(function (){

        if ($('#introduction').hasClass('disappear') == false){  //intro -> menu
                $('#introduction').addClass('disappear');
                $('svg').addClass('disappear');
                setTimeout(function(){
                    $('#body-wrapper').css('top','-100vh');
                }, 1000);
                setTimeout(function(){
                    window.location.href = 'menu.html';
                }, 2000);
        }
        else if ($('#game-input').hasClass('disappear') == false){ //input -> intro
            $('#game').removeClass('down');
            $('#introduction').removeClass('hide');
            $('#button-intro').addClass('disappear');
            $('#button-refresh').addClass('disappear');
            $('#gamebar').addClass('disappear');
            setTimeout(function(){
                $('#introduction').removeClass('disappear');
            }, 1000);
        }        

        else if ($('#game-output').hasClass('disappear') == false){ //output -> input
            $('#game-input').removeClass('disappear');
            $('#button-intro').addClass('disappear');
            $('#button-refresh').addClass('disappear');
            $('#gamebar').addClass('disappear');
            setTimeout(function(){
                $('#game-input').removeClass('disappear');
            }, 1000);
        }        
        
        else if ($('#information').hasClass('disappear') == false){  //info -> output
            $('#information').addClass('disappear');
            $('#gamebar').removeClass('hide');
            $('#information').css('pointer-events','none');
            $('#game').css('pointer-events','');
            setTimeout(function(){
                $('#information').addClass('hide');
                $('#gamebar').removeClass('disappear');
            }, 500);
            setTimeout(function(){
                $('#game-output').removeClass('disappear');
                $('#button-intro').removeClass('disappear');
                $('#button-download').removeClass('disappear');
            }, 1000);
        }
    });

/* Intro Overlay einblenden */ 
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