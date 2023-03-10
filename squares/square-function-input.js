$(document).ready(function () {
    /* Get innerHeight für vh  */

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

    let lo = { canClick: false };

    window.localStorage.clear();
    $("#gameinput").addClass("down");
    $("#game").css("pointer-events", "none");
    setTimeout(function () {
        lo.canClick = true;
        $("#game").removeClass("disappear");
        $("#gamebar").removeClass("disappear");
        $(
            "#button-zurueck, #button-weiter, #button-refresh, #button-intro"
        ).removeClass("disappear");
    }, 1000);

    //click event weiter
    $("#button-weiter").click(function () {
        if (lo.canClick) {
            //input -> intro2
            $("#game").addClass("disappear");
            $("svg").addClass("disappear");
            setTimeout(function () {
                window.location.href = "squareintro2.html";
            }, 1000);
        }
    });

    $("#button-refresh").click(function () {
        window.location.reload();
    });


    //click event zurueck
    $("#button-zurueck").click(function () {
        //input -> intro
        $("#gameinput").removeClass("down");
        $("#game").addClass("disappear");
        $("svg").addClass("disappear");
        setTimeout(function () {
            window.location.href = "squareintro1.html";
        }, 1000);
    });

    $("#button-intro").click(function () {
        $("#intro-wrapper").removeClass("hide");
        $("#intro").addClass("turn-animation");
        setTimeout(function () {
            $("#intro-wrapper").css("background-color", "rgba(0, 0, 0, 0.35)");
        }, 5);
        setTimeout(function () {
            $("#intro").removeClass("turn");
        }, 500);
        setTimeout(function () {
            $("#intro").removeClass("turn-animation");
        }, 1000);
    });

    $("#button-okay").click(function () {
        $("#intro").addClass("turnBack-animation");
        $("#intro-wrapper").css("background-color", "rgba(0, 0, 0, 0)");
        setTimeout(function () { }, 500);
        setTimeout(function () {
            $("#intro").addClass("turn");
            $("#intro").removeClass("turnBack-animation");
            $("#intro-wrapper").addClass("hide");
        }, 1000);
    });


    $("#button-okayla").click(function () {
        $("#alert").addClass("turnBack-animation");
        $("#alert-wrapper").css("background-color", "rgba(0, 0, 0, 0)");
        setTimeout(function () { }, 500);
        setTimeout(function () {
            $("#alert").addClass("turn");
            $("#alert").removeClass("turnBack-animation");
            $("#alert-wrapper").addClass("hide");
        }, 1000);
    });
});
