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
    
    window.localStorage.removeItem("form");
    window.localStorage.removeItem("shape");
    window.localStorage.removeItem("color");
    $('#game').removeClass('disappear');
    $('#game').css('pointer-events','none');
    setTimeout(function(){  
        $('#game').removeClass('disappear'); 
        $('#gamebar').removeClass('disappear');
        $('#button-zurueck, #button-weiter, #button-refresh, #button-intro').removeClass('disappear');
    }, 1000)
    
// click event weiter
    $('#button-weiter').click(function () {
        if (window.localStorage.getItem("form") == null
            || window.localStorage.getItem("shape") == null
            || window.localStorage.getItem("color") == null) {
            $("#alert-wrapper").removeClass("hide");
            $("#alert").addClass("turn-animation");
            setTimeout(function () {
                $("#alert-wrapper").css("background-color", "rgba(0, 0, 0, 0.35)");
            }, 5);
            setTimeout(function () {
                $("#alert").removeClass("turn");
            }, 500);
            setTimeout(function () {
                $("#alert").removeClass("turn-animation");
            }, 1000);
        } else {
            //option -> output
            $('#game').addClass('disappear');
            $('#game').css('pointer-events', 'none');
            setTimeout(function () {
                $('#game').addClass('disappear');
                window.location.href = 'squareoutputinfo.html'
            }, 1000);
        }
    });    
    
    //click event zurueck
    $('#button-zurueck').click(function (){
         //option -> input
            $('#game').addClass('disappear');
            $('svg').addClass('disappear');
            setTimeout(function(){
                $('#game').addClass('disappear');
                window.location.href = 'squareinput.html';
            }, 1000);
        });      
        

    /* Intro Overlay einblenden */ 
    $('#button-intro').click(function (){
       //on option page
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

    $('#form').change(function (){
        //console.log("form changed: " + this.value);
        window.localStorage.setItem("form", this.value);
    }); 

    $('#shape').change(function (){
        //console.log("form changed: " + this.value);
        window.localStorage.setItem("shape", this.value);
    }); 

    $('#color').change(function (){
        //console.log("form changed: " + this.value);
        window.localStorage.setItem("color", this.value);
    }); 

    $("#button-okayla").click(function () {
      $("#alert").addClass("turnBack-animation");
      $("#alert-wrapper").css("background-color", "rgba(0, 0, 0, 0)");
      setTimeout(function () {}, 500);
      setTimeout(function () {
        $("#alert").addClass("turn");
        $("#alert").removeClass("turnBack-animation");
        $("#alert-wrapper").addClass("hide");
      }, 1000);
    });
});    
