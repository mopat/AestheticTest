$(document).ready(function () {
    // Initialize Parse with your Parse application javascript keys
    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");


    showResults = function (toRate) {
        var teamName = Parse.User.current().get("username") + "_table";
        var team = Parse.Object.extend(teamName);
        var query = new Parse.Query(team);

        query.find({
            success: function (results) {
                // Do something with the returned Parse.Object values
                $("#number-of-tests").append('<lable>' + "Number of Tests: " + results.length + '</lable>');


                for (var x = 0; x < toRate.length; x++) {
                    var toRateVal = toRate[x];
                    console.log(toRateVal);
                    $("#result-table").append('<tr>' + '<td>' + toRate[x] + '</td>' + '</tr>');
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        $("#result-table").append('<tr>' + '<td>' + object.get(toRateVal + "text") + '</td>' + '<td>' + object.get(toRateVal + "val") + '</td>' + '</tr>');


                    }
                }
                //$("#result-table").append('<tr>' + '<td>' + object.get("freetext_aesthetic") + '</td>' + '</tr>');
                //$("#result-table").append('<tr>' + '<td>' + object.get("first_aesthetic_rate") + '</td>' + '</tr>');



            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

    };

    $('#logout-button').on("click", function () {
        Parse.User.logOut();
    });

    showResults(Parse.User.current().get("to_rate_array"));


});



