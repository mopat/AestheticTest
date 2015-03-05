/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.TestSetup = (function () {
    var that = {},
        testUrl = null,
        time = null,
        color = null,
        chracteristic1 = null,
        chracteristic2 = null,
        chracteristic3 = null,
        chracteristic4 = null,
        chracteristic5 = null,

        init = function () {
            console.log("init testsetup");

            testUrl = getParameterByName("testurl");
            time = getParameterByName("time");
            chracteristic1 = getParameterByName("chracteristic1");
            chracteristic2 = getParameterByName("chracteristic2");
            chracteristic3 = getParameterByName("chracteristic3");
            chracteristic4 = getParameterByName("chracteristic4");
            chracteristic5 = getParameterByName("chracteristic5");
            color = getParameterByName("color");
            console.log(color, chracteristic1, chracteristic2, chracteristic3, chracteristic4, chracteristic5);

            setupIframe(testUrl);
            runTimer();
            ;
            $("#close-slider-modal").on("click", setNewHeight);
            return this;
        },

        getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        setupIframe = function (url) {
            var $iframe = $("#test-page");
            if ( $iframe.length ) {
                $iframe.attr('src',url);
                return false;
            }
            return true;
        },

        runTimer = function(){
            $('#test-page').load(function() {
                console.log("seite geladen");
                setTimeout(function(){
                    $('#aestheticSliderModal').foundation('reveal', 'open');
                },time * 1000);
            });
        },

        setNewHeight = function(){
            $("#rating-box").show();
            var height = $(document).height() - $("#rating-box").height();
            $("#test-page").css("height", height);
        };

    that.init = init;

    return that;
}());