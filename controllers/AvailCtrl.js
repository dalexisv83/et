(function (angular) {
    'use strict';
    angular.module('entertainment')
        .controller('AvailCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', '$q', '$compile',
            function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, $q, $compile) {
                var getDsse = $http.jsonp($scope.basePath + 'web/api/game/' + $scope.zipClick + '?callback=JSON_CALLBACK', { cache: true }).then(function successTest(response) {
                    return response.data;
                }, function errorTest(response) {
                    throw new Error(JSON.stringify(response));
                }),
                    renderSport = function (league) {
                        var sport = "";
                        switch (league) {
                            case "MLB":
                            case "MLBSFHD":
                            case "MLB -IN WORK":
       
                                // "MLB -IN WORK" added to help out mlb network
                                sport = "Major League Baseball";
                                break;
                            case "WNBA":
                                sport = "Women's Basketball";
                                break;
                            case "MLS":
                            case "MLSHD":
                                sport = "Major League Soccer";
                                break;
                            case "EPL":
                                sport = "English Soccer";
                                break;
                            case "CFB":
                            case "CFB -IN WORK":
                            case "CFB2":
                            case "CFBPPV":
                            case "CFBGP":
                            case "CFBGP -IN WORK":
                                sport = "College Football";
                                break;
                            case "NHL":
                            case "NHL -\nIN WORK":
                            case "NHLHD":
                            case "NHL HD":
                            case "NHLHD2":
                            case "NHL HD2":
                                sport = "Pro Hockey";
                                break;
                            case "NFL":
                            case "NFLSFHD":
                                sport = "Pro Football";
                                break;
                            case "NBA":
                            case "NBA -\nIN WORK":
                            case "NBAHD":
                                sport = "Pro Basketball";
                                break;
                            case "CHKY":
                                sport = "College Hockey";
                                break;
                            case "CT":
                            case "CTPPT":
                                sport = "Cricket";
                                break;
                            case "WCBK":
                                sport = "Women's College Basketball";
                                break;
                                // safa added start
                            case "CBK":
                            case "CBKHD":
                            case "CBKHD -IN WORK":
                                // safa added end
                                sport = "College Basketball";
                                break;
                            case "CVB":
                                sport = "College Volleyball";
                                break;
                            case "MMM":
                            case "MMMX":
                                sport = "College Basketball";
                                break;
                            case "AFB":
                                sport = "Arena Football";
                                break;
                            case "Setanta Sports Alt":
                                sport = "Setanta Sports";
                                break;
                            case "LIGA":
                                sport = "La Liga";
                                break;
                            case "NSCR":
                            case "NSCRHD":
                                sport = "NASCAR";
                                break;
                            case "CBB":
                                sport = "College Baseball";
                            case "CSB":
                                sport = "College Softball";
                            default:
                                sport = league;
                        };
                        return sport;
                    },
                    renderChan = function (isInMarket, channel, oomChannel, broadcaster, league) {
                        var output = '<b>Ch ';
                        if (isInMarket){
                            if (channel) {
                                output += channel + '</b> - ' + broadcaster;
                            }
                        } else {
                            if (oomChannel) {
                                output += oomChannel + '</b> - ' + renderPackage(league) + '<br /><small><strong>Feed: </strong>' + broadcaster + '</small>';
                            }
                        }
                        return output;
                    },
                    renderMin = function (minService,broadcaster) {
                        var output;
                        switch (minService) {
                            case 1:
                                output = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537459' target='_blank'>Choice</a> / <a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537613' target='_blank'>Mas Ultra</a></p>";
                                break;
                            case 2:
                                output = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537919' target='_blank'>Xtra</a></p>";
                                break;
                            case 3:
                                output = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong></strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537459' target='_blank'>Choice</a> / <a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537613' target='_blank'>Mas Ultra</a> with <a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_cha_spo_538723' target='_blank'>Sports Pack</a></p>";
                                break;
                            default:
                                output = ''
                                break;
                        }
                        switch (broadcaster) {
                            case "MLB Network":
                                output = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537459' target='_blank'>Choice</a> / <a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537613' target='_blank'>Mas Ultra</a></p>";
                                break;

                            case "NBA TV":
                                output = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537919' target='_blank'>Xtra</a> / <a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537586' target='_blank'>Lo Maximo</a></p>";
                                break;
                            case "NHL Network":
                                output = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537919' target='_blank'>Xtra</a></p>";
                                break;
                            case "NFL Network":
                                output = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537459' target='_blank'>Choice</a> / <a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537613' target='_blank'>Mas Ultra</a></p>";
                                break;
                            case "NBC Sports":
                                output = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537459' target='_blank'>Choice</a> / <a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537586' target='_blank'>Lo Maximo</a></p>";
                                break;
                            case "CFB":
                            case "CFB -IN WORK":
                                output = "<p class='alert alert-info feed'><strong>Required: </strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_cha_spo_538723' target='_blank'>Sports Pack</a></p>";
                                break;
                                // safa added start
                            case "CBKHD":
                            case "CBKHD -IN WORK":
                                output = "<p class='alert alert-info feed'><strong>Required: </strong><a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_cha_spo_538723' target='_blank'>Sports Pack</a></p>";
                                break;
                                // safa added end
                        };
                        return output;
                    },
                renderPackage = function(league) {
                    var strPkgName = league;
                    switch (league) {
                        case "MLBSFHD":
                        case "MLB":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537596' target='_blank'>MLB Extra Innings</a>";
                            break;
                        case "MLS":
                        case "MLSHD":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537598' target='_blank'>MLS Direct Kick</a>";
                            break;
                        case "EPL":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_cha_spo_537490?fragid=7' target='_blank'>DIRECTV Soccer</a>";
                            break;
                        case "CFBGP":
                        case "CFBGP -IN WORK":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_cha_spo_538723' target='_blank'>Sports Pack</a>";
                            break;
                            //safa added start
                        case "CBKHD":
                        case "CBKHD -IN WORK":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_cha_spo_538723' target='_blank'>Sports Pack</a>";
                            break;
                            // safa added end
                        case "NHL":
                        case "NHL -\nIN WORK":
                        case "NHLHD":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_cha_spo_537630' target='_blank'>NHL Center Ice</a>";
                            break;
                        case "NFL":
                        case "NFLSFHD":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_dir_544790' target='_blank'>NFL Sunday Ticket</a>";
                            break;
                        case "NBA":
                        case "NBA -\nIN WORK":
                        case "NBAHD":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537619' target='_blank'>NBA League Pass</a>";
                            break;
                        case "RGBY":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_cha_spo_537777' target='_blank'>DIRECTV Rugby</a>";
                            break;
                        case "CFBPPV":
                            strPkgName = "<a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_pac_537656' target='_blank'>PPV College Football</a>";
                            break;
                    }
                    return strPkgName + " <span class='local_national' q-tip='{{disclaimer}}' q-tip-my='bottom right'><img src='assets/img/warning-icon.png'></span>";

                };

                $scope.categories = [{
                    "category": "",
                    "label": "Search all"
                }];
                $.fn.dataTable.moment('MMM Do - h:mmA');
                $scope.dsseOptions = DTOptionsBuilder.fromFnPromise(getDsse)
                    .withLanguage({ "sSearch": "<p class='pull-left'>Search Within Results</p>" })
                    .withOption('paging', false)
                    .withOption('searchHighlight', true)
                    .withOption('scrollCollapse', true)
                    .withOption('scrollY', 400)
                    .withOption("fnDrawCallback", function (settings) {
                        $('div.dataTables_filter input').addClass('form-control pull-left global_filter').attr('type', 'text');
                        $compile(angular.element('#' + settings.sTableId).contents())($scope);
                    });
                $scope.dsseColumns = [
                    DTColumnBuilder.newColumn('datetime').withTitle('Date/Time (ET)').withOption("width", "12.5%").renderWith(function (data, type, full, meta) {
                        return moment(data, moment.ISO_8601).format('MMM Do - h:mmA');
                    }),
                    DTColumnBuilder.newColumn(null).withTitle('Sport').withOption("width", "12.5%").renderWith(function (data, type, full, meta) {
                        $scope.categories.push({ "category": renderSport(data['league']), "label": renderSport(data['league'])});
                        return renderSport(data['league']);
                    }),
                    DTColumnBuilder.newColumn(null).withTitle('Away Team @ Home Team').withOption("width", "50%").renderWith(function (data, type, full, meta) {
                        return data['away'] + ' @ ' + data['home'] + (data['replay'] ? ' <span class="label label-warning">Replay</span>' : '');
                    }), ,
                    DTColumnBuilder.newColumn(null).withTitle('Availability').withOption("width", "25%").renderWith(function (data, type, full, meta) {
                        return renderChan(data['isInMarket'], data['channel'], data['oomChannel'], data['broadcaster'], data['league']) + renderMin(data['minService'], data['broadcaster']);
                    })
                ];
                $scope.dsseInstance = {};
                $scope.disclaimer = $("<p>Before offering out-of-market sports package, check <a href='http://www.directv.com/DTVAPP/packProg/localChannels.jsp?assetId=cms_local_channels&_requestid=2230690' target='_blank'>local</a> or <a href='https://www.e-access.att.com/mycsp/mycspportal/proxyServlet?content_matrix_id=myc_ser_tv_cha_spo_538187' target='_blank'>national</a> channels for game availability.</p>").html();

                $scope.category = "";

                $scope.changeCat = function () {
                    if ($scope.dsseInstance.DataTable) {
                        $scope.dsseInstance.DataTable.column(1).search($scope.category).draw();
                    }
                };
            }
        ]);
}(window.angular));