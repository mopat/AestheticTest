AestheticTest.ParseModelTest = (function () {
    var that = {},
        projectName = null,
        ratingFields = null,

        init = function () {
            projectName = getParameterByName("projectname");
            console.log("init PARSEMODALTEST");


            // Initialize Parse with your Parse application javascript keys
            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");


            $("#finish-test-button").click(function () {


                saveAestheticData(projectName, $("#end-freetext-aesthetic-test").val(), $("#first-aesthetic-rate-value").val());

            });


            return this;
        },

        getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        _setRatingArray = function (toRate) {
            ratingFields = toRate;
        },

        saveAestheticData = function (projectName, freetext, firstAeRate) {
            console.log(freetext);
            var tableName = projectName + "_table";
            var TestObject = Parse.Object.extend(tableName);
            var testObject = new TestObject();

            testObject.set("first_aesthetic_rate", firstAeRate);

            for (var i = 0; i < ratingFields.length; i++) {
                var colName = ratingFields[i] + "text";
                var colText = $("#rate-textbox-" + ratingFields[i]).val();
                testObject.set(colName, colText);

                //rateVar = ratingFields[i] + "wert";
                // rateWert = "wert" + i;
                // testObject.set(rateVar, rateWert);

            }


            testObject.set("freetext_aesthetic", freetext);

            testObject.save(null, {
                success: function (gameScore) {
                    // Execute any logic that should take place after the object is saved.
                    alert('New object created with objectId: ');
                },
                error: function (gameScore, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });


        };
    that._setRatingArray = _setRatingArray;
    that.init = init;


    return that;
}());