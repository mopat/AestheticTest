$(document).ready(function () {


    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    $('#create-parse-and-generate-link-button').on('click', function () {
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


        saveUser($("#projectname-input").val(), $("#projectpassword-input").val(), $("#project-testurl").val(), toRate);


        // initParseTable($("#projectname-input").val(),toRate);
    });

    $(".login-form").submit(function (event) {
        event.preventDefault();
        login();
    });

    function saveUser(projectname, pw, testurl, toRate) {
        console.log(projectname, pw, testurl);
        var user = new Parse.User();
        user.set("username", projectname);
        user.set("password", pw);
        user.set("testurl", testurl);

        user.set("to_rate_array", toRate);

        user.signUp(null, {
            success: function (user) {
                //alert("user erzeugt");
                //$('#modal-create-team').foundation('reveal', 'close');
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                //$('#modal-existing-team').foundation('reveal', 'open');
                //alert(user,error.message);
            }
        });
    }

    function initParseTable(projectName, toRate) {
        var tableName = projectName + "_table",
            TestPerson = Parse.Object.extend(tableName),
            testPerson = new TestPerson();

        testPerson.set("first_aesthetic", "First Ästhtetic");
        testPerson.set("freetext_aesthetic", "Freetext Ästhtetic");

        for (var i = 0; i < toRate.length; i++) {
            var colNameText = toRate[i] + "_text",
                colNameVal = toRate[i] + "_val";

            testPerson.set("characteristic_" + i + "_text", colNameText);
            testPerson.set("characteristic_" + i + "_val", colNameVal);
            testPerson.save();
        }
    }

    function login() {
        var username = $('#input-projectname-login').val();
        var password = $('#input-password-login').val();
        Parse.User.logIn(username, password, {
            success: function (user) {
                $('.login-form').hide();
                window.location.href = 'aesthetictestresult.html';
            },
            error: function (user, error) {
                self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
            }
        });
    }
});







