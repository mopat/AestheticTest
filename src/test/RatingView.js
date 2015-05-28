AestheticTest.RatingView = (function () {
    var that = {},
        $ratingBox = null,
        $hideButton = null,
        $showButton = null,
        toRateTpl = null,
        ratingFields = null,
        $ratingBoxPointer = null,
        start = null,
        $thirdStepButton = null,
        $ratingBoxHeading = null,
        allRated = false,
        $imageModalMinimize = null,
        $colorModalMinimize = null,
        $fontModalMinimize = null,
        $imageModalShowButton = null,
        $colorModalShowButton = null,
        $fontModalShowButton = null,
        $modalButtonBox = null,
        $backButton = null,

    init = function () {
        $ratingBox = $("#rating-box");
        $hideButton = $("#hide-rating-box-button");
        $showButton = $("#show-rating-box-button");
        $ratingBoxPointer = $("#rating-box-pointer");
        $thirdStepButton = $("#third-step-button");
        $thirdStepButton.hide();
        $ratingBoxHeading = $("#rating-box-heading");
        $backButton = $(".back-button");

        $modalButtonBox = $("#modal-button-box");


        $imageModalMinimize = $("#image-modal-minimize");
        $colorModalMinimize = $("#color-modal-minimize");
        $fontModalMinimize = $("#font-modal-minimize");

        $imageModalShowButton = $("#image-modal-show-button");
        $colorModalShowButton = $("#color-modal-show-button");
        $fontModalShowButton = $("#font-modal-show-button");

        $imageModalShowButton.hide();
        $colorModalShowButton.hide();
        $fontModalShowButton.hide();


        toRateTpl = _.template($("#to-rate-tpl").html());
        start = true;
        initHandler();
        $(".font-image-color-box").on("click", ".close-reveal-modal", function () {
            $ratingBox.height(380);
            $fontModalShowButton.hide();
            $colorModalShowButton.hide();
            $imageModalShowButton.hide();
            $(".to-rate-wrapper").show();

            if (allRated) {
                swal({
                    title: "Thanks for your rating! Now you can enter the third step on the right!",
                    text: "You can't go back after clicking the 'Third Step' button!",
                    imageUrl: "img/thirdstep.png",
                    imageSize: "180x180"
                });
            }
            else {
                swal({
                    title: "Your data has been saved successfully!",
                    text: "Auto-close close in 2 seconds.",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });

        return this;
    },

        initHandler = function () {
            $hideButton.on("click", hideButtonClick);
            $showButton.on("click", showButtonClick);
            $imageModalShowButton.on("click", showImageModal);
            $colorModalShowButton.on("click", showColorModal);
            $fontModalShowButton.on("click", showFontModal);
        },

        showImageModal = function () {
            $("#image-modal").foundation("reveal", "open");
        },

        showColorModal = function () {
            $("#color-modal").foundation("reveal", "open");
        },

        showFontModal = function () {
            $("#font-modal").foundation("reveal", "open");
        },

        hideButtonClick = function () {
            $hideButton.hide();
            $showButton.show();
            $ratingBox.slideUp(200, function () {
                var height = $(document).height();
                $("#test-page").css("height", height);
            });
        },

        showButtonClick = function () {
            $showButton.hide();
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
                    function loopArrowDown() {
                        $("#arrow-down-pointer").fadeOut(500, function () {
                            $(this).fadeIn(500, loopArrowDown);
                        });
                    }

                    loopArrowDown();
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
            var counter = toRate.length;
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
                var $clickedCharactersiticButton = $(this)

                $ratingBoxHeading.hide();

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
                    $clickedCharactersiticButton.addClass("success").removeClass("info");
                    if ($(this).attr("id") == "ok-button-font") {
                        $("#font-modal").foundation("reveal", "open");
                        $fontModalMinimize.on('click', function () {
                            $ratingBox.height(51);
                            $fontModalShowButton.show();
                            $(".to-rate-wrapper").hide();
                            $("#font-modal").foundation("reveal", "close");
                        });
                    }
                    if ($(this).attr("id") == "ok-button-color") {
                        $("#color-modal").foundation("reveal", "open");
                        $colorModalMinimize.on('click', function () {
                            $ratingBox.height(51);
                            $(".to-rate-wrapper").hide();
                            $colorModalShowButton.show();
                            $("#color-modal").foundation("reveal", "close");
                        });

                    }
                    if ($(this).attr("id") == "ok-button-images") {
                        $("#image-modal").foundation("reveal", "open");
                        $imageModalMinimize.on('click', function () {
                            $ratingBox.height(51);
                            $imageModalShowButton.show();
                            $(".to-rate-wrapper").hide();
                            $("#image-modal").foundation("reveal", "close");
                        });
                    }


                    rateComponents.hide();
                    $ratingBoxHeading.show();
                    $(".to-rate-wrapper").show();
                    $(".show-rate-components-button").show();

                    var count = 0;

                    $(".show-rate-components-button").each(function (index) {
                        if ($(this).hasClass("success") == false) {
                            return;
                        }
                        count++;
                        if (count == toRate.length) {
                            $thirdStepButton.show();
                            allRated = true;
                        }

                    });


                });
            });
            $(".show-all-button").on("click", function(){
                $ratingBoxHeading.show();
                $(".to-rate-wrapper").show();
                $(".show-rate-components").hide();
                $(".show-rate-components-button").show();
            });
        };

    that._addRatingFields = _addRatingFields;
    that._showRatingBox = _showRatingBox;
    that.init = init;

    return that;
}());