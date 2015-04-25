AestheticIndex.LoggedInView = (function () {
    var that = {},
        $loginElements = null,
        $logoutElement = null,
        $buttonLogout = null,
        $divIndexStart = null,
        $divIndexCreateTest = null,
        $divAestheticTestLinkPanel = null,
        $labelAestheticTestLink = null,
        $divIndexResultPanel = null,

        init = function () {

            $loginElements = $('.login-element');
            $logoutElement = $('#logout-element');
            $buttonLogout = $("#button-logout");
            $divIndexStart = $('#div-index-start');
            $divIndexCreateTest = $('#div-index-create-test');
            $divAestheticTestLinkPanel = $('#div-aesthetic-test-link-panel');
            $labelAestheticTestLink = $('#label-aesthetic-test-link');
            $divIndexResultPanel = $('#div-index-result-panel');

            return this;
        },

        _showLoggedInView = function (aestheticTestLink) {

            $loginElements.hide();
            $logoutElement.show();
            $divIndexStart.hide();

            $buttonLogout.click(function (event) {
                $(that).trigger("buttonLogoutClicked");
            });

            if (aestheticTestLink === undefined) {
                $divIndexCreateTest.show();
            }

            $divAestheticTestLinkPanel.show();
            $labelAestheticTestLink.html(aestheticTestLink);
            $labelAestheticTestLink.attr("href", aestheticTestLink);
            $divIndexResultPanel.show();

            var linkUrl = new ZeroClipboard($("#copy-link-button"), {
                moviePath: "libs/ZeroClipboard.swf",
                debug: false
            });

            //in zwischenablage kopieren
            linkUrl.on("load", function (linkUrl) {
                linkUrl.on("complete", function (linkUrl, args) {
                    linkUrl.setText(aestheticTestLink);
                });
            });
        };

    that._showLoggedInView = _showLoggedInView;
    that.init = init;

    return that;
}());