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

                $("#number-of-tests").append('<lable>' + "Number of finished Tests: " + results.length + '</lable>');
                if (results.length === 0) {
                    $('#alert-null-tests').show();
                }
                $('#div-aesthetic-test-result').append('<div id="first-aesthetic-rate">' + '<h1 class="subheader">' + "First Aesthetic Rate" + '</h1>' + '</div>');
                var firstAestheticRateMedian = 0;

                for (var j = 0; j < results.length; j++) {
                    var object = results[j];
                    console.log(firstAestheticRateMedian);
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
                //alert(fARMRound);


                $('#first-aesthetic-rate').append('<img src="img/smileys/' + fARMRound + '.png">' + '<label>' + ugBeaArray[fARMRound] + '</label>');


                firstAestheticRateMedian = 100 / 7 * firstAestheticRateMedian / results.length;

                $('#first-aesthetic-rate').append('<div class="progress secondary alert success radius round">' +
                '<span id="aesthetic-bar" class="meter " style="width:' + firstAestheticRateMedian + '%"' + '></span></div>');
















                $('#div-aesthetic-test-result').append('<div id="freetext-aesthetic">' + '<h1 class="subheader">' + "Freetext Aesthetic" + '</h1>' + '</div>');


                for (var j = 0; j < results.length; j++) {
                    var object = results[j];

                    $('#first-aesthetic-rate').append('<p>' + object.get("first_aesthetic_rate") + '</p>');

                    $('#freetext-aesthetic').append('<p>' + object.get("freetext_aesthetic") + '</p>');

                }


                // $('#aesthetic-bar').width(firstAestheticRateMedian + "%");


                //(alert(firstAestheticRateMedian);


                for (var i = 0; i < toRate.length; i++) {
                    var criteria = toRate[i];
                    $('#div-aesthetic-test-result').append('<div id="' + criteria + '">' + '<h1 class="subheader">' + criteria + '</h1>' + '</div>');
                    for (var j = 0; j < results.length; j++) {
                        var object = results[j];
                        $('#' + criteria).append('<p>' + object.get(criteria + "text") + "Wert" + object.get(criteria + "val") + '</p>');
                    }
                }

                var seriesDataHc1 = [],
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


                console.log(seriesDataHc1, seriesDataHc6);


                var options = {
                    chart: {
                        type: 'bar',
                        renderTo: 'container'
                    },
                    title: {
                        text: 'AestheticTest bar chart'
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


                //var myArray = [1];


                //$('#container').highcharts({


                // });


                //$('#container').highcharts().options.series[0].data.push([1]);










            },
            error: function (error) {
                swal("Error: " + error.code + " " + error.message, null, "error");
            }
        });

    };
});
