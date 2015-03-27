$(document).ready(function () {

    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    $('#button-create-aesthetic-test').on('click', function () {

        var toRate = [];

        if ($('#checkbox1').prop('checked') == true) {
            toRate.push($('#checkbox1').attr('name'));
        }
        if ($('#checkbox2').prop('checked') == true) {
            toRate.push($('#checkbox2').attr('name'));
        }
        if ($('#checkbox3').prop('checked') == true) {
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

        saveEvaluationCriteria(toRate);

    });

    function saveEvaluationCriteria(toRate) {
        var user = Parse.User.current();
        user.set("evaluation_criteria", toRate);
        user.save();
        //$('#div-index-create-test').hide();
    }


});







