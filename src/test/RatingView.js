AestheticTest.RatingView = (function () {
    var that = {},
        $ratingBox = null,
        $hideButton = null,
        $showButton = null,
        toRateTpl = null,
        ratingFields = null,

        init = function () {
            $ratingBox = $("#rating-box");
            $hideButton = $("#hide-rating-box-button");
            $showButton = $("#show-rating-box-button");

            toRateTpl = _.template($("#to-rate-tpl").html());

            initHandler();

            return this;
        },

        initHandler = function () {
            $hideButton.on("click", hideButtonClick);
            $showButton.on("click", showButtonClick);
        },

        hideButtonClick = function () {
            $(this).hide();
            $showButton.show();
            $ratingBox.slideUp(200, function () {
                var height = $(document).height();
                $("#test-page").css("height", height);
            });
        },

        showButtonClick = function () {
            $(this).hide();
            $hideButton.show();
            $ratingBox.slideDown(200, function () {
                var height = $(document).height() - $ratingBox.height();
                $("#test-page").css("height", height);
            });
        },

        _showRatingBox = function () {
            $ratingBox.slideDown(200, function () {
                var height = $(document).height() - $ratingBox.height();
                $("#test-page").css("height", height);
            });
        },

        _addRatingFields = function (toRate) {
            ratingFields = toRate;
            for (var i = 0; i < toRate.length; i++) {

                var rateItem = toRateTpl({
                    button_attribute_to_rate: ratingFields[i],
                    attribute: ratingFields[i]
                });

                $ratingBox.append(rateItem);
                $("#rate-list-" + ratingFields[i]).attr("data-num-characteristic", i);
            }

            $(".rate-list").on("click", ".at-general-rate-box", function (e) {
                var $list = $(this).parent().parent(),
                    currentChar = ratingFields[$list.attr("data-num-characteristic")];
                $list.find(".picked").removeClass("picked");

                $(this).addClass("picked");

                $("#value-" + currentChar).html($list.find(".picked").attr("data-value"));
            });

            $(".show-rate-components-button").on("click", function (e) {
                $("#rate-textbox-Font").hide();
                $("#rate-textbox-Color").hide();
                $("#rate-textbox-Images").hide();
                $(".active").removeClass("active");
                $(this).hide();
                $(".to-rate-wrapper").hide();
                $(e.target).closest(".to-rate-wrapper").show();
                var id = $(this).attr("id"),
                    rateComponents = $("#rate-components-" + id),
                    rateTextBox = $("#rate-textbox-" + id),
                    okButton = $("#ok-button-" + id),
                    rateInfo = $("#rate-info-" + id);

                $("#rate-slider-value-" + id).addClass("active");

                $(".rate-slider").on("mousemove", function () {
                    $(".active").html($(this).val());
                });
                rateComponents.show();

                okButton.on("click", function (e) {
                    console.log(rateTextBox.attr("id"))
                    if($(this).attr("id") == "ok-button-Font"){
                        $("#font-modal").foundation("reveal", "open");
                    }
                    if($(this).attr("id") == "ok-button-Color"){
                        $("#color-modal").foundation("reveal", "open");
                    }
                    if($(this).attr("id") == "ok-button-Images"){
                        $("#image-modal").foundation("reveal", "open");
                    }
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