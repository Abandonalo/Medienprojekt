$(document).ready(function () {

    /* Get innerHeight für vh  */

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    let touchstartX = 0
    let touchendX = 0

    function ChangeDirection() {
        if (touchendX < touchstartX) {                     //weiter
            window.location.href = 'squareoutputinfo.html';
        }
        else if (touchendX > touchstartX) {                     //zurueck
            window.location.href = 'squareoption.html';
        }
    }

    document.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX
    })

    document.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX
        ChangeDirection()
    })
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

    let lo = { canClick: false };
    setTimeout(() => {
        lo.canClick = true;
    }, 1000);

    $('#button-weiter').click(function () {
        if (lo.canClick) {
            $('#introduction').addClass('disappear');
            $('svg').addClass('disappear');
            setTimeout(function () {
                window.location.href = 'squareoutputinfo.html';
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
            window.location.href = 'squareoption.html';
        }, 2000);
    });
});