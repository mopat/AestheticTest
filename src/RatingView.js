/**
 * Created by Patrick on 05.03.2015.
 */
AestheticTest.RatingView = (function() {
    var that = {},
        $ratingBox = null,
        $hideButton = null,
        $showButton = null,

        init = function() {
            console.log("init rating");

            $ratingBox = $("#rating-box");
            $hideButton = $("#hide-rating-box-button");
            $showButton = $("#show-rating-box-button");

            initHandler();

            return this;
        },

        initHandler = function(){
            $hideButton.on("click", hideButtonClick);
            $showButton.on("click", showButtonClick);
        },

        hideButtonClick = function(){
            $(this).hide();
            $showButton.show();
            $ratingBox.slideUp(200, function(){
                var height = $(document).height();
                $("#test-page").css("height", height);
            });
        },
        showButtonClick = function(){
            $(this).hide();
            $hideButton.show();
            $ratingBox.slideDown(200, function(){
                var height = $(document).height() - $ratingBox.height();
                $("#test-page").css("height", height);
            });
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