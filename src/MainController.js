/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.MainController = (function() {
    var that = {},
        sliderView = null,
        ratingView = null,
        freeTextView = null,

        init = function() {
            sliderView = AestheticTest.SliderView.init();
            ratingView = AestheticTest.RatingView.init();
            freeTextView = AestheticTest.FreeTextView.init();
        };

    that.init = init;

    return that;
}());