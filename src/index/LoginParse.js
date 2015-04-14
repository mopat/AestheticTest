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
            showResults(Parse.User.current().get("evaluation_criteria"));
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
        //alert(Parse.User.current())
        var toRate = Parse.User.current().get("evaluation_criteria");
        var projectTable = Parse.User.current().get("username") + "_table";
        var project = Parse.Object.extend(projectTable);
        var query = new Parse.Query(project);

        query.find({
            success: function (results) {
                if (results.length === 0) {
                    $('#alert-null-tests').show();
                } else {
                    $('#alert-null-tests').hide();
                }
                $("#number-of-tests").append('<div id="demographic-test-data" class="panel">' + '<lable>' + "Number of finished Tests: " + results.length + '</lable>' + '</div');


                $('#div-aesthetic-test-result').append('<div id="first-aesthetic-rate" class="panel">' + '<h1 class="subheader">' + "First Aesthetic Rate" + '</h1>' + '</div>');
                var firstAestheticRateMedian = 0;

                for (var j = 0; j < results.length; j++) {
                    var object = results[j];
                    firstAestheticRateMedian = firstAestheticRateMedian + object.get("first_aesthetic_rate") * 1;

                }

                var ugBeaArray = [];
                ugBeaArray.push("Urghhh, this is pretty ugly!");
                ugBeaArray.push("Urghhh, this is ugly!");
                ugBeaArray.push("This is bad!");
                ugBeaArray.push("This is okay!");
                ugBeaArray.push("This is not bad!");
                ugBeaArray.push("Uihhh, this is beautiful!");
                ugBeaArray.push("Uihhh, this is very beautiful!");

                var fARMRound = Math.round(firstAestheticRateMedian / results.length);


                $('#first-aesthetic-rate').append('<img src="img/smileys/' + fARMRound + '.png">' + '<h2 class="subheader">' + ugBeaArray[fARMRound] + '</h2>');


                firstAestheticRateMedian = 100 / 7 * firstAestheticRateMedian / results.length;

                $('#first-aesthetic-rate').append('<div id="first-aesthetic-rate-hc">' + '</div>');


                $('#div-aesthetic-test-result').append('<div id="freetext-aesthetic" class="panel">' + '<h1 class="subheader">' + "Freetext Aesthetic" + '</h1>' + '</div>');


                for (var j = 0; j < results.length; j++) {
                    var object = results[j];

                    $('#freetext-aesthetic').append('<p>' + object.get("freetext_aesthetic") + '</p>');
                }

                for (var i = 0; i < toRate.length; i++) {
                    var criteria = toRate[i];
                    var aestheticRateMedian = 0;
                    $('#div-aesthetic-test-result').append('<div class="criteria"> <h1 class="subheader">' + criteria + '</h1>' + '<div class="panel result-wrapper" id="' + criteria + '"</div></div>');
                    for (var j = 0; j < results.length; j++) {
                        var object = results[j];
                        aestheticRateMedian = aestheticRateMedian + object.get(criteria + "val") * 1;
                    }

                    $('#' + criteria).append('<div>' + '<img src="img/smileys/' + Math.round(aestheticRateMedian / results.length) + '.png">' + '<h2 class="subheader">' + ugBeaArray[Math.round(aestheticRateMedian / results.length)] + '</h2>' + '</div>');
                }

                //open wrapper
                $(".result-wrapper").hide();
                $(".subheader").on("click", function (e) {
                    var $result = $(e.target).parent().find(".panel");
                    if ($result.is(":visible")) {
                        $result.slideUp(500, function () {

                        });
                    }
                    else $result.slideDown(500);


                    $('body').animate({
                        scrollTop: $(e.target).offset().top
                    }, 500);
                });

                var seriesDataHcFirstAe = [0, 0, 0, 0, 0, 0, 0],
                    seriesDataHc1 = [],
                    seriesDataHc2 = [],
                    seriesDataHc3 = [],
                    seriesDataHc4 = [],
                    seriesDataHc5 = [],
                    seriesDataHc6 = [],
                    seriesDataHc0 = [];

                for (var x = 0; x < toRate.length; x++) {
                    seriesDataHc1.push(0);
                    seriesDataHc2.push(0);
                    seriesDataHc3.push(0);
                    seriesDataHc4.push(0);
                    seriesDataHc5.push(0);
                    seriesDataHc6.push(0);
                    seriesDataHc0.push(0);
                }

                for (var j = 0; j < results.length; j++) {
                    var object = results[j];


                    if (object.get("first_aesthetic_rate") == 0)
                        seriesDataHcFirstAe[0]++;

                    if (object.get("first_aesthetic_rate") == 1)
                        seriesDataHcFirstAe[1]++;

                    if (object.get("first_aesthetic_rate") == 2)
                        seriesDataHcFirstAe[2]++;

                    if (object.get("first_aesthetic_rate") == 3)
                        seriesDataHcFirstAe[3]++;

                    if (object.get("first_aesthetic_rate") == 4)
                        seriesDataHcFirstAe[4]++;

                    if (object.get("first_aesthetic_rate") == 5)
                        seriesDataHcFirstAe[5]++;

                    if (object.get("first_aesthetic_rate") == 6)
                        seriesDataHcFirstAe[6]++;


                }


                for (var i = 0; i < toRate.length; i++) {
                    var criteria = toRate[i];
                    $('#' + criteria).append('<div id="' + criteria + '-hc">' + 'criteria' + '</div>');


                    for (var j = 0; j < results.length; j++) {
                        var object = results[j];


                        if (object.get(criteria + "val") == 0)
                            seriesDataHc0[i]++;

                        if (object.get(criteria + "val") == 1)
                            seriesDataHc1[i]++;

                        if (object.get(criteria + "val") == 2)
                            seriesDataHc2[i]++;

                        if (object.get(criteria + "val") == 3)
                            seriesDataHc3[i]++;

                        if (object.get(criteria + "val") == 4)
                            seriesDataHc4[i]++;

                        if (object.get(criteria + "val") == 5)
                            seriesDataHc5[i]++;

                        if (object.get(criteria + "val") == 6)
                            seriesDataHc6[i]++;


                    }
                }

                var options = {
                    chart: {
                        type: 'bar',
                        renderTo: 'container'
                    },
                    title: {
                        text: 'AestheticTest Characteristics'
                    },
                    xAxis: {
                        categories: toRate
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Percent'
                        }
                    },
                    legend: {
                        reversed: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'percent'
                        }
                    },
                    series: [{
                        name: 'Uihhh, this is very beautiful!',
                        data: seriesDataHc6
                    }, {
                        name: 'Uihhh, this is beautiful!',
                        data: seriesDataHc5
                    }, {
                        name: 'This is not bad!',
                        data: seriesDataHc4
                    }, {
                        name: 'This is okay!',
                        data: seriesDataHc3
                    }, {
                        name: 'This is bad!',
                        data: seriesDataHc2
                    }, {
                        name: 'Urghhh, this is ugly!',
                        data: seriesDataHc1
                    }, {
                        name: 'Urghhh, this is pretty ugly!',
                        data: seriesDataHc0
                    }]
                };

                $(document).ready(function () {
                    var chart = new Highcharts.Chart(options);
                });

                //-------------


                var optionsFirstAestheticHc = {
                    chart: {
                        type: 'bar',
                        renderTo: 'first-aesthetic-rate-hc'
                    },
                    title: {
                        text: 'AestheticTest first aesthetic rate'
                    },
                    xAxis: {

                        categories: ["first aesthetic rate"]
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Percent'
                        }
                    },
                    legend: {
                        reversed: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'percent'
                        }
                    },
                    series: [{
                        name: 'Uihhh, this is very beautiful!',
                        data: [seriesDataHcFirstAe[6]]
                    }, {
                        name: 'Uihhh, this is beautiful!',
                        data: [seriesDataHcFirstAe[5]]
                    }, {
                        name: 'This is not bad!',
                        data: [seriesDataHcFirstAe[4]]
                    }, {
                        name: 'This is okay!',
                        data: [seriesDataHcFirstAe[3]]
                    }, {
                        name: 'This is bad!',
                        data: [seriesDataHcFirstAe[2]]
                    }, {
                        name: 'Urghhh, this is ugly!',
                        data: [seriesDataHcFirstAe[1]]
                    }, {
                        name: 'Urghhh, this is pretty ugly!',
                        data: [seriesDataHcFirstAe[0]]
                    }]
                };

                $(document).ready(function () {
                    var chartHc = new Highcharts.Chart(optionsFirstAestheticHc);
                });


                for (var i = 0; i < toRate.length; i++) {
                    var criteria = toRate[i];
                    var optionsHc = {
                        chart: {
                            type: 'bar',
                            renderTo: criteria + "-hc"
                        },
                        title: {
                            text: 'AestheticTest bar chart'
                        },
                        xAxis: {

                            categories: [criteria]
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Percent'
                            }
                        },
                        legend: {
                            reversed: true
                        },
                        plotOptions: {
                            series: {
                                stacking: 'percent'
                            }
                        },
                        series: [{
                            name: 'Uihhh, this is very beautiful!',
                            data: [seriesDataHc6[i]]
                        }, {
                            name: 'Uihhh, this is beautiful!',
                            data: [seriesDataHc5[i]]
                        }, {
                            name: 'This is not bad!',
                            data: [seriesDataHc4[i]]
                        }, {
                            name: 'This is okay!',
                            data: [seriesDataHc3[i]]
                        }, {
                            name: 'This is bad!',
                            data: [seriesDataHc2[i]]
                        }, {
                            name: 'Urghhh, this is ugly!',
                            data: [seriesDataHc1[i]]
                        }, {
                            name: 'Urghhh, this is pretty ugly!',
                            data: [seriesDataHc0[i]]
                        }]
                    };

                    $(document).ready(function () {
                        var chartHc = new Highcharts.Chart(optionsHc);
                    });

                }

                for (var i = 0; i < toRate.length; i++) {
                    var criteria = toRate[i];


                    for (var j = 0; j < results.length; j++) {
                        var object = results[j];
                        $('#' + criteria).append('<blockquote>' + object.get(criteria + "text") + '</blockquote>');
                    }

                }

            },
            error: function (error) {
                swal("Error: " + error.code + " " + error.message, null, "error");
            }
        });

    };
});
