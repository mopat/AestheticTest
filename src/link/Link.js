



$(document).ready(function () {


    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    //console.log(window.location.pathname);
    var res = document.URL.replace(window.location.pathname, "/AestheticTest/test.html");
    $("#aesthetic-test-link-label").attr("href", res).html(res);

    saveLink = function (res) {


    };

    getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    saveLink(res);


});