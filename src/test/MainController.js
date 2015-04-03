AestheticTest.MainController = (function () {
    var that = {},
        testSetup = null,
        sliderView = null,
        ratingView = null,
        freeTextView = null,
        parseModalTest = null,
        result = null,

        init = function () {
            testSetup = AestheticTest.TestSetup.init();
            sliderView = AestheticTest.SliderView.init();
            ratingView = AestheticTest.RatingView.init();
            freeTextView = AestheticTest.FreeTextView.init();
            parseModalTest = AestheticTest.ParseModelTest.init();

            $(testSetup).on("characteristicsGenerated", generateCharacteristics);
            $(testSetup).on("showSliderModal", showSliderModal);
            $(sliderView).on("showRatingBox", showRatingBox);

            return this;
        },

        showSliderModal = function () {
            sliderView._showSliderModal();
        },

        showRatingBox = function(){
            ratingView._showRatingBox();
        },

            generateCharacteristics = function (e, toRate) {
                ratingView._addRatingFields(toRate)
                parseModalTest._setRatingArray(toRate);
        };

    that.init = init;

    return that;
}());