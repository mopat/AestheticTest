/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.RatingView = (function() {
    var that = {},
        $ratingBox = null,

        init = function() {
            console.log("init rating");

            $ratingBox = $("#rating-box");
            return this;
        },

        _showRatingBox = function(){
            $ratingBox.slideDown(200, function(){
                var height = $(document).height() - $ratingBox.height();
                $("#test-page").css("height", height);
            });
        };

    that._showRatingBox = _showRatingBox;
    that.init = init;

    return that;
}());