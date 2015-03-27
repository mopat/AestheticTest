$(document).ready(function () {

    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    $('#button-sign-up-parse').on('click', function () {
        signUpUser($("#input-projectname").val(), $("#input-projectpassword").val(), $("#input-project-testurl").val());
    });

    function signUpUser(projectname, pw, testurl) {

        var user = new Parse.User();
        user.set("username", projectname);
        user.set("password", pw);

        user.set("testurl", testurl);

        user.signUp(null, {
            success: function (user) {
                //$('#alert-now-login').show();
                alert("user erzeugt");
                loggedIn();
            },
            error: function (user, error) {
                alert("user nicht erzeugt");
            }
        });
    }
    function loggedIn() {
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


        var linkUrl = new ZeroClipboard($("#copy-link-button"), {
            moviePath: "libs/ZeroClipboard.swf",
            debug: false
        });




        //in zwischenablage kopieren
        linkUrl.on("load", function (linkUrl) {
            linkUrl.on("complete", function (linkUrl, args) {
                linkUrl.setText(Parse.User.current().get("aesthetic_test_link"));

            });
        });
        document.getElementById('input-projectname-login').onkeypress = function (e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            alert("HEEE")
            if (keyCode == '13') {
                // Enter pressed
                return false;
            }
        }
    }
});







