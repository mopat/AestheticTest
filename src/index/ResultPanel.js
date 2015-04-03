$(document).ready(function () {

    // Initialize Parse with your Parse application javascript keys
    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    showResults = function (toRate) {
        if (Parse.User.current() != null)
            showResults(Parse.User.current().get("evaluation_criteria"));


            var projectTable = Parse.User.current().get("username") + "_table";
            var project = Parse.Object.extend(projectTable);
            var query = new Parse.Query(project);



        query.find({
            success: function (results) {

                $("#number-of-tests").append('<lable>' + "Number of finished Tests: " + results.length + '</lable>');
                if (results.length === 0) {
                    $('#alert-null-tests').show();
                }
                $('#div-aesthetic-test-result').append('<div id="first-aesthetic-rate">' + '<h1 class="subheader">' + "First Aesthetic Rate" + '</h1>' + '</div>');

                $('#div-aesthetic-test-result').append('<div id="freetext-aesthetic">' + '<h1 class="subheader">' + "Freetext Aesthetic" + '</h1>' + '</div>');

                for (var j = 0; j < results.length; j++) {
                    var object = results[j];

                    $('#first-aesthetic-rate').append('<p>' + object.get("first_aesthetic_rate") + '</p>');

                    $('#freetext-aesthetic').append('<p>' + object.get("freetext_aesthetic") + '</p>');

                }


                for (var i = 0; i < toRate.length; i++) {
                    var criteria = toRate[i];
                    $('#div-aesthetic-test-result').append('<div id="' + criteria + '">' + '<h1 class="subheader">' + criteria + '</h1>' + '</div>');
                    for (var j = 0; j < results.length; j++) {
                        var object = results[j];
                        $('#' + criteria).append('<p>' + object.get(criteria + "text") + "Wert" + object.get(criteria + "val") + '</p>');
                    }
                }
            },
            error: function (error) {
                swal("Error: " + error.code + " " + error.message, null, "error");
            }
        });

    };
});