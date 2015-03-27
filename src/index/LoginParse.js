$(document).ready(function () {

    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    console.log(Parse.User.current())

    if (Parse.User.current() != null) {
        loggedIn();
    }


    $("#button-login").click(function (event) {
        //event.preventDefault();
        login($('#input-projectname-login').val(), $('#input-password-login').val());
    });

    $("#button-logout").click(function (event) {
        //event.preventDefault();
        Parse.User.logOut();
        location.reload();
    });


    function login(username, password) {
        Parse.User.logIn(username, password, {
            success: function (user) {
                loggedIn();
            },
            error: function (user, error) {
                alert(error.message);
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
            alert("HEEE")
            if (keyCode == '13') {
                // Enter pressed
                return false;
            }
        }
    }
});
