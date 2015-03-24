$(document).ready(function () {
    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    $('#create-parse-and-generate-link-button').on('click', function () {
        saveUser($("#projectname-input").val(), $("#projectpassword-input").val(), $("#project-testurl").val());
    });

    $(".login-form").submit(function (event) {
        event.preventDefault();
        login();
    });


    function saveUser(projectname, pw, testurl) {
        console.log(projectname, pw, testurl);
        var user = new Parse.User();
        user.set("username", projectname);
        user.set("password", pw);
        user.set("testurl", testurl);

        user.signUp(null, {
            success: function (user) {
                //alert("user erzeugt");
                //$('#modal-create-team').foundation('reveal', 'close');
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                //$('#modal-existing-team').foundation('reveal', 'open');
                //alert(user,error.message);
            }
        });


    }

    function login() {
        var username = $('#input-projectname-login').val();
        var password = $('#input-password-login').val();
        Parse.User.logIn(username, password, {
            success: function (user) {
                $('.login-form').hide();

                window.location.href = 'aesthetictestresult.html';

            },
            error: function (user, error) {
                self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
            }
        });
    }
});







