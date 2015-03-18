

            // Initialize Parse with your Parse application javascript keys
            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

            $("#test-result-button").click(function () {
                showResults();
            });

            showResults = function () {
                var teamName = $("#projectname-input").val() + "_table";
                var team = Parse.Object.extend(teamName);
                var query = new Parse.Query(team);

                query.find({
                    success: function (results) {
                        // Do something with the returned Parse.Object values
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];


                            $("#player-table").append($("<tr class='player-context-menu'>").append($('<td></td>'
                            + '<td class="player-name">' + object.get('ghghgText') + '</td>')));
                        }
                    },
                    error: function (error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });

            };


