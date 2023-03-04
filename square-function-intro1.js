$(document).ready(function () {
    /* Get innerHeight für vh  */
    let touchstartX = 0;
    let touchendX = 0;

    function ChangeDirection() {
        if (touchendX < touchstartX) {
            //weiter
            window.location.href = "squareinput.html";
        } else if (touchendX > touchstartX) {
            //zurueck
            window.location.href = "menu.html";
        }
    }

    document.addEventListener("touchstart", (e) => {
        touchstartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
        touchendX = e.changedTouches[0].screenX;
        ChangeDirection();
    });
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // Slider

    $(".slider").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
    });

    $("#introduction").removeClass("disappear");
    $("#introduction").removeClass("hide");

    $("#game-input, #game-option, #game-output, #information").addClass(
        "disappear"
    );
    $("#button-zurueck, #button-weiter").removeClass("disappear");
    $("#button-intro, #button-refresh").addClass("disapper");

    let lo = { canClick: false };
    setTimeout(() => {
        lo.canClick = true;
    }, 1000);


    // click event weiter
    $("#button-weiter").click(function () {
        // intro -> input
        if (lo.canClick) {
            $("#gameinput").addClass("down");
            $("#introduction").addClass("disappear");
            setTimeout(function () {
                $("#introduction").addClass("hide");
                $("#gameinput").addClass("down");
            }, 500);
            setTimeout(function () {
                window.location.href = "squareinput.html";
            }, 1000);
        }
    });

    //click event zurueck
    $("#button-zurueck").click(function () {
        //intro -> menu
        $("#introduction").addClass("disappear");
        $("svg").addClass("disappear");
        setTimeout(function () {
            $("#body-wrapper").css("top", "-100vh");
        }, 1000);
        setTimeout(function () {
            window.location.href = "menu.html";
        }, 2000);
    });
});
