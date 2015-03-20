/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.TestSetup = (function () {
    var that = {},
        testUrl = null,
        time = null,
        testPage = null,
        toRate = null,

        init = function () {
            console.log("init testsetup");
            toRate = [];

            testUrl = getParameterByName("testurl");
            time = getParameterByName("time");
            testPage = $("#test-page");

            setupCharacteristics();

            $(document).ready(function () {
                setupIframe();
                runTimer();
                $(that).trigger("characteristicsGenerated", [toRate]);
            });

            return this;
        },

        setupCharacteristics = function () {
            var font = getParameterByName("font"),
            color = getParameterByName("color"),
            pictures = getParameterByName("pictures");

            if (font == "on")
                toRate.push("Font");

            if (color == "on")
                toRate.push("Color");

            if (pictures == "on")
                toRate.push("Pictures");

            for (var i = 1; i <= 3; i++) {
                var characteristic = getParameterByName("chracteristic" + i);
                if (characteristic != "") {
                    toRate.push(characteristic);
                }
            }
        },

        getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        setupIframe = function () {
            if (testPage.length)
                testPage.attr('src', testUrl);
        },

        runTimer = function () {
            testPage.load(function () {
                console.log("seite geladen");
                setTimeout(function () {
                    $(that).trigger("showSliderModal");
                }, 1000);
            });
        };


    that.init = init;

    return that;
}());