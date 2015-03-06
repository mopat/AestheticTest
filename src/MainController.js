/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.MainController = (function () {
    var that = {},
        testSetup = null,
        sliderView = null,
        ratingView = null,
        freeTextView = null,

        init = function () {
            testSetup = AestheticTest.TestSetup.init();
            sliderView = AestheticTest.SliderView.init();
            ratingView = AestheticTest.RatingView.init();
            freeTextView = AestheticTest.FreeTextView.init();


            $(testSetup).on("showSliderModal", showSliderModal);
            $(sliderView).on("showRatingBox", showRatingBox);
            return this;
        },

        showSliderModal = function () {
            sliderView._showSliderModal();

        },

        showRatingBox = function(){
            ratingView._showRatingBox();
        };

    that.init = init;

    return that;
}());