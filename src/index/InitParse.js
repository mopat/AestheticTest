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
            },
            error: function (user, error) {
                alert("user nicht erzeugt");
            }
        });
    }

});







