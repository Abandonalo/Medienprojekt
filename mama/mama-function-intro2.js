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

    setTimeout(() => {
        lo.canClick = true;
    }, 1000);

    $('#introduction').removeClass('disappear');
    $('#introduction').removeClass('hide');

    $('#button-zurueck, #button-weiter').removeClass('disappear');
    $('#button-intro, #button-refresh').addClass('disapper');

    $('#button-weiter').click(function () {
        if (lo.canClick) {
            $('#introduction').addClass('disappear');
            $('svg').addClass('disappear');
            setTimeout(function () {
                $('#gameinput').removeClass('down');
            }, 1000);
            setTimeout(function () {
                window.location.href = '../menu.html';
            }, 2000);
        }
    });

    $('#button-zurueck').click(function () {
        $('#introduction').addClass('disappear');
        $('svg').addClass('disappear');
        setTimeout(function () {
            $('#body-wrapper').css('top', '-100vh');
        }, 1000);
        setTimeout(function () {
            window.location.href = 'mamaoutputinfo.html';
        }, 2000);
    });
});