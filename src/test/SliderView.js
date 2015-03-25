AestheticTest.SliderView = (function () {
    var that = {},
        $aestheticSliderModal = null,
        $closeSliderModalButton = null,

        init = function () {
            console.log("init slider");
            $aestheticSliderModal = $('#aesthetic-slider-modal');
            $closeSliderModalButton = $("#close-slider-modal-button");
            $closeSliderModalButton.on("click", closeSliderModal);
            return this;
        },

        _showSliderModal = function () {
            $aestheticSliderModal.foundation('reveal', 'open');
        },

        closeSliderModal = function(){
            $aestheticSliderModal.foundation('reveal', 'close');
            $(that).trigger("showRatingBox");
        };

    that.init = init;
    that._showSliderModal = _showSliderModal;
    return that;
}());