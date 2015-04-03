AestheticTest.SliderView = (function () {
    var that = {},
        $aestheticSliderModal = null,
        $closeSliderModalButton = null,
        $atGeneralRateBox = null,

        init = function () {
            console.log("init slider");
            $aestheticSliderModal = $('#aesthetic-slider-modal');
            $closeSliderModalButton = $("#close-slider-modal-button");
            $closeSliderModalButton.on("click", closeSliderModal);
           $atGeneralRateBox = $(".at-general-rate-box");

            $atGeneralRateBox.on("click", handleRateBoxClick);
            return this;
        },

        handleRateBoxClick = function(e){
            var $target = $(e.currentTarget)
            var value = $target.attr("data-value");
            $atGeneralRateBox.removeClass("picked");
            $target.addClass("picked");
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