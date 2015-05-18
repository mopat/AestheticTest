AestheticTest.RatingView = (function () {
    var that = {},
        $ratingBox = null,
        $hideButton = null,
        $showButton = null,
        toRateTpl = null,
        ratingFields = null,
        $ratingBoxPointer = null,
        start = null,

        init = function () {
            $ratingBox = $("#rating-box");
            $hideButton = $("#hide-rating-box-button");
            $showButton = $("#show-rating-box-button");
            $ratingBoxPointer = $("#rating-box-pointer");
            toRateTpl = _.template($("#to-rate-tpl").html());
            start = true;
            initHandler();
            $(".font-image-color-box").on("click", ".close-reveal-modal", function () {
                swal({
                    title: "Your data has been saved successfully!",
                    text: "Auto-close close in 2 seconds.",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            });

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
            $hideButton.show();
            $ratingBox.slideDown(200, function () {
                var height = $(document).height() - $ratingBox.height();
                if (start) {
                    $ratingBox.dimBackground();
                    $ratingBoxPointer.show();
                    start = false;
                    setTimeout(function () {
                        $ratingBox.undim();
                        $ratingBoxPointer.hide();
                    }, 5000);
                }
                $("#test-page").css("height", height);
            });
        },

        _addRatingFields = function (toRate) {

            ratingFields = toRate;
            for (var i = 0; i < ratingFields.length; i++) {

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
                $(this).css("background", "green")
                $("#rate-textbox-font").hide();
                $("#rate-textbox-color").hide();
                $("#rate-textbox-images").hide();
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
                    if ($(this).attr("id") == "ok-button-font") {
                        $("#font-modal").foundation("reveal", "open");
                    }
                    if ($(this).attr("id") == "ok-button-color") {
                        $("#color-modal").foundation("reveal", "open");
                    }
                    if ($(this).attr("id") == "ok-button-images") {
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