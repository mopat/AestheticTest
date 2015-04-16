AestheticTest.ParseModelTest = (function () {
    var that = {},
        projectName = null,
        ratingFields = null,

        init = function () {
            projectName = getParameterByName("projectname");

            // Initialize Parse with your Parse application javascript keys
            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

            $("#finish-test-button").click(function () {
                saveAestheticData();
                $('#general-aesthetic-modal').foundation('reveal', 'close');
                $('#test-box').hide();
                $('#test-finished').show();

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

        saveAestheticData = function () {
            var endFreeText = $("#end-freetext-aesthetic-test").val(),
             firstAestheticValue = $(".picked-first-aesthetic").attr("data-value"),
             tableName = projectName + "_table",
                TestPerson = Parse.Object.extend(tableName),
                testPerson = new TestPerson(),
                gender = $("#gender option:selected").text(),
                age = $("#age option:selected").val(),
                websiteExperience = $("#website-experience option:selected").val(),
                profession = $("#profession").val();
            console.log(gender,age,websiteExperience,profession);

            testPerson.set("gender", gender);
            testPerson.set("age", age);
            testPerson.set("website_experience", websiteExperience);
            testPerson.set("profession", profession);


            for (var i = 0; i < ratingFields.length; i++) {

                var colNameText = ratingFields[i] + "Text",
                    colNameVal = ratingFields[i] + "Val",
                    textBoxValue = $("#rate-textbox-" + ratingFields[i]).val(),
                    pickedRatingBoxValue = $("#value-" + ratingFields[i]).html();

                testPerson.set(colNameText.toLocaleLowerCase(), textBoxValue);
                testPerson.set(colNameVal.toLocaleLowerCase(), pickedRatingBoxValue);
            }

            testPerson.set("first_aesthetic_rate", firstAestheticValue);
            testPerson.set("freetext_aesthetic", endFreeText);

            testPerson.save(null, {
                success: function (val) {

                    // Execute any logic that should take place after the object is saved.
                    //alert('New object created with objectId: ');
                },
                error: function (val, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    //alert('Failed to create new object, with error code: ' + error.message);
                }
            });
        };

    that._setRatingArray = _setRatingArray;
    that.init = init;

    return that;
}());