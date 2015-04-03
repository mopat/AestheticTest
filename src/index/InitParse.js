$(document).ready(function () {

    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    $('#button-sign-up-parse').on('click', function () {
        signUpUser($("#input-projectname").val(), $("#input-projectpassword").val(), $("#input-project-testurl").val(), $("#input-project-email").val());
    });

    $('#button-reset-pw').on('click', function () {
        alert("You will receive an e -mail with a link to reset your password.");
        $('#modal-reset-pw').foundation('reveal', 'close');
        Parse.User.requestPasswordReset($('#input-email-reset-pw').val(), {
            success: function () {
            },
            error: function (error) {
                // Show the error message somewhere
                alert("For this e -mail address , there is no top team account.");
            }
        });
    });

    function signUpUser(projectname, pw, testurl, email) {
        if (isNumeric(projectname.charAt(0))) {
            alert("Projectname may not start with a number")
        }
        if (isNumeric(projectname.charAt(0)) == false) {
            var user = new Parse.User();
            user.set("username", projectname);
            user.set("password", pw);

            user.set("testurl", testurl);
            user.set("email", email);

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
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
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







