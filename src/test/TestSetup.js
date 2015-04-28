AestheticTest.TestSetup = (function () {
    var that = {},
        testUrl = null,
        time = null,
        testPage = null,
        toRate = null,
        projectname = null,

        init = function () {

            // Initialize Parse with your Parse application javascript keys
            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

            toRate = [];
            testPage = $("#test-page");
            projectname = getParameterByName("projectname");

            $(document).ready(function () {
                setup();
            });

            return this;
        },

        setup = function () {

            var project = Parse.Object.extend("User"),
                query = new Parse.Query(project);

            query.find({
                success: function (results) {
                    for (var j = 0; j < results.length; j++) {
                        var object = results[j];
                        if (object.get("username") == projectname) {

                            testUrl = object.get("testurl");
                            setupIframe(testUrl);

                            time = object.get("testtime") * 1000;
                            runTimer(time);

                            toRate = object.get("evaluation_criteria");
                            $(that).trigger("characteristicsGenerated", [toRate]);
                        }
                    }

                },
                error: function (error) {
                    swal("Error: " + error.code + " " + error.message, null, "error");
                }
            });
        },

        getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        setupIframe = function (testUrl) {
            if (testPage.length)
                testPage.attr('src', testUrl);
        },

        runTimer = function (time) {
            testPage.load(function () {
                setTimeout(function () {
                    $(that).trigger("showSliderModal");
                }, time);
            });
        };


    that.init = init;

    return that;
}());