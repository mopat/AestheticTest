/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.TestSetup = (function () {
    var that = {},
        testUrl = null,
        time = null,
        color = null,
        testPage = null,
        chracteristic1 = null,
        chracteristic2 = null,
        chracteristic3 = null,
        chracteristic4 = null,
        chracteristic5 = null,

        init = function () {
            console.log("init testsetup");

            testUrl = getParameterByName("testurl");
            time = getParameterByName("time");
            testPage = $("#test-page");
            chracteristic1 = getParameterByName("chracteristic1");
            chracteristic2 = getParameterByName("chracteristic2");
            chracteristic3 = getParameterByName("chracteristic3");
            chracteristic4 = getParameterByName("chracteristic4");
            chracteristic5 = getParameterByName("chracteristic5");
            color = getParameterByName("color");

            $(document).ready(function(){
                setupIframe();
                runTimer();
            });


            // Initialize Parse with your Parse application javascript keys
            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

            var TestObject = Parse.Object.extend("TestObject");
            var testObject = new TestObject();
            testObject.save({foo: "bar"}).then(function (object) {
                var msgbox = alert("yay! it worked");
                return msgbox.showAsync();
            });

            return this;
        },

        getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        setupIframe = function () {
            if ( testPage.length )
                testPage.attr('src',testUrl);
        },

        runTimer = function(){
            testPage.load(function() {
                console.log("seite geladen");
                setTimeout(function(){
                    $(that).trigger("showSliderModal");
                }, 1000);
            });
        };


    that.init = init;

    return that;
}());