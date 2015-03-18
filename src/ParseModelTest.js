AestheticTest.ParseModelTest = (function () {
    var that = {},
        projectName = null,

        init = function () {
            projectName = getParameterByName("projectname");
            console.log("init PARSEMODALTEST");


            // Initialize Parse with your Parse application javascript keys
            Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
                "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");


            $("#finish-test-button").click(function () {
                saveAestheticData(projectName);

            });


            return this;
        },

        getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        saveAestheticData = function (projectName) {
            var tableName = projectName + "_table";
            var TestObject = Parse.Object.extend(tableName);
            var testObject = new TestObject();
            testObject.save({"col1": "wert1"}).then(function (object) {

            });

            testObject.save({"col2": "wert2"}).then(function (object) {

            });
        };

    that.init = init;

    return that;
}());