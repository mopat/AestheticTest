AestheticIndex.LoginParse = (function () {
    var that = {},

        init = function () {
            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

            $(document).ready(function () {
                if (Parse.User.current() != null) {
                    $(that).trigger("parseUserLoggedIn", [Parse.User.current().get("aesthetic_test_link")]);
                    _fetchParseResults();
                }
            });

            return this;
        },

        _login = function (username, password) {

            Parse.User.logIn(username, password, {
                success: function (user) {
                    $(that).trigger("parseUserLoggedIn", [Parse.User.current().get("aesthetic_test_link")]);
                    _fetchParseResults();
                },
                error: function (user, error) {
                    swal(error.message);
                }
            });
        },

        _logout = function () {
            Parse.User.logOut();
            location.reload();
        },

        _fetchParseResults = function () {

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
        };

    that._login = _login;
    that._fetchParseResults = _fetchParseResults;
    that._logout = _logout;
    that.init = init;

    return that;
}());





