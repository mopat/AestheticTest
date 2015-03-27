$(document).ready(function () {

    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

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
                $('.login-element').hide();
                $('#logout-element').show();
                $('#div-index-start').hide();

                if (Parse.User.current().get("aesthetic_test_link") === undefined) {
                    $('#div-index-create-test').show();
                }

                $('#div-aesthetic-test-link-panel').show();
                $('#label-aesthetic-test-link').text(Parse.User.current().get("aesthetic_test_link"));

                $('#div-index-result-panel').show();
            },
            error: function (user, error) {
                //Alert wenn Login fehlgeschlagen mit Hilfe
            }
        });
    }
});
