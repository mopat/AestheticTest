AestheticIndex.InitParse = (function () {
    var that = {},

        init = function () {

            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

            return this;
        },

        _signUpUser = function (projectname, pw, testurl, email) {
            if (isNumeric(projectname.charAt(0))) {
                swal("Projectname may not start with a number", null, "error");
            }
            if (isNumeric(projectname.charAt(0)) == false) {
                var user = new Parse.User();
                user.set("username", projectname);
                user.set("password", pw);

                user.set("testurl", testurl);
                user.set("email", email);

                user.signUp(null, {
                    success: function (user) {
                        $(that).trigger("parseUserLoggedIn", [Parse.User.current().get("aesthetic_test_link")]);
                        $(that).trigger("fetchParseResults");
                    },
                    error: function (user, error) {
                        swal(error.message, null, "error");
                    }
                });
            }
        },

        isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        _resetParsePassword = function (email) {

            Parse.User.requestPasswordReset(email, {
                success: function () {

                },
                error: function (error) {
                    // Show the error message somewhere
                    swal("For this e -mail address , there is no top team account.");
                }
            });
        };


    that._signUpUser = _signUpUser;
    that._resetParsePassword = _resetParsePassword;
    that.init = init;

    return that;
}());

































