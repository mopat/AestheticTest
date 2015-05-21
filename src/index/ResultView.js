AestheticIndex.ResultView = (function () {
    var that = {},
        $alertNullTests = null,
        $divIndexResultPanel = null,
        $demographicTestData = null,
        $divAestheticTestResult = null,
        $firstAestheticRate = null,
        $firstAestheticRateHighchart = null,
        $freetextAesthetic = null,
        ugBeaArray = [],
        $divColorResult = null,
        $divFontResult = null,
        $divImgResult = null,
        $divColorResultComposition = null,
        $divColorResultHue = null,
        $divColorResultSaturation = null,
        $divColorResultBrightness = null,
        $divColorResultOther = null,
        $divFontResultComposition = null,
        $divFontResultFamily = null,
        $divFontResultStyle = null,
        $divFontResultSize = null,
        $divFontResultOther = null,
        $divImgResultNumber = null,
        $divImgResultSize = null,
        $divImgResultBadUsages = null,
        $divImgResultOther = null,
        $projectInfo = null,


        init = function () {

            $projectnameInfo = $("#projectinfo");
            $projectnameInfo.append("Projectname: " + Parse.User.current().get("username") + "</br>" + "Project-URL: " + Parse.User.current().get("testurl"));

            $alertNullTests = $('#alert-null-tests');
            $demographicTestData = $("#demographic-test-data");
            $divAestheticTestResult = $('#div-aesthetic-test-result');
            $firstAestheticRate = $('#first-aesthetic-rate');
            $firstAestheticRateHighchart = $('#first-aesthetic-rate-highchart');
            $freetextAesthetic = $('#freetext-aesthetic');

            $divColorResult = $('#div-color-result');
            $divFontResult = $('#div-font-result');
            $divImgResult = $('#div-img-result');
            $divColorResultComposition = $('#div-color-result-composition');
            $divColorResultHue = $('#div-color-result-hue');
            $divColorResultSaturation = $('#div-color-result-saturation');
            $divColorResultBrightness = $('#div-color-result-brightness');
            $divColorResultOther = $('#div-color-result-other');


            $divFontResultComposition = $('#div-font-result-composition');
            $divFontResultFamily = $('#div-font-result-family');
            $divFontResultStyle = $('#div-font-result-style');
            $divFontResultSize = $('#div-font-result-size');
            $divFontResultOther = $('#div-font-result-other');

            $divImgResultNumber = $('#div-img-result-number');
            $divImgResultSize = $('#div-img-result-size');
            $divImgResultBadUsages = $('#div-img-result-bad-usages');
            $divImgResultOther = $('#div-img-result-other');

            initUgBeaArray();

            return this;
        },

        initUgBeaArray = function () {
            ugBeaArray.push("Urghhh, this is pretty ugly!");
            ugBeaArray.push("Urghhh, this is ugly!");
            ugBeaArray.push("This is bad!");
            ugBeaArray.push("This is okay!");
            ugBeaArray.push("This is not bad!");
            ugBeaArray.push("Uihhh, this is beautiful!");
            ugBeaArray.push("Uihhh, this is very beautiful!");
        },

        _showResults = function (toRate, results) {

            if (results.length === 0) {
                $alertNullTests.show();
                $demographicTestData.hide();
                $divAestheticTestResult.hide();

            } else {
                $alertNullTests.hide();

                showDemographicTestDataPanel(results);

                showFirstAestheticRatePanel(results);

                showFreetextAestheticPanel(results);

                showCriteriaPanels(toRate, results);

            }


        },

        showDemographicTestDataPanel = function (results) {

            $demographicTestData.append('<p><span>' + "Number of finished Tests: " + results.length + '</span></p>');

            var m = 0,
                w = 0,
                noEx = 0,
                upTo1Mo = 0,
                mo16 = 0,
                moreT6 = 0,
                ageU20 = 0,
                age20T29 = 0,
                age30T39 = 0,
                age40T49 = 0,
                ageO50 = 0;


            for (var j = 0; j < results.length; j++) {
                var object = results[j];
                if (object.get("gender") == "man") {
                    m++;
                } else {
                    w++;
                }


                if (object.get("website_experience") == "3") {
                    moreT6++;
                }
                if (object.get("website_experience") == "2") {
                    mo16++;
                }
                if (object.get("website_experience") == "1") {
                    upTo1Mo++;
                }
                if (object.get("website_experience") == "0") {
                    noEx++;
                }

                if (object.get("age") == "4") {
                    ageO50++;
                }

                if (object.get("age") == "3") {
                    age40T49++;
                }
                if (object.get("age") == "2") {
                    age30T39++;
                }
                if (object.get("age") == "1") {
                    age20T29++;
                }
                if (object.get("age") == "0") {
                    ageU20++;
                }
            }

            $demographicTestData.append('<p><span>' + "Under 20: " + ageU20 + '</span>' + '</br>' + '<span>' + "20-29: " + age20T29 + '</span>' + '</br>' + '<span>' + "30-39: " + age30T39 + '</span>' + '</br>' + '<span>' + "40-49: " + age40T49 + '</span>' + '</br>' + '<span>' + "Over 50: " + ageO50 + '</span></p>');

            $demographicTestData.append('<p><span>' + "Man: " + m + '</span>' + '</br>' + '<span>' + "Woman: " + w + '</span></p>');

            $demographicTestData.append('<p><span>' + "I have no experience with this website: " + noEx + '</span>' + '</br>' + '<span>' + "Up to 1 Month: " + upTo1Mo + '</span>' + '</br>' + '<span>' + "1 - 6 Months: " + mo16 + '</span>' + '</br>' + '<span>' + "More Than 6 Months: " + moreT6 + '</span></p>');

            $demographicTestData.append('<bold>' + "Profession: " + '</bold>');

            for (var j = 0; j < results.length; j++) {
                var object = results[j];
                $demographicTestData.append('<span>' + object.get("profession") + '; ' + '</span>');
            }


        },

        showFirstAestheticRatePanel = function (results) {

            var firstAestheticRateMedian = 0,
                fARMRound = 0,
                seriesDataHcFirstAe = [0, 0, 0, 0, 0, 0, 0];

            for (var j = 0; j < results.length; j++) {
                var object = results[j];
                firstAestheticRateMedian = firstAestheticRateMedian + object.get("first_aesthetic_rate") * 1;
            }

            fARMRound = Math.round(firstAestheticRateMedian / results.length);

            if (isNaN(fARMRound) == false) {
                $firstAestheticRate.append('<img src="img/smileys/' + fARMRound + '.png">' + '<h2 class="subheader">' + ugBeaArray[fARMRound] + '</h2>');
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

            showFirstAestheticRateHighchart(seriesDataHcFirstAe);

        },

        showFreetextAestheticPanel = function (results) {
            for (var j = 0; j < results.length; j++) {
                var object = results[j];
                if (object.get("freetext_aesthetic") != "") {
                    $freetextAesthetic.append('<blockquote>' + object.get("freetext_aesthetic") + '</blockquote>');
                }

            }
        },

        showCriteriaPanels = function (toRate, results) {
            for (var i = 0; i < toRate.length; i++) {
                var criteria = toRate[i],
                    aestheticRateMedian = 0;


                var $criteriaDiv = $("<div>", {class: "criteria"});

                if (i % 2 == 0) {
                    $criteriaDiv.css("background-color", "#DEDEDE")
                }
                else {
                    $criteriaDiv.css("background-color", "#C0C0C0")
                }
                var subheader = "<h1 class='subheader circle'><a href='#' class='open-panel'>" + criteria + "</a></h1>";

                var $resultPanel = $("<div>", {id: criteria, class: "result-wrapper panel"});
                $divAestheticTestResult.append($criteriaDiv);

                $criteriaDiv.html(subheader);
                $criteriaDiv.append($resultPanel);


                for (var j = 0; j < results.length; j++) {
                    var object = results[j];
                    aestheticRateMedian = aestheticRateMedian + object.get(criteria + "val") * 1;
                }

                if (criteria == "color" || criteria == "font" || criteria == "images") {
                    if (criteria == "color") {
                        $('#' + criteria).append('<div>' + '<img src="img/smileys/' + Math.round(aestheticRateMedian / results.length) + '.png">' + '<h2 class="subheader">' + ugBeaArray[Math.round(aestheticRateMedian / results.length)] + '</h2>' + '</div>');
                        $('#' + criteria).append($divColorResult);
                        for (var j = 0; j < results.length; j++) {
                            var object = results[j];


                            if (object.get("color_composition") != "") {
                                $divColorResultComposition.append('<blockquote>' + object.get("color_composition") + '</blockquote>');
                            }
                            if (object.get("hue") != "") {
                                $divColorResultHue.append('<blockquote>' + object.get("hue") + '</blockquote>');
                            }

                            if (object.get("color_saturation") != "") {
                                $divColorResultSaturation.append('<blockquote>' + object.get("color_saturation") + '</blockquote>');

                            }
                            if (object.get("color_brightness") != "") {
                                $divColorResultBrightness.append('<blockquote>' + object.get("color_brightness") + '</blockquote>');

                            }
                            if (object.get("color_other") != "") {
                                $divColorResultOther.append('<blockquote>' + object.get("color_other") + '</blockquote>');

                            }
                        }

                    }
                    if (criteria == "font") {
                        $('#' + criteria).append('<div>' + '<img src="img/smileys/' + Math.round(aestheticRateMedian / results.length) + '.png">' + '<h2 class="subheader">' + ugBeaArray[Math.round(aestheticRateMedian / results.length)] + '</h2>' + '</div>');
                        $('#' + criteria).append($divFontResult);
                        for (var j = 0; j < results.length; j++) {
                            var object = results[j];

                            if (object.get("font_composition") != "") {
                                $divFontResultComposition.append('<blockquote>' + object.get("font_composition") + '</blockquote>');
                            }
                            if (object.get("font_family") != "") {
                                $divFontResultFamily.append('<blockquote>' + object.get("font_family") + '</blockquote>');
                            }
                            if (object.get("font_style") != "") {
                                $divFontResultStyle.append('<blockquote>' + object.get("font_style") + '</blockquote>');
                            }
                            if (object.get("font_size") != "") {
                                $divFontResultSize.append('<blockquote>' + object.get("font_size") + '</blockquote>');
                            }
                            if (object.get("font_other") != "") {
                                $divFontResultOther.append('<blockquote>' + object.get("font_other") + '</blockquote>');
                            }
                        }
                    }
                    if (criteria == "images") {
                        $('#' + criteria).append('<div>' + '<img src="img/smileys/' + Math.round(aestheticRateMedian / results.length) + '.png">' + '<h2 class="subheader">' + ugBeaArray[Math.round(aestheticRateMedian / results.length)] + '</h2>' + '</div>');
                        $('#' + criteria).append($divImgResult);
                        for (var j = 0; j < results.length; j++) {
                            var object = results[j];

                            if (object.get("images_number") != "") {
                                $divImgResultNumber.append('<blockquote>' + object.get("images_number") + '</blockquote>');
                            }

                            if (object.get("images_size") != "") {
                                $divImgResultSize.append('<blockquote>' + object.get("images_size") + '</blockquote>');
                            }

                            if (object.get("images_usage") != "") {
                                $divImgResultBadUsages.append('<blockquote>' + object.get("images_usage") + '</blockquote>');
                            }

                            if (object.get("images_other") != "") {
                                $divImgResultOther.append('<blockquote>' + object.get("images_other") + '</blockquote>');
                            }





                        }
                    }
                } else {
                    $('#' + criteria).append('<div>' + '<img src="img/smileys/' + Math.round(aestheticRateMedian / results.length) + '.png">' + '<h2 class="subheader">' + ugBeaArray[Math.round(aestheticRateMedian / results.length)] + '</h2>' + '</div>');
                }
            }

            $(".open-panel").on("click", function (e) {
                var $result = $(e.target).parent().parent().find(".panel");

                if ($result.is(":visible")) {
                    $result.slideUp(500, function () {
                        $(window).resize();
                    });
                }
                else $result.slideDown(500);


                $('body').animate({
                    scrollTop: $(e.target).offset().top
                }, 500);
            });


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

            showCriteriasHighchartPanel(toRate, seriesDataHc0, seriesDataHc1, seriesDataHc2, seriesDataHc3, seriesDataHc4, seriesDataHc5, seriesDataHc6);

            showAestheticCriteriaHighcharts(toRate, seriesDataHc0, seriesDataHc1, seriesDataHc2, seriesDataHc3, seriesDataHc4, seriesDataHc5, seriesDataHc6);


            for (var i = 0; i < toRate.length; i++) {
                var criteria = toRate[i];


                for (var j = 0; j < results.length; j++) {
                    var object = results[j];
                    if (object.get(criteria + "text") != "") {
                        $('#' + criteria).append('<blockquote>' + object.get(criteria + "text") + '</blockquote>');

                    }
                    $(".result-wrapper").hide();

                }

            }
        },

        showFirstAestheticRateHighchart = function (seriesDataHcFirstAe) {

            var optionsFirstAestheticHighchart = {
                chart: {
                    type: 'bar',
                    renderTo: 'first-aesthetic-rate-highchart'
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
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
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
                var chartHc = new Highcharts.Chart(optionsFirstAestheticHighchart);
            });
        },

        showCriteriasHighchartPanel = function (toRate, seriesDataHc0, seriesDataHc1, seriesDataHc2, seriesDataHc3, seriesDataHc4, seriesDataHc5, seriesDataHc6) {
            var options = {
                chart: {
                    type: 'bar',
                    renderTo: 'all-aesthetic-criteria-highchart'
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
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
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

        },

        showAestheticCriteriaHighcharts = function (toRate, seriesDataHc0, seriesDataHc1, seriesDataHc2, seriesDataHc3, seriesDataHc4, seriesDataHc5, seriesDataHc6) {
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
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                        shared: true
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
        };

    that._showResults = _showResults;
    that.init = init;

    return that;
}());




