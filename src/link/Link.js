/**
 * Created by majone on 10.03.15.
 */




$(document).ready(function () {
    console.log(window.location.pathname);
    var res = document.URL.replace(window.location.pathname, "/AestheticTest/test.html");
    $("#aesthetic-test-link-label").attr("href", res).html(res);
});