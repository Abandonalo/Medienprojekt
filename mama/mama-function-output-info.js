$(document).ready(function () {

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

    let lo = { canClick: false };

    $('#game').css('pointer-events', 'none');
    setTimeout(function () {
        $('#game').removeClass('disappear');
    }, 500);
    setTimeout(function () {
        lo.canClick = true;
        $('#gamebar').removeClass('disappear');
        $('#button-zurueck, #button-weiter, #button-refresh, #button-intro, #button-download').removeClass('disappear');
    }, 1000);

    //click event weiter
    $('#button-weiter').click(function () {
        if (lo.canClick) {
            lo.canClick = false;
            $('#buttons_1,#buttons_2,#buttons_3,#buttons_4').addClass('disappear');
            if (!$('#game').hasClass('disappear')) {   //output -> input
                $('#game').addClass('disappear');

                setTimeout(function () {
                    window.location.href = 'mamaintro2.html';
                }, 400);
                setTimeout(function () {
                    lo.canClick = true;
                }, 1000);
            }
        }
    });

    //click event zurueck
    $('#button-zurueck').click(function () {
        if (!$('#game').hasClass('disappear')) {   //output -> input
            $('#game').addClass('disappear');
            setTimeout(function () {
                window.location.href = 'mamaintro3.html';
            }, 1000);
        }

        else if (!$('#information').hasClass('disappear')) {  //info -> output
            $('#game').removeClass('disappear');
            $('#information').addClass('disappear');
            $('#information').css('pointer-events', 'none');
            $('game').css('pointer-events', '');
            setTimeout(function () {
                $('#information').addClass('disappear');
            }, 500);
            setTimeout(function () {
                $('#game').removeClass('disappear');
                $('#button-intro, #button-refresh').removeClass('disappear');
            }, 1000);
        }
    });


    $('#button-intro').click(function () {
        $('#intro-wrapper').removeClass('hide');
        $('#intro').addClass('turn-animation');
        setTimeout(function () {
            $('#intro-wrapper').css('background-color', 'rgba(0, 0, 0, 0.35)');
        }, 5);
        setTimeout(function () {
            $('#intro').removeClass('turn');
        }, 500);
        setTimeout(function () {
            $('#intro').removeClass('turn-animation');
        }, 1000);
    });


    $('#button-okay').click(function () {
        $('#intro').addClass('turnBack-animation');
        $('#intro-wrapper').css('background-color', 'rgba(0, 0, 0, 0)');
        setTimeout(function () {
        }, 500);
        setTimeout(function () {
            $('#intro').addClass('turn');
            $('#intro').removeClass('turnBack-animation');
            $('#intro-wrapper').addClass('hide');
        }, 1000);
    });

    $('#button-mehr').click(function () {
        $('#button-mehr').css('display', 'none');
        $('.dont-show').css('display', 'block');
    });

    $('#button-refresh').click(function () {
        if (!$('#game').hasClass('disappear')) {   //output -> input
            $('#game').addClass('disappear');
            setTimeout(function () {
                window.location.href = 'mamaoutputinfo.html';
            }, 1000);
        }
    });
});