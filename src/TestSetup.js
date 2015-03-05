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

            return this;
        },

        getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };

    that.init = init;

    return that;
}());