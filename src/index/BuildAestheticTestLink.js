AestheticIndex.BuildAestheticTestLink = (function () {
    var that = {},

        init = function () {

            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

            $('#button-create-aesthetic-test').on('click', function () {
                buildAesthteticTestLink();
            });

            return this;
        },

        buildAesthteticTestLink = function () {
            var aestheticTestLink = "",
                user = Parse.User.current(),
                testurl = user.get("testurl"),
                projectName = user.get("username"),
                time = $('#time-slider').val(),
                toRate = user.get("evaluation_criteria");

            aestheticTestLink = document.URL.replace(window.location.pathname, "/AestheticTest/test.html");
            aestheticTestLink = aestheticTestLink.replace("#", "");
            testurl = testurl.replace(":", "%3A");
            testurl = testurl.replace("/", "%2F");

            if ($('#checkbox1').prop('checked') == true) {
                var checkbox1 = "on";
            } else {
                checkbox1 = "";
            }

            if ($('#checkbox2').prop('checked') == true) {
                var checkbox2 = "on";
            } else {
                checkbox2 = "";
            }

            if ($('#checkbox3').prop('checked') == true) {
                var checkbox3 = "on";
            } else {
                checkbox3 = "";
            }

            aestheticTestLink = aestheticTestLink + "?projectname=" + projectName + "&testurl=" + testurl + "&time=" + time +
            "&font=" + checkbox1 + "&color=" + checkbox2 + "&images=" + checkbox3 + "&chracteristic1=" + $('#chracteristic1').val() + "&chracteristic2=" + $('#chracteristic2').val() + "&chracteristic3=" + $('#chracteristic3').val();

            saveAestheticTestLink(aestheticTestLink);
            showAestheticTestLink();
        },

        saveAestheticTestLink = function (aestheticTestLink) {
            var user = Parse.User.current();
            user.set("aesthetic_test_link", aestheticTestLink);
            user.save();
        },

        showAestheticTestLink = function () {
            $('#label-aesthetic-test-link').text(Parse.User.current().get("aesthetic_test_link"));
        };


    that.init = init;

    return that;
}());






