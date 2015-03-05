/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.MainController = (function() {
    var that = {},
        testSetup = null,
        sliderView = null,
        ratingView = null,
        freeTextView = null,

        init = function() {
            testSetup = AestheticTest.TestSetup.init();
            sliderView = AestheticTest.SliderView.init();
            ratingView = AestheticTest.RatingView.init();
            freeTextView = AestheticTest.FreeTextView.init();

            return this;
        };

    that.init = init;

    return that;
}());