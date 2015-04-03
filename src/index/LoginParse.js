$(document).ready(function () {

    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    if (Parse.User.current() != null) {
        loggedIn();
        showResults();
    }

    $("#button-login").click(function (event) {
        //event.preventDefault();
        console.log(Parse.User.current())
         login($('#input-projectname-login').val(), $('#input-password-login').val());
        if (Parse.User.current() != null) {
            loggedIn();
            showResults();
        }
    });

    $("#button-logout").click(function (event) {
        //event.preventDefault();
        Parse.User.logOut();
        location.reload();
    });


    function login(username, password) {
        Parse.User.logIn(username, password, {
            success: function (user) {
                showResults(Parse.User.current().get("evaluation_criteria"));
                loggedIn();
            },
            error: function (user, error) {
                swal(error.message);
            }
        });
    }



    function loggedIn() {
        $('.login-element').hide();
        $('#logout-element').show();
        $('#div-index-start').hide();

        if (Parse.User.current().get("aesthetic_test_link") === undefined) {
            $('#div-index-create-test').show();
        }

        $('#div-aesthetic-test-link-panel').show();
        $('#label-aesthetic-test-link').html(Parse.User.current().get("aesthetic_test_link"));
        $('#label-aesthetic-test-link').attr("href", Parse.User.current().get("aesthetic_test_link"));
        $('#div-index-result-panel').show();



        //in zwischenablage kopieren
        var linkUrl = new ZeroClipboard($("#copy-link-button"), {
            moviePath: "libs/ZeroClipboard.swf",
            debug: false
        });

        linkUrl.on("load", function (linkUrl) {
            linkUrl.on("complete", function (linkUrl, args) {
                linkUrl.setText(Parse.User.current().get("aesthetic_test_link"));
            });
        });
        document.getElementById('input-projectname-login').onkeypress = function (e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13') {
                // Enter pressed
                return false;
            }
        }
    }
     function showResults() {
        alert(Parse.User.current())
        var toRate = Parse.User.current().get("evaluation_criteria");
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
