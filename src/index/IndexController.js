AestheticIndex.IndexController = (function () {
    var that = {},
        startView = null,
        loggedInView = null,
        initParse = null,
        loginParse = null,
        resultView = null,
        evaluationCriteria = null,
        buildAestheticTestLink = null,

        init = function () {
            startView = AestheticIndex.StartView.init();
            loginParse = AestheticIndex.LoginParse.init();
            loggedInView = AestheticIndex.LoggedInView.init();
            initParse = AestheticIndex.InitParse.init();

            resultView = AestheticIndex.ResultView.init();
            evaluationCriteria = AestheticIndex.EvaluationCriteria.init();
            buildAestheticTestLink = AestheticIndex.BuildAestheticTestLink.init();

            $(startView).on("buttonSignUpParseClicked", signUpUser);
            $(startView).on("buttonLoginClicked", login);
            $(startView).on("resetParsePassword", resetParsePassword);
            $(startView).on("fetchParseResults", fetchParseResults);

            $(initParse).on("parseUserLoggedIn", showLoggedInView);
            $(initParse).on("fetchParseResults", fetchParseResults);

            $(loggedInView).on("buttonLogoutClicked", logout);

            $(loginParse).on("parseUserLoggedIn", showLoggedInView);
            $(loginParse).on("showResults", showResults);

            return this;
        },

        signUpUser = function (e, projectname, pw, testurl, email) {
            initParse._signUpUser(projectname, pw, testurl, email);
        },

        login = function (e, projectname, pw) {
            loginParse._login(projectname, pw);
        },

        logout = function () {
            loginParse._logout();
        },

        resetParsePassword = function (e, email) {
            initParse._signUpUser(email);
        },

        showLoggedInView = function (e, aestheticTestLink) {
            loggedInView._showLoggedInView(aestheticTestLink);
        },

        fetchParseResults = function () {
            loginParse._fetchParseResults();
        },

        showResults = function (e, toRate, results) {
            resultView._showResults(toRate, results);
        };

    that.init = init;

    return that;
}());
