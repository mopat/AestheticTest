/**
 * Created by majone on 10.03.15.
 */




$(document).ready(function () {
    console.log(window.location.pathname);
    var res = document.URL.replace(window.location.pathname, "/AestheticTest/test.html");
    $("#aesthetic-test-link-box").text(res);
});