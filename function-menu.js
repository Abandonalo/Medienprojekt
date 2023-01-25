$(document).ready(function (){
    
    /* Get innerHeight für vh  */   
      
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    
        $('#menu').removeClass('opacity-zero');
        
    /* Navigation zu Unterseiten */    
    
        $('#veramolnar').click(function (){   
            $(this).addClass('li-activated');
            setTimeout(function() {
                $(this).removeClass('li-activated');
                window.location.href = "veramolnar.html";
            }, 2000);
          });
        
        $('#ab').click(function (){   
            $(this).addClass('li-activated');
            setTimeout(function() {
                $(this).removeClass('li-activated');
                window.location.href = "ab.html";
            }, 2000);
          });
        
        $('#square').click(function (){   
            $(this).addClass('li-activated');
            setTimeout(function() {
                $(this).removeClass('li-activated');
                window.location.href = "square.html";
            }, 2000);
          });
        
        $('#mama').click(function (){   
            $(this).addClass('li-activated');
            setTimeout(function() {
                $(this).removeClass('li-activated');
                window.location.href = "mama.html";
            }, 2000);
          });
        
        
        $('#app').click(function (){   
            $(this).addClass('li-activated');
            setTimeout(function() {
                $(this).removeClass('li-activated');
                window.location.href = "app.html";
            }, 2000);
        });
    });    
    