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

    $('#game-input, #introduction2, #game-option, #game-output, #information').addClass('disappear');
    $('#button-zurueck, #button-weiter').removeClass('disappear');
    $('#button-intro, #button-refresh').addClass('disapper');

    // click event weiter
    $('#button-weiter').click(function (){
        if (!$('#introduction').hasClass('disappear')){ // intro -> input
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
        else if (!$('#game-input').hasClass('disappear')){ //input -> intro2
            $('#game-input').addClass('disappear');
            $('#introduction2').removeClass('disappear');
            $('#button-intro, #button-refresh').addClass('disapper');
            $('#game-input').css('pointer-events','none');
            setTimeout(function(){  
                $('#game-input').addClass('disappear');    
                $('#introduction2').removeClass('disappear');
                $('#button-intro, #button-refresh').addClass('disapper');
            }, 1000); 
        }
        else if (!$('#introduction2').hasClass('disappear')){ //intro2 -> option
            $('#introduction2').addClass('disappear');
            $('#game-option').removeClass('disappear');
            $('#button-refresh, #button-intro').removeClass('disappear')
            $('#introduction2').css('pointer-events','none');
            setTimeout(function(){  
                $('#introduction2').addClass('disappear');    
                $('#game-option').removeClass('disappear');
                $('#button-refresh, #button-intro').removeClass('disappear')
            }, 1000); 
        }
        else if (!$('#game-option').hasClass('disappear')){ //option -> intro3
            $('#game-option').addClass('disappear');
            $('#introduction3').removeClass('disappear');
            $('#button-intro, #button-refresh').addClass('disapper');
            $('#game-option').css('pointer-events','none');
            setTimeout(function(){  
                $('#game-option').addClass('disappear');    
                $('#introduction3').removeClass('disappear');
                $('#button-intro, #button-refresh').addClass('disapper');
            }, 1000); 
        }
        else if (!$('#game-option').hasClass('disappear')){ //intro3 -> output
            $('#introduction3').addClass('disappear');
            $('#game-output').removeClass('disappear');
            $('#button-refresh, #button-intro').removeClass('disappear');
            $('#introduction3').css('pointer-events','none');
            setTimeout(function(){  
                $('#introduction3').addClass('disappear');    
                $('#game-output').removeClass('disappear');
                $('#button-refresh, #button-intro').removeClass('disappear');
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
        else if (!$('#introduction2').hasClass('disappear')){ //intro2 -> input
            $('#introduction2').addClass('disappear');
            $('#game-input').removeClass('disappear');
            $('#button-intro, #button-refresh').removeClass('disappear');
            setTimeout(function(){
                $('#game-input').removeClass('disappear');
                $('#introduction2').addClass('disappear');
                $('#button-intro, #button-refresh').removeClass('disappear');
            }, 1000);
        }        
        else if (!$('#game-option').hasClass('disappear')){ //option -> intro2
            $('#game-option').addClass('disappear');
            $('#introduction2').removeClass('disappear');
            $('#button-intro, #button-refresh').addClass('disappear');
            setTimeout(function(){
                $('#introduction2').removeClass('disappear');
                $('#button-intro, #button-refresh').addClass('disappear');
                $('#game-option').addClass('disappear');
            }, 1000);
        }   
        else if (!$('#introduction3').hasClass('disappear')){ //intro3 -> option
            $('#introduction3').addClass('disappear');
            $('#game-option').removeClass('disappear');
            $('#button-intro, #button-refresh').removeClass('disappear');
            setTimeout(function(){
                $('#game-option').removeClass('disappear');
                $('#introduction3').addClass('disappear');
                $('#button-intro, #button-refresh').removeClass('disappear');
            }, 1000);
        }             
        else if (!$('#game-output').hasClass('disappear')){ //output -> intro3
            $('#game-output').addClass('disappear');
            $('#introduction3').removeClass('disappear');
            $('#button-intro, #button-refresh').addClass('disappear');
            setTimeout(function(){
                $('#button-intro, #button-refresh').addClass('disappear');
                $('#introduction3').removeClass('disappear');
                $('#game-output').addClass('disappear');
            }, 1000);
        }        
        else if (!$('#information').hasClass('disappear')){  //info -> output
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