$(document).ready(function () {

    Parse.initialize("f9adAlRbVFDK1YlOeuU5sbeIi6e46brSVvADAUZW",
        "Y9hZUmuVX5EHU7q05rdsO7CuaOQNH1XxZ0K5IWk1");

    $('#button-create-aesthetic-test').on('click', function () {

        buildAesthteticTestLink();

    });

    function buildAesthteticTestLink() {
        var aestheticTestLink = "",
            user = Parse.User.current(),
            testurl = user.get("testurl"),
            projectName = user.get("username"),
            time = $('#time-slider').val(),
            toRate = user.get("evaluation_criteria");


        aestheticTestLink = document.URL.replace(window.location.pathname, "/AestheticTest/test.html");
        aestheticTestLink = aestheticTestLink.replace("#", "");
        testurl = testurl.replace(":", "%3A");
        testurl = testurl.replace("/", "%2F");

        /*     if ($('#checkbox1').prop('checked') == true) {
         var checkbox1 = "on";
         }*/

        aestheticTestLink = aestheticTestLink + "?projectname=" + projectName + "&testurl=" + testurl + "&time=" + time +
        "&font=" + "on" + "&color=" + "on" + "&pictures=" + "on" + "&chracteristic1=" + $('#chracteristic1').val() + "&chracteristic2=" + $('#chracteristic2').val() + "&chracteristic3=" + $('#chracteristic3').val();

        showAestheticTestLink(aestheticTestLink);


        //&color=on&chracteristic1=Icons&chracteristic2=Logo&chracteristic3=

        //saveAestheticTestLink(aestheticTestLink);
    }

    function showAestheticTestLink(aestheticTestLink) {

        $('#label-aesthetic-test-link').text(aestheticTestLink);
        $('#div-aesthetic-test-link-panel').show();
    }

    /*    function saveAestheticTestLink(aestheticTestLink) {
     var user = Parse.User.current();
     user.set("aesthetic_test_link", aestheticTestLink);
     user.save();
     //$('#div-index-create-test').hide();
     }*/


});



