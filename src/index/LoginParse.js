AestheticIndex.LoginParse = (function () {
    var that = {},
        test = null,

        init = function () {

            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

            if (Parse.User.current() != null) {
                loggedIn();
                showResults();
            }

            $("#button-login").click(function (event) {
                login($('#input-projectname-login').val(), $('#input-password-login').val());
                if (Parse.User.current() != null) {
                    loggedIn();
                    showResults();
                }
            });

            $("#button-logout").click(function (event) {
                Parse.User.logOut();
                location.reload();
            });


            return this;
        },

        login = function (username, password) {
            Parse.User.logIn(username, password, {
                success: function (user) {
                    showResults();
                    loggedIn();
                },
                error: function (user, error) {
                    swal(error.message);
                }
            });
        },

        showResults = function () {

            var projectTable = Parse.User.current().get("username") + "_table",
                project = Parse.Object.extend(projectTable),
                query = new Parse.Query(project);

            query.find({
                success: function (results) {
                    $(that).trigger("showResults", [Parse.User.current().get("evaluation_criteria"), results]);

                },
                error: function (error) {
                    swal("Error: " + error.code + " " + error.message, null, "error");
                }
            });
        },

        loggedIn = function () {
            $('.login-element').hide();
            $('#logout-element').show();
            $('#div-index-start').hide();

            if (Parse.User.current().get("aesthetic_test_link") === undefined) {
                $('#div-index-create-test').show();
            }

            $('#div-aesthetic-test-link-panel').show();
            $('#label-aesthetic-test-link').html(Parse.User.current().get("aesthetic_test_link"));
            $('#label-aesthetic-test-link').attr("href", Parse.User.current().get("aesthetic_test_link"));
            $('#div-index-result-panel').show();


            //in zwischenablage kopieren
            var linkUrl = new ZeroClipboard($("#copy-link-button"), {
                moviePath: "libs/ZeroClipboard.swf",
                debug: false
            });

            linkUrl.on("load", function (linkUrl) {
                linkUrl.on("complete", function (linkUrl, args) {
                    linkUrl.setText(Parse.User.current().get("aesthetic_test_link"));
                });
            });
            document.getElementById('input-projectname-login').onkeypress = function (e) {
                if (!e) e = window.event;
                var keyCode = e.keyCode || e.which;
                if (keyCode == '13') {
                    // Enter pressed
                    return false;
                }
            }
        };


    that.init = init;

    return that;
}());





