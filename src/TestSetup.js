/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.TestSetup = (function() {
    var that = {},

        init = function() {
            console.log("init testsetup");
            return this;
        };

    that.init = init;

    return that;
}());