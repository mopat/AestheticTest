AestheticIndex.EvaluationCriteria = (function () {
    var that = {},

        init = function () {

            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

            $('input:checkbox').on("click", function () {
                if ($(this).attr('checked') == 'checked') {
                    $(this).removeAttr("checked")
                }
                else {
                    $(this).attr("checked", "checked");
                }
            });

            $('#button-create-aesthetic-test').on('click', function () {

                var toRate = [];

                if ($('#checkbox1').attr("checked") == "checked") {
                    toRate.push($('#checkbox1').attr('name'));
                }
                if ($('#checkbox2').attr("checked") == "checked") {
                    toRate.push($('#checkbox2').attr('name'));
                }
                if ($('#checkbox3').attr("checked") == "checked") {
                    toRate.push($('#checkbox3').attr('name'));
                }
                if ($('#chracteristic1').val() != "") {
                    toRate.push($('#chracteristic1').val().toLowerCase());
                }
                if ($('#chracteristic2').val() != "") {
                    toRate.push($('#chracteristic2').val().toLowerCase());
                }
                if ($('#chracteristic3').val() != "") {
                    toRate.push($('#chracteristic3').val().toLowerCase());
                }


                saveEvaluationCriteria(toRate, $('#time-slider').val());

            });

            return this;
        },

        saveEvaluationCriteria = function (toRate, time) {
            var user = Parse.User.current();
            user.set("evaluation_criteria", toRate);
            user.set("testtime", time * 1);
            user.save();
            $('#div-index-create-test').hide();
        };


    that.init = init;

    return that;
}());











