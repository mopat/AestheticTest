AestheticTest.SliderView = (function () {
    var that = {},
        $aestheticSliderModal = null,
        $closeSliderModalButton = null,
        $atGeneralRateBox = null,
        $firstAesthteticRateBox = null,

        init = function () {
            console.log("init slider");
            $aestheticSliderModal = $('#aesthetic-slider-modal');
            $closeSliderModalButton = $("#close-slider-modal-button");
            $firstAesthteticRateBox = $("#first-aesthetic-rate-box");

            $firstAesthteticRateBox.on("click", ".at-general-rate-box", handleFirstRateBoxClick);
            $closeSliderModalButton.on("click", closeSliderModal);
            return this;
        },

        handleFirstRateBoxClick = function () {
            var value = $(this).attr("data-value");
            $(this).parent().find(".picked").removeClass("picked-first-aesthetic").removeClass("picked").addClass("picked-first-aesthetic").addClass("picked");
        },

        _showSliderModal = function () {
            $aestheticSliderModal.foundation('reveal', 'open');
        },

        closeSliderModal = function () {
            $aestheticSliderModal.foundation('reveal', 'close');
            $(that).trigger("showRatingBox");
        };

    that.init = init;
    that._showSliderModal = _showSliderModal;
    return that;
}());