$(document).ready(function () {
    // Initialize Parse with your Parse application javascript keys
    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    //alert(Parse.User.current().get("username"));


    showResults = function () {
        var teamName = Parse.User.current().get("username") + "_table";
        console.log(teamName);
        var team = Parse.Object.extend(teamName);
        var query = new Parse.Query(team);

        query.find({
            success: function (results) {
                // Do something with the returned Parse.Object values
                $("#number-of-tests").append('<lable>' + "Number of Tests: " + results.length + '</lable>');
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];


                    $("#result-table").append('<tr>' + '<td>' + object.get("freetext_aesthetic") + '</td>' + '</tr>');

                }


            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

    };

    $('#logout-button').on("click", function () {
        Parse.User.logOut();
    });

    showResults();


});



