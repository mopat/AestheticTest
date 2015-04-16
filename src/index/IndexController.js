AestheticIndex.IndexController = (function () {
    var that = {},
        initParse = null,
        loginParse = null,
        resultView = null,
        evaluationCriteria = null,
        buildAestheticTestLink = null,

        init = function () {
            initParse = AestheticIndex.InitParse.init();
            loginParse = AestheticIndex.LoginParse.init();
            resultView = AestheticIndex.ResultView.init();
            evaluationCriteria = AestheticIndex.EvaluationCriteria.init();
            buildAestheticTestLink = AestheticIndex.BuildAestheticTestLink.init();

            $(loginParse).on("showResults", showResults);

            return this;
        },

        showResults = function (e, toRate, results) {
            resultView._showResults(toRate, results);
        };

    that.init = init;

    return that;
}());
