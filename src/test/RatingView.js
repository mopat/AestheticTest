AestheticTest.RatingView = (function() {
    var that = {},
        $ratingBox = null,
        $hideButton = null,
        $showButton = null,
        toRateTpl = null,
        ratingFields = null,
        firstAestheticRangeSlider = null,

        init = function() {
            $ratingBox = $("#rating-box");
            $hideButton = $("#hide-rating-box-button");
            $showButton = $("#show-rating-box-button");
            firstAestheticRangeSlider =  $("#first-aesthetic-range-slider");

            toRateTpl = _.template($("#to-rate-tpl").html());

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
        },

        _addRatingFields = function(toRate){
            ratingFields = toRate;
            for(var i = 0; i < toRate.length; i++){
                var currentCharactersitic = ratingFields[i];
                var rateItem = toRateTpl({
                    button_attribute_to_rate: ratingFields[i],
                    attribute: ratingFields[i]
                });

                $ratingBox.append(rateItem);
            }

            $(".show-rate-components-button").on("click", function(e){
                $(".active").removeClass("active");
                $(this).hide();
                $(".to-rate-wrapper").hide();
                $(e.target).closest(".to-rate-wrapper").show();
                var id = $(this).attr("id"),
                rateComponents =  $("#rate-components-" + id),
                   okButton = $("#ok-button-" + id),
                    rateInfo = $("#rate-info-" + id);

                $("#rate-slider-value-" + id).addClass("active");

                $(".rate-slider").on("mousemove", function(){
                    $(".active").html($(this).val());
                });
                rateComponents.show();

                okButton.on("click", function (e) {
                    rateComponents.hide();
                    $(".to-rate-wrapper").show();
                    $(".show-rate-components-button").show();
                });
            })
        };

    that._addRatingFields = _addRatingFields;
    that._showRatingBox = _showRatingBox;
    that.init = init;

    return that;
}());