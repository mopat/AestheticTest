/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.TestSetup = (function () {
    var that = {},
        testUrl = null,
        time = null,

        init = function () {
            console.log("init testsetup");

            testUrl = getParameterByName("testurl");
            time = getParameterByName("time");

            setupIframe(testUrl);
            runTimer();

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
        };

    that.init = init;

    return that;
}());