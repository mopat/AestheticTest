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
                projectName = user.get("username");

            aestheticTestLink = document.URL.replace(window.location.pathname, "/AestheticTest/test.html");
            aestheticTestLink = aestheticTestLink.replace("#", "");
            aestheticTestLink = aestheticTestLink + "?projectname=" + projectName;

            saveAestheticTestLink(aestheticTestLink);
            showAestheticTestLink();
        },

        saveAestheticTestLink = function (aestheticTestLink) {
            var user = Parse.User.current();
            user.set("aesthetic_test_link", aestheticTestLink.toString());
            user.save();
        },

        showAestheticTestLink = function () {
            $('#label-aesthetic-test-link').text(Parse.User.current().get("aesthetic_test_link"));
        };


    that.init = init;

    return that;
}());






