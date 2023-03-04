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


    $('#game').removeClass('disappear');
    //$('#game').css('pointer-events','none');
    setTimeout(function () {
        $('#game').removeClass('disappear');
        $('#gamebar').removeClass('disappear');
    }, 500);
    setTimeout(function () {
        lo.canClick = true;
        $('#button-zurueck, #button-weiter, #button-refresh, #button-intro, #button-download').removeClass('disappear');
    }, 1000);
    // click event weiter
    $('#button-weiter').click(function () {
        if (!$('#game').hasClass('disappear')) {
            if (lo.canClick) {
                lo.canClick = false;
                $('#game').addClass('disappear');
                $('#information').removeClass('disappear');
                $('#button-intro, #button-refresh, #button-download, #gamebar').addClass('disappear');
                $('#information').css('pointer-events', '');
                $('#game').css('pointer-events', 'none');
                setTimeout(function () {
                    lo.canClick = true;
                    $('#gameinput').removeClass('down');
                    $('#gamebar').addClass('hide');
                    $('#button-intro, #button-refresh, #button-download, #gamebar').addClass('disappear');
                }, 1000);
            }
        }

        else if (!$('#information').hasClass('disappear')) {  //info -> menu
            window.localStorage.clear();
            $('#information').addClass('disappear');
            $('svg').addClass('disappear');
            setTimeout(function () {
                $('#gameinput').removeClass('down');
            }, 1000);
            setTimeout(function () {
                window.location.href = 'menu.html';
            }, 2000);
        }
    });

    $('#button-zurueck').click(function () {
        if (!$('#game').hasClass('disappear')) {   //output -> input
            $('#game').addClass('disappear');
            setTimeout(function () {
                window.location.href = ' buchstabenintro3.html';
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
                $('#button-intro, #button-refresh, #button-download, #gamebar').removeClass('disappear');
            }, 1000);
        }
    });

    /* Intro Overlay einblenden */
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

    // Text ausklappen
    $('#button-mehr').click(function () {
        $('#button-mehr').css('display', 'none');
        $('.dont-show').css('display', 'block');
    });
});