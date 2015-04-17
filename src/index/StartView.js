AestheticIndex.StartView = (function () {
    var that = {},
        $buttonSignUpParse = null,
        $buttonResetPw = null,
        $buttonLogin = null,

        init = function () {

            $buttonSignUpParse = $('#button-sign-up-parse');
            $buttonResetPw = $('#button-reset-pw');
            $buttonLogin = $("#button-login");

            $buttonSignUpParse.on('click', function () {
                $(that).trigger("buttonSignUpParseClicked", [$("#input-projectname").val(), $("#input-projectpassword").val(), $("#input-project-testurl").val(), $("#input-project-email").val()]);
            });

            $buttonResetPw.on('click', function () {
                swal("You will receive an e -mail with a link to reset your password.");
                $('#modal-reset-pw').foundation('reveal', 'close');
                $(that).trigger("resetParsePassword", [$('#input-email-reset-pw').val()]);
            });

            $buttonLogin.click(function (event) {
                $(that).trigger("buttonLoginClicked", [$('#input-projectname-login').val(), $('#input-password-login').val()])
            });

            return this;
        };


    that.init = init;

    return that;
}());

