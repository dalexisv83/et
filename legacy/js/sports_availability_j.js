var user = {}; // declaring user object

// RSN
var rsn_lookup = function(user_zipcode) {
    var state = {};
    var rsn = [];
    var choice = [];
    var xtra = [];
    var sports_pack = [];
    var mlb = [];
    var nba = [];
    var nhl = [];
    var zip_range, zip_start, zip_end;
    //$.getJSON( "http://agentanswercenter.directv.com/en-us/res/rover_tools/rsn/rsnzip.js" )
    _.each(rsnzip, function(val, key) {
        if (val.ZIP_CODE === user_zipcode) {
            state = rsnzip[key].STATE;

            rsn.push(rsnzip[key].CHOICE_MAS_ULTRA);
            choice.push(rsnzip[key].CHOICE_MAS_ULTRA);

            rsn.push(rsnzip[key].XTRA);
            xtra.push(rsnzip[key].XTRA);

            rsn.push(rsnzip[key].SPORTS_PACK);
            sports_pack.push(rsnzip[key].SPORTS_PACK);

            mlb.push(rsnzip[key].MLB);
            nba.push(rsnzip[key].NBA);
            nhl.push(rsnzip[key].NHL);
        };

        if (rsnzip[key].ZIP_CODE.length > 5) {
            zip_range = rsnzip[key].ZIP_CODE.split('-');
            zip_start = zip_range[0];
            zip_end = zip_range[1];

            if (user_zipcode >= zip_start && user_zipcode <= zip_end) {
                state = rsnzip[key].STATE;

                rsn.push(rsnzip[key].CHOICE_MAS_ULTRA);
                choice.push(rsnzip[key].CHOICE_MAS_ULTRA);

                rsn.push(rsnzip[key].XTRA);
                xtra.push(rsnzip[key].XTRA);

                rsn.push(rsnzip[key].SPORTS_PACK);
                sports_pack.push(rsnzip[key].SPORTS_PACK);

                mlb.push(rsnzip[key].MLB);
                nba.push(rsnzip[key].NBA);
                nhl.push(rsnzip[key].NHL);
            };
        };
    });
    rsn = _.chain(rsn).compact().uniq().value();

    _.each(rsn, function(val, key) {
        rsn[key] = rsnAdjustment(val);
    });

    _.each(choice, function(val, key) {
        choice[key] = rsnAdjustment(val);
    });

    _.each(xtra, function(val, key) {
        xtra[key] = rsnAdjustment(val);
    });

    _.each(sports_pack, function(val, key) {
        sports_pack[key] = rsnAdjustment(val);
    });

    //add alternative channels
    var altCh = [];
    _.each(rsn, function(val,key){
        var altChTemp = [];
        altChTemp = alternateRSN(val);
        altCh = altCh.concat(altChTemp);
    });
    rsn = rsn.concat(altCh);

    user.state = state;
    user.rsn = rsn;
    user.requiredPackage = {
        "choice": _.compact(choice),
        "xtra": _.compact(xtra),
        "sports_pack": _.compact(sports_pack)
    };
    user.sports = {
        "mlb": _.chain(mlb).compact().uniq().value(),
        "nba": _.chain(nba).compact().uniq().value(),
        "nhl": _.chain(nhl).compact().uniq().value()
    };
    return user;
};

//Ajust RSN name to match dsse data
function rsnAdjustment(rsn) {
    if (rsn && rsn.length) {
        rsn = rsn.replace("FS", "FSN");
        rsn = rsn.replace("MASN", "Mid Atlantic Sports Network");
        rsn = rsn.replace("Mid-Atlantic", "Mid Atlantic");
        rsn = rsn.replace("Alternate", "Alt");
        rsn = rsn.replace("Arizona Alternate", "Arizona Alt.");
        rsn = rsn.replace("Tennessee Alternative", "Tennessee Alt.");
        rsn = rsn.replace("Altitude", "Altitude TV");
        rsn = rsn.replace("MSG  ", "MSG");
        rsn = rsn.replace('Prime Ticket', 'FSN Prime Ticket');
        return rsn;
    } else {
        return;
    };
};
//add alternate channel to list if match
var alternateRSN = function(mainRSN) {
    var altCh = [];

    switch (mainRSN) {
        case "Altitude TV":
            altCh = ["Altitude TV Alternate"];
            return altCh;
            break;

        case "CSN Bay Area":
            altCh = ["CSN Bay Area Plus"];
            return altCh;
            break;

        case "CSN California":
            altCh = ["CSN California Alternate"];
            return altCh;
            break;

        case "CSN Chicago":
            altCh = ["CSN Chicago Alternate", "CSN Chicago Plus"];
            return altCh;
            break;

        case "CSN Mid Atlantic":
            altCh = ["CSN Mid Atlantic Alternate"];
            return altCh;
            break;

        case "CSN New England":
            altCh = ["CSN New England Alternate"];
            return altCh;
            break;

        case "FSN Arizona":
            altCh = ["FSN Arizona Alt."];
            return altCh;
            break;

        case "FSN Cincinnati":
            altCh = ["FSN Cincinnati Alternate"];
            return altCh;
            break;

        case "FSN Detroit":
            altCh = ["FSN Detroit Plus"];
            return altCh;
            break;

        case "FSN Florida":
            altCh = ["FSN Florida Plus", "FSN Florida Alternate"];
            return altCh;
            break;

        case "FSN Midwest":
            altCh = ["FSN Midwest Plus", "FSN Midwest Alternate", "FSN Midwest Alternate 2", "FSN Indiana", "FSN Kansas City"];
            return altCh;
            break;

        case "FSN North":
            altCh = ["FSN Wisconsin", "FSN Wisconsin Alternate", "FSN North Alternate", "FSN North Alt"];
            return altCh;
            break;

        case "FSN Ohio":
            altCh = ["FSN Ohio Alternate"];
            return altCh;
            break;

        case "FSN San Diego":
            altCh = ["FSN San Diego Alternate"];
            return altCh;
            break;

        case "FSN South":
            altCh = ["FSN Carolinas", "FSN Tennessee", "FSN Tennessee Alternative", "FSN Tennessee Alt.", "FSN South Plus", "FSN South Plus 2"];
            return altCh;
            break;

        case "FSN Southwest":
            altCh = ["FSN Southwest Plus", "FSN Southwest Alternate", "FSN Southwest Alternate 2", "FSN New Orleans", "FSN Oklahoma"];
            return altCh;
            break;

        case "MSG":
            altCh = ["MSG Alternate", "MSG Alternate 2", "MSG Plus"];
            return altCh;
            break;

        case "Mid Atlantic Sports Network":
            altCh = ["Mid Atlantic Sports Network 2", "Mid Atlantic Sports Network Alt"];
            return altCh;
            break;

        case "New England Sports Network":
            altCh = ["New England Sports Network Alternative"];
            return altCh;
            break;

        case "Prime Ticket":
            altCh = ["Prime Ticket Alternate"];
            return altCh;
            break;

        case "ROOT Sports Northwest":
            altCh = ["ROOT Sports Northwest Plus", "ROOT Sports Pittsburgh Alternate", "ROOT Sports Pittsburgh Alternate 2"];
            return altCh;
            break;

        case "ROOT Sports Rocky Mountain":
            altCh = ["ROOT Sports Rocky Mountain Plus"];
            return altCh;
            break;

        case "SportSouth":
            altCh = ["SportSouth Alternate", "SportSouth Alt", "SportSouth Alt 2", "SportSouth Alt 3", "SportSouth 3"];
            return altCh;
            break;

        case "Sun Sports":
            altCh = ["Sun Sports Plus"];
            return altCh;
            break;

        case "YES Network":
            altCh = ["YES Network Alternate"];
            return altCh;
            break;

        default:
            return 0;
    };
};

// DSSE
var dsse_lookup = function(userRSN) {

    var user_events = [];
    var out_of_market = [];
    var league_network = [];
    var college_football_rsn = [];
    var college_football_rsn_spotbeam = [];

    // safa added start
    var college_basketball = [];
    var college_basketball_spotbeam = [];
    // safa added end

    var college_football_gp = [];
    var differece = [];
    var remove_index = [];
    var remove_index_college_football = [];

    // safa added start
    var remove_index_college_basketball = [];
    // safa added end

    var remove_index_college_spotbeam = [];
    var dateBegin = {};
    var dateEnd = {}
    var away_team = "";
    var home_team = "";
    // get game that is available to user's rsn

    dateBegin = _.first(dsse);
    dateEnd = _.last(dsse);

    _.each(dsse, function(val, key){
        away_team = val.Away.split(" of");
        home_team = val.Home.split(" of");
        dsse[key].Away = away_team[0];
        dsse[key].Home = home_team[0];
    });

    _.each(dsse, function(val, key) {
        if ((_.indexOf(userRSN, val.Broadcaster) > -1) &&
            (val.League.indexOf("IN WORK") === -1) && //ignore IN WORK channel
            (val.League.indexOf("HD") === -1) && //ignore HD channel
            (val.League.indexOf("QMJHL") === -1) &&
            (val.League.indexOf("HSFB") === -1) &&
            (val.Broadcaster.indexOf(" CONUS HD") === -1) &&
            (val.League.indexOf("-DELETED") === -1) ||
            (
                ((val.Broadcaster === "NBA TV") && (val.League === "NBA")) ||
                (val.Broadcaster === "NBC Sports") ||
                ((val.Broadcaster === "NFL Network") && (val.League === "NFL")) ||
                ((val.Broadcaster === "NHL Network") && (val.League === "NHL")) ||
                ((val.Broadcaster === "MLB Network") && (val.League === "MLB"))

            )
        ) {
            user_events.push(dsse[key]);
        };
    });

    _.each(dsse, function(val, key) {
        if(
            (_.indexOf(userRSN, val.Broadcaster) > -1) &&

            (val.League === "CFB" || val.League === "CFB -IN WORK")
            ){
            user_events.push(dsse[key]);
        };
    });

    // safa added start
    _.each(dsse, function(val, key) {
        if(
            (_.indexOf(userRSN, val.Broadcaster) > -1) &&
            (val.League === "CBKHD" || val.League === "CBKHD -IN WORK")
            ){
            user_events.push(dsse[key]);
        };
    });
    // safa added end

   
    _.each(dsse, function(val, key) {
        if (
            ((val.Broadcaster === "NBA TV") && (val.League === "NBA")) ||
            ((val.Broadcaster === "NBA TV") && (val.League === "WNBA")) ||
            ((val.Broadcaster === "NFL Network") && (val.League === "NFL")) ||
            ((val.Broadcaster === "NHL Network") && (val.League === "NHL")) ||
            ((val.Broadcaster === "MLB Network") && (val.League === "MLB"))
           ) {
           league_network.push(dsse[key]);
        };
    });

    // College Football RSN listing only
    _.each(dsse, function(val, key) {
        if (
            (val.Broadcaster.indexOf(" CONUS HD") === -1) &&
            (val.Broadcaster.indexOf("HD") === -1) &&
            (val.Broadcaster.indexOf("SEC") === -1) &&
            (val.Broadcaster.indexOf("Big 10") === -1) &&
            (val.Broadcaster.indexOf("NBC Sports") === -1) &&
            ((val.League === "CFB") || (val.League === "CFB -IN WORK"))
            ) {
            college_football_rsn.push(dsse[key]);
        };
    });

    // safa added start
    // College Basketball listing only
    _.each(dsse, function(val, key) {
        if (
            (val.Broadcaster.indexOf(" CONUS HD") === -1) &&
            (val.Broadcaster.indexOf("HD") === -1) &&
            (val.Broadcaster.indexOf("SEC") === -1) &&
            (val.Broadcaster.indexOf("Big 10") === -1) &&
            (val.Broadcaster.indexOf("NBC Sports") === -1) &&
            (val.League === "CBKHD" || val.League === "CBKHD -IN WORK")
            ) {
            college_basketball.push(dsse[key]);
        };
    });
    // safa added end

    // Get all college football game with spotbeam to create an exclusion list
    _.each(college_football_rsn, function(val, key){
        if(val.Spotbeam.indexOf(" SPOT") > -1){
            college_football_rsn_spotbeam.push(college_football_rsn[key]);
        };
    });

    // safa added start
    // Get all college basketball game with spotbeam to create an exclusion list
    _.each(college_basketball, function(val, key){
        if(val.Spotbeam.indexOf(" SPOT") > -1){
            college_basketball_spotbeam.push(college_basketball[key]);
        };
    });
    // safa added end

    _.each(college_football_rsn_spotbeam, function(val, key){
        var cfb_date_time_teams1 = val.Event_Date + val.Event_Time + val.Away +val.Home;
        _.each(college_football_rsn, function(val, key){
            var cfb_date_time_teams2 = val.Event_Date + val.Event_Time + val.Away +val.Home;
            if(cfb_date_time_teams1 === cfb_date_time_teams2){
                remove_index_college_spotbeam.push(college_football_rsn[key]);
            }
        });
    });
    college_football_rsn = _.difference(college_football_rsn, remove_index_college_spotbeam);

    // safa added start
    _.each(college_basketball_spotbeam, function(val, key){
        var cbk_date_time_teams1 = val.Event_Date + val.Event_Time + val.Away +val.Home;
        _.each(college_basketball, function(val, key){
            var cbk_date_time_teams2 = val.Event_Date + val.Event_Time + val.Away +val.Home;
            if(cbk_date_time_teams1 === cbk_date_time_teams2){
                remove_index_college_spotbeam.push(college_basketball[key]);
            }
        });
    });
    college_basketball = _.difference(college_basketball, remove_index_college_spotbeam);
    // safa added end

    // College Football GP listing only
    _.each(dsse, function(val, key) {
        if (val.League === "CFBGP" || val.League === "CFBGP -IN WORK") {
            college_football_gp.push(dsse[key]);
        };
    });

    // safa added start
    // College Basketball listing only
    _.each(dsse, function(val, key) {
        if (val.League === "CBKHD" || val.League === "CBKHD -IN WORK") {
            college_basketball.push(dsse[key]);
        };
    });
    // safa added end

    difference = _.difference(dsse, user_events);
    difference = _.difference(dsse, league_network);

    _.each(difference, function(val, key) {
        if ((val.League.indexOf("-IN WORK") === -1) && //ignore IN WORK channel
            (val.League.indexOf("HD") === -1) &&
            (val.League.indexOf("QMJHL") === -1) &&
            (val.Broadcaster.indexOf("HD") === -1) && //ignore HD channel
            (val.League.indexOf("-DELETED") === -1) &&
            (val.Broadcaster.indexOf("CONUS HD") === -1) &&
            (val.Replay === "")
        ) {
            out_of_market.push(difference[key]);
        };
    });

    // prioritize event from rsn and remove it from out of market list
    _.each(user_events, function(val,key){
        var date_time_teams1 = val.Event_Date + val.Event_Time + val.Away +val.Home;
        _.each(out_of_market, function(val, key){
            var date_time_teams2 = val.Event_Date + val.Event_Time + val.Away +val.Home;
            if(date_time_teams1 === date_time_teams2){
                remove_index.push(out_of_market[key]);
            }
        });

        _.each(league_network, function(val, key){
            var date_time_teams2 = val.Event_Date + val.Event_Time + val.Away +val.Home;
            if(date_time_teams1 === date_time_teams2){
                remove_index.push(league_network[key]);
            }
        });

        _.each(college_football_rsn, function(val, key){
            var date_time_teams2 = val.Event_Date + val.Event_Time + val.Away +val.Home;
            if(date_time_teams1 === date_time_teams2){
                remove_index_college_football.push(college_football_rsn[key]);
            }
        });

    // safa added start
        _.each(college_basketball, function(val, key){
            var date_time_teams2 = val.Event_Date + val.Event_Time + val.Away +val.Home;
            if(date_time_teams1 === date_time_teams2){
                remove_index_college_basketball.push(college_basketball[key]);
            }
        });
    // safa added end
    });

    _.each(out_of_market, function(val, key) {
        if ((val.Channel.substring(0, 3) > 500) && (val.Replay === "") && (val.Sport_Channel === "")) {
            remove_index.push(out_of_market[key]);
        };
    });
    out_of_market = _.difference(out_of_market, remove_index);

    //college_football_rsn = _.difference(college_football_rsn, remove_index_college_spotbeam);
    college_football_rsn = _.difference(college_football_rsn, remove_index_college_football);

    // safa added start
    college_basketball = _.difference(college_basketball, remove_index_college_basketball);
    // safa added end

    //available_date = _.uniq(available_date);

    user.user_events = user_events;
    user.out_of_market = out_of_market;
    user.league_network = league_network;
    user.college_football_rsn = college_football_rsn;
    user.college_football_gp = college_football_gp;
    // safa added start
    user.college_basketball = college_basketball;
    // safa added end
    user.start_date =  moment(dateBegin.Event_Date, "MM-DD-YYYY").format("MMM D");
    user.end_date = moment(dateEnd.Event_Date, "MM-DD-YYYY").format("MMM D");
    //user.available_date = available_date;
};

function process_output(gameData, type) {
    var output = "";
    if (type === "rsn") {
        _.each(gameData, function(val, key) {
            var blackout = "";
            var awayHome = val.Away + val.Home;

            blackout = blackoutChecker(user.zipcode, val.League, awayHome);
            if(awayHome.indexOf(blackout) > -1 ){
                output += "<tr class='blackout'" + replayClassCheck(val.Replay) + "><td>" + moment(val.Event_Date, "MM-DD-YYY").format("MMM Do") + " - " + moment(val.Event_Time, "HH:mm").format("h:mmA") + "</td><td>" + sport(val.League) + "</td><td>" + val.Away + " @ " + val.Home + " <span class='label label-danger'>BLACKOUT</span></td><td>Check if the game is on a local or national channel. If not, apologize to customers for any inconvenience. Do not sell <strong>" + Sport_packages_convertion(val.League) + "</strong> to get access to this game.</td></tr>";
            } else {
                // safa added for MSG and Pro hockey alert
                if(sport(val.League) === "Pro Hockey" && val.Broadcaster === "MSG" || val.Broadcaster === "MSG Plus" || val.Broadcaster === "MSG Alternate" || val.Broadcaster === "MSG Alternate 2"){
                    output += "<tr" + replayClassCheck(val.Replay) + "><td>" + moment(val.Event_Date, "MM-DD-YYY").format("MMM Do") + " - " + moment(val.Event_Time, "HH:mm").format("h:mmA") + "</td><td>" + sport(val.League) + "</td><td>" + val.Away + " @ " + val.Home + replayCheck(val.Replay) + "</td><td><strong>Ch " + channelCheck(val.Channel) + "</strong> - " + val.Broadcaster + "<span class='msg_pro_hockey'><img src='http://agentanswercenter.directv.com/en-us/res/system/img/warning-icon.png' /></span><br />" + minimumRequirement(val.Broadcaster) + "</td></tr>";
                }
                else
                // end of MSG Pro hockey alert
                    output += "<tr" + replayClassCheck(val.Replay) + "><td>" + moment(val.Event_Date, "MM-DD-YYY").format("MMM Do") + " - " + moment(val.Event_Time, "HH:mm").format("h:mmA") + "</td><td>" + sport(val.League) + "</td><td>" + val.Away + " @ " + val.Home + replayCheck(val.Replay) + "</td><td><strong>Ch " + channelCheck(val.Channel) + "</strong> - " + val.Broadcaster + "<br />" + minimumRequirement(val.Broadcaster) + "</td></tr>";
            }
        });
    } else if (type === "Sport_Packages") {
        _.each(gameData, function(val, key) {
            var blackout = "";
            var awayHome = val.Away + val.Home;
            blackout = blackoutChecker(user.zipcode, val.League, awayHome);
            if(awayHome.indexOf(blackout) > -1 ){
                output += "<tr class='blackout'" + replayClassCheck(val.Replay) + "><td>" + moment(val.Event_Date, "MM-DD-YYY").format("MMM Do") + " - " + moment(val.Event_Time, "HH:mm").format("h:mmA") + "</td><td>" + sport(val.League) + "</td><td>" + val.Away + " @ " + val.Home + " <span class='label label-danger'>BLACKOUT</span></td><td>Check if the game is on a local or national channel. If not, apologize to customers for any inconvenience. Do not sell <strong>" + Sport_packages_convertion(val.League) + "</strong> to get access to this game.</td></tr>";
            } else if (sport(val.League) === "Pro Football"){
                output += "<tr" + replayClassCheck(val.Replay) + "><td>" + moment(val.Event_Date, "MM-DD-YYY").format("MMM Do") + " - " + moment(val.Event_Time, "HH:mm").format("h:mmA") + "</td><td>" + sport(val.League) + "</td><td>" + val.Away + " @ " + val.Home + replayCheck(val.Replay) + "</td><td><strong>Ch " + channelCheck(val.Sport_Channel) + "</strong> - " + Sport_packages_convertion(val.League) +"</td></tr>";
            } else if (sport(val.League) === "College Football"){
                output += "<tr" + replayClassCheck(val.Replay) + "><td>" + moment(val.Event_Date, "MM-DD-YYY").format("MMM Do") + " - " + moment(val.Event_Time, "HH:mm").format("h:mmA") + "</td><td>" + sport(val.League) + "</td><td>" + val.Away + " @ " + val.Home + replayCheck(val.Replay) + "</td><td><strong>Ch " + channelCheck(val.Sport_Channel) + "</strong> - " + Sport_packages_convertion(val.League) +"</td></tr>";
        // safa added start
            } else if (sport(val.League) === "College Basketball"){
                output += "<tr" + replayClassCheck(val.Replay) + "><td>" + moment(val.Event_Date, "MM-DD-YYY").format("MMM Do") + " - " + moment(val.Event_Time, "HH:mm").format("h:mmA") + "</td><td>" + sport(val.League) + "</td><td>" + val.Away + " @ " + val.Home + replayCheck(val.Replay) + "</td><td><strong>Ch " + channelCheck(val.Sport_Channel) + "</strong> - " + Sport_packages_convertion(val.League) +"</td></tr>";
        //safa added end
            } else {
                output += "<tr" + replayClassCheck(val.Replay) + "><td>" + moment(val.Event_Date, "MM-DD-YYY").format("MMM Do") + " - " + moment(val.Event_Time, "HH:mm").format("h:mmA") + "</td><td>" + sport(val.League) + "</td><td>" + val.Away + " @ " + val.Home + replayCheck(val.Replay) + "</td><td><strong>Ch " + channelCheck(val.Sport_Channel) + "</strong> - " + Sport_packages_convertion(val.League) + " <span class='local_national'><img src='http://agentanswercenter.directv.com/en-us/res/system/img/warning-icon.png' /></span><p class='alert alert-success feed' role='alert'><strong>Feed: </strong>" + val.Broadcaster + "</p></td></tr>";
            }
        });
    // safa edit starts here
    // line below commented out by safa and edited version has been place on the next line
    //} else if (type === "CFB_SportsPack") {
    } else if (type === "CFB_SportsPack" || type === "CBKHD_SportsPack") {
    // safa edit ends here
       _.each(gameData, function(val, key) {
            var blackout = "";
            var awayHome = val.Away + val.Home;
            output += "<tr" + replayClassCheck(val.Replay) + "><td>" + moment(val.Event_Date, "MM-DD-YYY").format("MMM Do") + " - " + moment(val.Event_Time, "HH:mm").format("h:mmA") + "</td><td>" + sport(val.League) + "</td><td>" + val.Away + " @ " + val.Home + replayCheck(val.Replay) + "</td><td><strong>Ch " + channelCheck(val.Channel) + "</strong> - " + val.Broadcaster + "<br />" + minimumRequirement(val.League) + "</td></tr>";
        });
    };
    return output;
};

function blackoutChecker(zipcode, league, awayHome) {
    var blackout = "Not Blackout";
    switch (league) {
        case "MLB":
            //Arizona Diamondbacks
            if (
                ((zipcode >= 87000) && (zipcode <= 88499)) &&
                (awayHome.indexOf("Diamondbacks") > -1)
            ) {
                blackout = "Diamondbacks";
            };

            //Colorado Rockies
            if (
                ((zipcode >= 87800) && (zipcode <= 87900)) ||
                ((zipcode >= 87902) && (zipcode <= 87935)) ||
                ((zipcode >= 87938) && (zipcode <= 87939)) ||
                ((zipcode >= 87942) && (zipcode <= 88000)) ||
                ((zipcode >= 88009) && (zipcode <= 88010)) ||
                ((zipcode >= 88014) && (zipcode <= 88020)) ||
                ((zipcode >= 88022) && (zipcode <= 88023)) ||
                ((zipcode >= 88025) && (zipcode <= 88026)) ||
                ((zipcode >= 88028) && (zipcode <= 88031)) ||
                ((zipcode >= 88034) && (zipcode <= 88043)) ||
                (zipcode === 88045) ||
                ((zipcode >= 88049) && (zipcode <= 88051)) ||
                (zipcode === 88053) ||
                ((zipcode >= 88055) && (zipcode <= 88056)) ||
                ((zipcode >= 88059) && (zipcode <= 88062)) ||
                ((zipcode >= 88064) && (zipcode <= 88071)) ||
                ((zipcode >= 88073) && (zipcode <= 88080)) ||
                ((zipcode >= 88082) && (zipcode <= 88230)) ||
                ((zipcode >= 88232) && (zipcode <= 88251)) ||
                ((zipcode >= 88253) && (zipcode <= 88399)) &&
                (awayHome.indexOf("Rockies") > -1)
            ) {
                blackout = "Rockies";
            };

            // Pittsburgh Pirates
            if (
                (zipcode === 18343) ||
                (zipcode === 18351) ||
                ((zipcode >= 25400) && (zipcode <= 43008)) ||
                ((zipcode >= 43011) && (zipcode <= 43028)) ||
                ((zipcode >= 43030) && (zipcode <= 43043)) ||
                (zipcode === 43046) ||
                ((zipcode >= 43048) && (zipcode <= 43059)) ||
                ((zipcode >= 43061) && (zipcode <= 43069)) ||
                (zipcode === 43071) ||
                ((zipcode >= 43073) && (zipcode <= 43077)) ||
                ((zipcode >= 43079) && (zipcode <= 43082)) ||
                ((zipcode >= 43085) && (zipcode <= 43139)) ||
                ((zipcode >= 43141) && (zipcode <= 43152)) ||
                ((zipcode >= 43154) && (zipcode <= 43299)) &&
                (awayHome.indexOf("Pirates") > -1)
            ) {
                blackout = "Pirates";
            };

            //Texas Ranger Blackout
            if (
                ((zipcode >= 88400) && (zipcode <= 88499)) &&
                (awayHome.indexOf("Rangers") > -1)
            ) {
                blackout = "Rangers";
            };

            //Dodgers Blackout
            var dodgers = ["93205", "93206", "93215", "93216", "93220", "93222", "93224", "93225", "93226", "93238", "93240", "93241", "93243", "93249", "93250", "93251", "93252", "93255", "93263", "93268", "93276", "93280", "93283", "93285", "93287", "93301", "93302", "93303", "93304", "93305", "93306", "93307", "93308", "93309", "93311", "93312", "93314", "93380", "93383", "93384", "93385", "93386", "93387", "93388", "93389", "93390", "93501", "93502", "93504", "93505", "93516", "93518", "93519", "93523", "93524", "93527", "93528", "93531", "93554", "93555", "93556", "93558", "93560", "93561", "93581", "93596", "90001", "90002", "90003", "90004", "90005", "90006", "90007", "90008", "90009", "90010", "90011", "90012", "90013", "90014", "90015", "90016", "90017", "90018", "90019", "90020", "90021", "90022", "90023", "90024", "90025", "90026", "90027", "90028", "90029", "90030", "90031", "90032", "90033", "90034", "90035", "90036", "90037", "90038", "90039", "90040", "90041", "90042", "90043", "90044", "90045", "90046", "90047", "90048", "90049", "90050", "90051", "90052", "90053", "90054", "90055", "90056", "90057", "90058", "90059", "90060", "90061", "90062", "90063", "90064", "90065", "90066", "90067", "90068", "90069", "90070", "90071", "90072", "90073", "90074", "90075", "90076", "90077", "90078", "90079", "90080", "90081", "90082", "90083", "90084", "90086", "90087", "90088", "90089", "90090", "90091", "90093", "90094", "90095", "90096", "90099", "90101", "90103", "90189", "90201", "90202", "90209", "90210", "90211", "90212", "90213", "90220", "90221", "90222", "90223", "90224", "90230", "90231", "90232", "90233", "90239", "90240", "90241", "90242", "90245", "90247", "90248", "90249", "90250", "90251", "90254", "90255", "90260", "90261", "90262", "90263", "90264", "90265", "90266", "90267", "90270", "90272", "90274", "90275", "90277", "90278", "90280", "90290", "90291", "90292", "90293", "90294", "90295", "90296", "90301", "90302", "90303", "90304", "90305", "90306", "90307", "90308", "90309", "90310", "90311", "90312", "90401", "90402", "90403", "90404", "90405", "90406", "90407", "90408", "90409", "90410", "90411", "90501", "90502", "90503", "90504", "90505", "90506", "90507", "90508", "90509", "90510", "90601", "90602", "90603", "90604", "90605", "90606", "90607", "90608", "90609", "90610", "90637", "90638", "90639", "90640", "90650", "90651", "90652", "90660", "90661", "90662", "90670", "90671", "90701", "90702", "90703", "90704", "90706", "90707", "90710", "90711", "90712", "90713", "90714", "90715", "90716", "90717", "90723", "90731", "90732", "90733", "90734", "90744", "90745", "90746", "90747", "90748", "90749", "90755", "90801", "90802", "90803", "90804", "90805", "90806", "90807", "90808", "90809", "90810", "90813", "90814", "90815", "90822", "90831", "90832", "90833", "90834", "90835", "90840", "90842", "90844", "90846", "90847", "90848", "90853", "90895", "90899", "91001", "91003", "91006", "91007", "91008", "91009", "91010", "91011", "91012", "91016", "91017", "91020", "91021", "91023", "91024", "91025", "91030", "91031", "91040", "91041", "91042", "91043", "91046", "91066", "91077", "91101", "91102", "91103", "91104", "91105", "91106", "91107", "91108", "91109", "91110", "91114", "91115", "91116", "91117", "91118", "91121", "91123", "91124", "91125", "91126", "91129", "91182", "91184", "91185", "91188", "91189", "91199", "91201", "91202", "91203", "91204", "91205", "91206", "91207", "91208", "91209", "91210", "91214", "91221", "91222", "91224", "91225", "91226", "91301", "91302", "91303", "91304", "91305", "91306", "91307", "91308", "91309", "91310", "91311", "91313", "91316", "91321", "91322", "91324", "91325", "91326", "91327", "91328", "91329", "91330", "91331", "91333", "91334", "91335", "91337", "91340", "91341", "91342", "91343", "91344", "91345", "91346", "91350", "91351", "91352", "91353", "91354", "91355", "91356", "91357", "91364", "91365", "91367", "91371", "91372", "91376", "91380", "91381", "91382", "91383", "91384", "91385", "91386", "91387", "91390", "91392", "91393", "91394", "91395", "91396", "91401", "91402", "91403", "91404", "91405", "91406", "91407", "91408", "91409", "91410", "91411", "91412", "91413", "91416", "91423", "91426", "91436", "91470", "91482", "91495", "91496", "91499", "91501", "91502", "91503", "91504", "91505", "91506", "91507", "91508", "91510", "91521", "91522", "91523", "91526", "91601", "91602", "91603", "91604", "91605", "91606", "91607", "91608", "91609", "91610", "91611", "91612", "91614", "91615", "91616", "91617", "91618", "91702", "91706", "91711", "91714", "91715", "91716", "91722", "91723", "91724", "91731", "91732", "91733", "91734", "91735", "91740", "91741", "91744", "91745", "91746", "91747", "91748", "91749", "91750", "91754", "91755", "91756", "91765", "91766", "91767", "91768", "91769", "91770", "91771", "91772", "91773", "91775", "91776", "91778", "91780", "91788", "91789", "91790", "91791", "91792", "91793", "91795", "91801", "91802", "91803", "91804", "91896", "91899", "93510", "93532", "93534", "93535", "93536", "93539", "93543", "93544", "93550", "93551", "93552", "93553", "93563", "93584", "93586", "93590", "93591", "93599", "93512", "93517", "93529", "93541", "93546", "90620", "90621", "90622", "90623", "90624", "90630", "90631", "90632", "90633", "90680", "90720", "90721", "90740", "90742", "90743", "92602", "92603", "92604", "92605", "92606", "92607", "92609", "92610", "92612", "92614", "92615", "92616", "92617", "92618", "92619", "92620", "92623", "92624", "92625", "92626", "92627", "92628", "92629", "92630", "92637", "92646", "92647", "92648", "92649", "92650", "92651", "92652", "92653", "92654", "92655", "92656", "92657", "92658", "92659", "92660", "92661", "92662", "92663", "92672", "92673", "92674", "92675", "92676", "92677", "92678", "92679", "92683", "92684", "92685", "92688", "92690", "92691", "92692", "92693", "92694", "92697", "92698", "92701", "92702", "92703", "92704", "92705", "92706", "92707", "92708", "92711", "92712", "92725", "92728", "92735", "92780", "92781", "92782", "92799", "92801", "92802", "92803", "92804", "92805", "92806", "92807", "92808", "92809", "92811", "92812", "92814", "92815", "92816", "92817", "92821", "92822", "92823", "92825", "92831", "92832", "92833", "92834", "92835", "92836", "92837", "92838", "92840", "92841", "92842", "92843", "92844", "92845", "92846", "92850", "92856", "92857", "92859", "92861", "92862", "92863", "92864", "92865", "92866", "92867", "92868", "92869", "92870", "92871", "92886", "92887", "92899", "91752", "92201", "92202", "92203", "92210", "92211", "92220", "92223", "92225", "92226", "92230", "92234", "92235", "92236", "92239", "92240", "92241", "92247", "92248", "92253", "92254", "92255", "92258", "92260", "92261", "92262", "92263", "92264", "92270", "92274", "92276", "92282", "92320", "92501", "92502", "92503", "92504", "92505", "92506", "92507", "92508", "92509", "92513", "92514", "92515", "92516", "92517", "92518", "92519", "92521", "92522", "92530", "92531", "92532", "92536", "92539", "92543", "92544", "92545", "92546", "92548", "92549", "92551", "92552", "92553", "92554", "92555", "92556", "92557", "92561", "92562", "92563", "92564", "92567", "92570", "92571", "92572", "92581", "92582", "92583", "92584", "92585", "92586", "92587", "92589", "92590", "92591", "92592", "92593", "92595", "92596", "92599", "92860", "92877", "92878", "92879", "92880", "92881", "92882", "92883", "91701", "91708", "91709", "91710", "91729", "91730", "91737", "91739", "91743", "91758", "91759", "91761", "91762", "91763", "91764", "91784", "91785", "91786", "92242", "92252", "92256", "92267", "92268", "92277", "92278", "92280", "92284", "92285", "92286", "92301", "92304", "92305", "92307", "92308", "92309", "92310", "92311", "92312", "92313", "92314", "92315", "92316", "92317", "92318", "92321", "92322", "92323", "92324", "92325", "92326", "92327", "92329", "92331", "92332", "92333", "92334", "92335", "92336", "92337", "92338", "92339", "92340", "92341", "92342", "92344", "92345", "92346", "92347", "92350", "92352", "92354", "92356", "92357", "92358", "92359", "92363", "92364", "92365", "92366", "92368", "92369", "92371", "92372", "92373", "92374", "92375", "92376", "92377", "92378", "92382", "92385", "92386", "92391", "92392", "92393", "92394", "92395", "92397", "92398", "92399", "92401", "92402", "92403", "92404", "92405", "92406", "92407", "92408", "92410", "92411", "92412", "92413", "92414", "92415", "92418", "92423", "92424", "92427", "92885", "93562", "93592", "93401", "93402", "93403", "93405", "93406", "93407", "93408", "93409", "93410", "93412", "93420", "93421", "93422", "93423", "93424", "93428", "93430", "93432", "93433", "93435", "93442", "93443", "93444", "93445", "93446", "93447", "93448", "93449", "93451", "93452", "93453", "93461", "93465", "93475", "93483", "93013", "93014", "93067", "93101", "93102", "93103", "93105", "93106", "93107", "93108", "93109", "93110", "93111", "93116", "93117", "93118", "93120", "93121", "93130", "93140", "93150", "93160", "93190", "93199", "93254", "93427", "93429", "93434", "93436", "93437", "93438", "93440", "93441", "93454", "93455", "93456", "93457", "93458", "93460", "93463", "93464", "91319", "91320", "91358", "91359", "91360", "91361", "91362", "91377", "93001", "93002", "93003", "93004", "93005", "93006", "93007", "93009", "93010", "93011", "93012", "93015", "93016", "93020", "93021", "93022", "93023", "93024", "93030", "93031", "93032", "93033", "93034", "93035", "93036", "93040", "93041", "93042", "93043", "93044", "93060", "93061", "93062", "93063", "93064", "93065", "93066", "93094", "93099", "93210", "93234", "93242", "92222", "92244", "92266", "92273", "92275", "92328", "92384", "92389", "93513", "93514", "93515", "93522", "93526", "93530", "93542", "93545", "93549", "93202", "93204", "93212", "93230", "93232", "93239", "93245", "93246", "93266", "93426", "93450", "93201", "93207", "93208", "93218", "93219", "93221", "93223", "93227", "93235", "93237", "93244", "93247", "93256", "93257", "93258", "93260", "93261", "93262", "93265", "93267", "93270", "93271", "93272", "93274", "93275", "93277", "93278", "93279", "93282", "93286", "93290", "93291", "93292", "88901", "88905", "89002", "89004", "89005", "89006", "89007", "89009", "89011", "89012", "89014", "89015", "89016", "89018", "89019", "89021", "89024", "89025", "89026", "89027", "89028", "89029", "89030", "89031", "89032", "89033", "89034", "89036", "89037", "89039", "89040", "89044", "89046", "89052", "89053", "89054", "89067", "89070", "89074", "89077", "89081", "89084", "89085", "89086", "89087", "89101", "89102", "89103", "89104", "89105", "89106", "89107", "89108", "89109", "89110", "89111", "89112", "89113", "89114", "89115", "89116", "89117", "89118", "89119", "89120", "89121", "89122", "89123", "89124", "89125", "89126", "89127", "89128", "89129", "89130", "89131", "89132", "89133", "89134", "89135", "89136", "89137", "89138", "89139", "89140", "89141", "89142", "89143", "89144", "89145", "89146", "89147", "89148", "89149", "89150", "89151", "89152", "89153", "89154", "89155", "89156", "89157", "89158", "89159", "89160", "89161", "89162", "89163", "89164", "89165", "89166", "89169", "89170", "89173", "89177", "89178", "89179", "89180", "89183", "89185", "89191", "89193", "89195", "89199", "89010", "89013", "89047", "96704", "96710", "96718", "96719", "96720", "96721", "96725", "96726", "96727", "96728", "96737", "96738", "96739", "96740", "96743", "96745", "96749", "96750", "96755", "96760", "96764", "96771", "96772", "96773", "96774", "96776", "96777", "96778", "96780", "96781", "96783", "96785", "96701", "96706", "96707", "96709", "96712", "96717", "96730", "96731", "96734", "96744", "96759", "96762", "96782", "96786", "96789", "96791", "96792", "96795", "96797", "96801", "96802", "96803", "96804", "96805", "96806", "96807", "96808", "96809", "96810", "96811", "96812", "96813", "96814", "96815", "96816", "96817", "96818", "96819", "96820", "96821", "96822", "96823", "96824", "96825", "96826", "96828", "96830", "96836", "96837", "96838", "96839", "96840", "96841", "96843", "96844", "96846", "96847", "96848", "96849", "96850", "96853", "96854", "96857", "96858", "96859", "96860", "96861", "96863", "96898", "96703", "96705", "96714", "96715", "96716", "96722", "96741", "96746", "96747", "96751", "96752", "96754", "96756", "96765", "96766", "96769", "96796", "89001", "89008", "89017", "89042", "89043", "96708", "96713", "96729", "96732", "96733", "96742", "96748", "96753", "96757", "96761", "96763", "96767", "96768", "96770", "96779", "96784", "96788", "96790", "96793", "89003", "89020", "89022", "89023", "89041", "89045", "89048", "89049", "89060", "89061"];
           
        if (($.inArray(zipcode,dodgers)) && (awayHome.indexOf("Dodgers") > -1) && (awayHome.indexOf('Angels') == -1)) {
                blackout = "Dodgers";
            };
            break;
        case "NHL":
            if (
                ((zipcode >= 87000) && (zipcode <= 87799)) ||
                ((zipcode >= 88100) && (zipcode <= 88499)) &&
                (awayHome.indexOf("Coyotes") > -1)
            ) {
                blackout = "Coyotes";
            };
            if (
                ((zipcode >= 40000) && (zipcode <= 42199)) &&
                (awayHome.indexOf("Predators") > -1)
            ) {
                blackout = "Predators";

            };
            var wild = ["53101", "53102", "53104", "53109", "53128", "53140", "53141", "53142", "53143", "43144", "54352", "53158", "53159", "53168", "53170", "53171", "53179", "53181", "53192", "53194"];
            if (
                _.contains(wild, zipcode) &&
                (awayHome.indexOf("Wild") > -1)
            ) {
                blackout = "Wild";
            };
            break;
    };
    return blackout;
};

function replayCheck(replay) {
    if (replay === "Replay") {
        return " <span class='label label-warning'>Replay</span>";
    } else {
        return "";
    };
};

function replayClassCheck(replay) {
    if (replay === "Replay") {
        return " class='replay'";
    } else {
        return "";
    };
};

function channelCheck(Channel) {
    if(Channel === ""){
        return "N/A";
    } else {
        return Channel;
    };
};
//sports
function sport(league) {
    var sport = "";
    switch (league) {
        case "MLB":
        case "MLBSFHD":
        case "MLB -IN WORK":
       
            // "MLB -IN WORK" added to help out mlb network
            return "Major League Baseball";
            break;
        case "WNBA":
            return "Women's Basketball";
            break;
        case "MLS":
        case "MLSHD":
            return "Major League Soccer";
            break;
        case "EPL":
            return "English Soccer";
            break;
        case "CFB":
        case "CFB -IN WORK":
        case "CFB2":
        case "CFBPPV":
        case "CFBGP":
        case "CFBGP -IN WORK":
            return "College Football";
            break;
        case "NHL":
        case "NHLHD":
        case "NHL HD":
        case "NHLHD2":
        case "NHL HD2":
            return "Pro Hockey";
            break;
        case "NFL":
        case "NFLSFHD":
            return "Pro Football";
            break;
        case "NBA":
        case "NBAHD":
            return "Pro Basketball";
            break;
        case "CHKY":
            return "College Hockey";
            break;
        case "CT":
        case "CTPPT":
            return "Cricket";
            break;
        case "WCBK":
            return "Women's College Basketball";
            break;
        // safa added start
        case "CBK":
        case "CBKHD":
        case "CBKHD -IN WORK":
        // safa added end
            return "College Basketball";
            break;
        case "CVB":
            return "College Volleyball";
            break;
        case "MMM":
        case "MMMX":
            return "College Basketball";
            break;
        case "AFB":
            return "Arena Football";
            break;
        case "Setanta Sports Alt":
            return "Setanta Sports";
            break;
        case "LIGA":
            return "La Liga";
            break;
        case "NSCR":
        case "NSCRHD":
            return "NASCAR";
            break;
        case "CBB":
            return "College Baseball";
        case "CSB":
            return "College Softball";
        default:
            return "not found: " + league;
    };
};

function Sport_packages_convertion(sport) {
    var strPkgName = sport;
    switch (sport) {
        case "MLBSFHD":
        case "MLB":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/programming/mlb_extra_innings.html' target='_blank'>MLB Extra Innings</a>";
            break;
        case "MLS":
        case "MLSHD":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/programming/mls_direct_kick.html' target='_blank'>MLS Direct Kick</a>";
            break;
        case "EPL":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/programming/directv_soccer.html?fragid=7' target='_blank'>DIRECTV Soccer</a>";
            break;
        case "CFBGP":
        case "CFBGP -IN WORK":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/programming/sports_pack.html' target='_blank'>Sports Pack</a>";
            break;
        //safa added start
        case "CBKHD":
        case "CBKHD -IN WORK":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/programming/sports_pack.html' target='_blank'>Sports Pack</a>";
            break;
        // safa added end
        case "NHL":
        case "NHLHD":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/programming/nhl_center_ice.html' target='_blank'>NHL Center Ice</a>";
            break;
        case "NFL":
        case "NFLSFHD":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/sales_center/nflst_index.html' target='_blank'>NFL Sunday Ticket</a>";
            break;
        case "NBA":
        case "NBAHD":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/programming/nba_league_pass.html' target='_blank'>NBA League Pass</a>";
            break;
        case "RGBY":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/programming/directv_rugby.html' target='_blank'>DIRECTV Rugby</a>";
            break;
        case "CFBPPV":
            strPkgName = "<a href='http://agentanswercenter.directv.com/en-us/res/programming/ppv_college_football.html' target='_blank'>PPV College Football</a>";
            break;
        default:
            return sport;
    }
    return strPkgName;

};

function minimumRequirement(rsn) {
    var min = "";
    _.each(user.requiredPackage.choice, function(val, key) {
        if (rsn.indexOf(val) > -1) {
            min = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/choice.html' target='_blank'>Choice</a> / <a href='http://agentanswercenter.directv.com/en-us/res/programming/mas_ultra.html' target='_blank'>Mas Ultra</a></p>";
        };
    });

    _.each(user.requiredPackage.xtra, function(val, key) {
        if (rsn.indexOf(val) > -1) {
            min = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/choice_xtra_new.html' target='_blank'>Xtra</a></p>";
        };
    });

    _.each(user.requiredPackage.sports_pack, function(val, key) {
        if (rsn.indexOf(val) > -1) {
            min = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong></strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/choice.html' target='_blank'>Choice</a> / <a href='http://agentanswercenter.directv.com/en-us/res/programming/mas_ultra.html' target='_blank'>Mas Ultra</a> with <a href='http://agentanswercenter.directv.com/en-us/res/programming/sports_pack.html' target='_blank'>Sports Pack</a></p>";
        };
    });

    switch (rsn){
        case "MLB Network":
            min = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/choice.html' target='_blank'>Choice</a> / <a href='http://agentanswercenter.directv.com/en-us/res/programming/mas_ultra.html' target='_blank'>Mas Ultra</a></p>";
            break;

        case "NBA TV":
            min = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/choice_xtra_new.html' target='_blank'>Xtra</a> / <a href='http://agentanswercenter.directv.com/en-us/res/programming/lo_maximo.html' target='_blank'>Lo Maximo</a></p>";
            break;
        case "NHL Network":
            min = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/choice_xtra_new.html' target='_blank'>Xtra</a></p>";
            break;
        case "NFL Network":
            min = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/choice.html' target='_blank'>Choice</a> / <a href='http://agentanswercenter.directv.com/en-us/res/programming/mas_ultra.html' target='_blank'>Mas Ultra</a></p>";
            break;
        case "NBC Sports":
            min = "<p class='alert alert-info feed'><strong>Minimum Required Package: </strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/choice.html' target='_blank'>Choice</a> / <a href='http://agentanswercenter.directv.com/en-us/res/programming/lo_maximo.html' target='_blank'>Lo Maximo</a></p>";
            break;
        case "CFB":
        case "CFB -IN WORK":
            min = "<p class='alert alert-info feed'><strong>Required: </strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/sports_pack.html' target='_blank'>Sports Pack</a></p>";
            break;
        // safa added start
        case "CBKHD":
        case "CBKHD -IN WORK":
            min = "<p class='alert alert-info feed'><strong>Required: </strong><a href='http://agentanswercenter.directv.com/en-us/res/programming/sports_pack.html' target='_blank'>Sports Pack</a></p>";
            break;
        // safa added end
    };
    return min;
};
//Check and validate zipcode
function checkZip(value) {
    return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
};

//reset function
function resetState(){
    user = {};
    $('.games_table, .filter, .daterange').empty();
    return;
};

var start = function(user_zipcode){

        user = {};
        $('.games_table, .filter, .daterange').empty();

        user.zipcode = user_zipcode;

        $("body").bind('DataProcessing.Start', function(ev){
            $(".processing").show();
        });

        $("body").bind('DataProcessing.End', function(ev){
            $(".gameav_block").css("display","block");
            $(".processing").hide();
        });
        $("body").trigger('DataProcessing.Start');
        setTimeout(function() {
            try
            {
                user = rsn_lookup(user.zipcode);

                dsse_lookup(user.rsn);
                $(".daterange").append("Schedule shown for: "+user.start_date+" - "+user.end_date);
                $('.games_table').html('<table cellpadding="0" cellspacing="0" border="0" class="stripe compact row-border cell-border hover" id="games_list"><thead><th>Date/Time (ET)</th><th>Sport</th><th>Away Team @ Home Team</th><th>Availability</th></thead></table>');
                $("#games_list").append(process_output(user.user_events, "rsn"));
                $("#games_list").append(process_output(user.league_network, "rsn"));
                $("#games_list").append(process_output(user.out_of_market, "Sport_Packages"));
                $("#games_list").append(process_output(user.college_football_rsn, "CFB_SportsPack"));
                $("#games_list").append(process_output(user.college_basketball, "Sport_Packages"));                
                $("#games_list").append(process_output(user.college_football_gp, "Sport_Packages"));

                var seen = {};
                $('#games_list tr').each(function() {
                    var txt = $(this).text();
                    if (seen[txt])
                        $(this).remove();
                    else
                        seen[txt] = true;
                });
                var sport = [];
                $('#games_list tbody tr td:nth-child(2)').each(function() {
                    //add item to array
                    sport.push($(this).text());
                });

                sport = _.chain(sport).uniq().sortBy().value();

                var sport_type = ""
                sport_type = "<option value=''>All</option>";
                _.each(sport, function(sport) {
                    sport_type += "<option value='" + sport + "'>" + sport + "</option>";
                });
                var sport_filter = "";
                sport_filter = "<label><p class='pull-left'>Filter by Sport</p><select class='sport_filter form-control pull-left' style='border-radius:0'> " + sport_type + "</select></label><br>";
                var global_search = "<label><p class='pull-left'>Search Within Results</p><input type='text' class='form-control  pull-left global_filter' style='border-radius:0'></label>";

                //initiallizing datatable
                $.fn.dataTable.moment('MMM Do - h:mmA');
                var table = $('#games_list').DataTable({
                    lengthMenu: [[-1], ["All"]],
                    paging: false,
                    searchHighlight: true,
                    scrollCollapse: true,
                    search: { "smart": false, "regex": true },
                    scrollY: 400,
                    order: [[0, "asc"]],
                    columns: [
                        { "width": "115px" },
                        { "width": "130px" },
                        null,
                        { "width": "280px" }
                    ],
                    "sScrollY":  ( 0.6 * $(window).height() ),
                    "bPaginate": false,
                    "bJQueryUI": true,
                    "bScrollCollapse": true,
                    "bAutoWidth": true,
                    "sScrollX": "100%",
                    "sScrollXInner": "100%"
                });

                $('.filter').append(sport_filter);
                $('.filter').append(global_search);
                //$('.daterange').append(datepicker_filter);
                $('.sport_filter').change(function() {
                    $('#games_list').DataTable().column(1).search($('.sport_filter option:selected').val()).draw();
                });
                $('input.global_filter').on('keyup click', function() {
                    $('#games_list').DataTable().search($('.global_filter').val()).draw();
                });
                var disclaimer = "Before offering out-of-market sports package, check <a href='http://lil-lookup.directv.com:8080/lil/lilIndex.htm?site=res&requestor=DORIS' target='_blank'>local</a> or <a href='http://agentanswercenterstg.directv.com/en-us/res/programming/national_sports_channels.html' target='_blank'>national</a> channels for game availability.";
                $('.local_national').each(function () {
                    var $elem = $(this);
                    $elem.popover({
                        placement: 'auto',
                        trigger: 'hover',
                        html: true,
                        container: $elem,
                        content: disclaimer,
                        delay: {
                           show: "100",
                           hide: "300"
                        },
                    });
                });
                // Safa added MSG MSG plus Pro hockey disclaimer
                var msg_pro_hockey_disclaimer = "Due to NHL restrictions, MSG and MSG Plus are obligated to limit the availability of some NHL games. See <a href='http://agentanswercenter.directv.com/en-us/res/programming/msg.html' target='_blank' style='text-decoration:underline'>MSG</a> or <a href='http://agentanswercenter.directv.com/en-us/res/programming/msg_plus.html' target='_blank' style='text-decoration:underline'>MSG Plus</a> for more details.";
                $('.msg_pro_hockey').each(function () {
                    var $elem = $(this);
                    $elem.popover({
                        placement: 'auto',
                        trigger: 'hover',
                        html: true,
                        container: $elem,
                        content: msg_pro_hockey_disclaimer,
                        delay: {
                           show: "100",
                           hide: "300"
                        },
                    });
                });
                // Safa added script ends
            }
            finally
            {
                $("body").trigger('DataProcessing.End');
            };
        },50);
    };


//date sorting plugin
(function($) {
    $.fn.dataTable.moment = function(format, locale) {
        var types = $.fn.dataTable.ext.type;

        // Add type detection
        types.detect.unshift(function(d) {
            // Null and empty values are acceptable
            if (d === '' || d === null) {
                return 'moment-' + format;
            }

            return moment(d.replace ? d.replace(/<.*?>/g, '') : d, format, locale, true).isValid() ?
                'moment-' + format :
                null;
        });

        // Add sorting method - use an integer for the sorting
        types.order['moment-' + format + '-pre'] = function(d) {
            return d === '' || d === null ?
                -Infinity :
                parseInt(moment(d.replace ? d.replace(/<.*?>/g, '') : d, format, locale, true).format('x'), 10);
        };
    };

}(jQuery));

// Tooltip
+function(e){var d=function(b,a){this.inState=this.$element=this.hoverState=this.timeout=this.enabled=this.options=this.type=null;this.init("tooltip",b,a)};d.VERSION="3.3.5";d.TRANSITION_DURATION=150;d.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}};d.prototype.init=function(b,a,c){this.enabled=!0;this.type=b;this.$element=e(a);this.options=this.getOptions(c);this.$viewport=this.options.viewport&&e(e.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport);this.inState={click:!1,hover:!1,focus:!1};if(this.$element[0]instanceof document.constructor&&!this.options.selector)throw Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");b=this.options.trigger.split(" ");for(a=b.length;a--;)if(c=b[a],"click"==c)this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this));else if("manual"!=c){var f="hover"==c?"mouseleave":"focusout";this.$element.on(("hover"==c?"mouseenter":"focusin")+"."+this.type,this.options.selector,e.proxy(this.enter,this));this.$element.on(f+"."+this.type,this.options.selector,e.proxy(this.leave,this))}this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()};d.prototype.getDefaults=function(){return d.DEFAULTS};d.prototype.getOptions=function(b){b=e.extend({},this.getDefaults(),this.$element.data(),b);b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay});return b};d.prototype.getDelegateOptions=function(){var b={},a=this.getDefaults();this._options&&e.each(this._options,function(c,f){a[c]!=f&&(b[c]=f)});return b};d.prototype.enter=function(b){var a=b instanceof this.constructor?b:e(b.currentTarget).data("bs."+this.type);a||(a=new this.constructor(b.currentTarget,this.getDelegateOptions()),e(b.currentTarget).data("bs."+this.type,a));b instanceof e.Event&&(a.inState["focusin"==b.type?"focus":"hover"]=!0);if(a.tip().hasClass("in")||"in"==a.hoverState)a.hoverState="in";else{clearTimeout(a.timeout);a.hoverState="in";if(!a.options.delay||!a.options.delay.show)return a.show();a.timeout=setTimeout(function(){"in"==a.hoverState&&a.show()},a.options.delay.show)}};d.prototype.isInStateTrue=function(){for(var b in this.inState)if(this.inState[b])return!0;return!1};d.prototype.leave=function(b){var a=b instanceof this.constructor?b:e(b.currentTarget).data("bs."+this.type);a||(a=new this.constructor(b.currentTarget,this.getDelegateOptions()),e(b.currentTarget).data("bs."+this.type,a));b instanceof e.Event&&(a.inState["focusout"==b.type?"focus":"hover"]=!1);if(!a.isInStateTrue()){clearTimeout(a.timeout);a.hoverState="out";if(!a.options.delay||!a.options.delay.hide)return a.hide();a.timeout=setTimeout(function(){"out"==a.hoverState&&a.hide()},a.options.delay.hide)}};d.prototype.show=function(){var b=e.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var a=e.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(!b.isDefaultPrevented()&&a){var c=this,b=this.tip(),a=this.getUID(this.type);this.setContent();b.attr("id",a);this.$element.attr("aria-describedby",a);this.options.animation&&b.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,b[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,l=f.test(a);l&&(a=a.replace(f,"")||"top");b.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this);this.options.container?b.appendTo(this.options.container):b.insertAfter(this.$element);this.$element.trigger("inserted.bs."+this.type);var f=this.getPosition(),h=b[0].offsetWidth,g=b[0].offsetHeight;if(l){var l=a,k=this.getPosition(this.$viewport),a="bottom"==a&&f.bottom+g>k.bottom?"top":"top"==a&&f.top-g<k.top?"bottom":"right"==a&&f.right+h>k.width?"left":"left"==a&&f.left-h<k.left?"right":a;b.removeClass(l).addClass(a)}f=this.getCalculatedOffset(a,f,h,g);this.applyPlacement(f,a);a=function(){var a=c.hoverState;c.$element.trigger("shown.bs."+c.type);c.hoverState=null;"out"==a&&c.leave(c)};e.support.transition&&this.$tip.hasClass("fade")?b.one("bsTransitionEnd",a).emulateTransitionEnd(d.TRANSITION_DURATION):a()}}};d.prototype.applyPlacement=function(b,a){var c=this.tip(),f=c[0].offsetWidth,d=c[0].offsetHeight,h=parseInt(c.css("margin-top"),10),g=parseInt(c.css("margin-left"),10);isNaN(h)&&(h=0);isNaN(g)&&(g=0);b.top+=h;b.left+=g;e.offset.setOffset(c[0],e.extend({using:function(a){c.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0);c.addClass("in");var g=c[0].offsetWidth,k=c[0].offsetHeight;"top"==a&&k!=d&&(b.top=b.top+d-k);var m=this.getViewportAdjustedDelta(a,b,g,k);m.left?b.left+=m.left:b.top+=m.top;f=(h=/top|bottom/.test(a))?2*m.left-f+g:2*m.top-d+k;d=h?"offsetWidth":"offsetHeight";c.offset(b);this.replaceArrow(f,c[0][d],h)};d.prototype.replaceArrow=function(b,a,c){this.arrow().css(c?"left":"top",50*(1-b/a)+"%").css(c?"top":"left","")};d.prototype.setContent=function(){var b=this.tip(),a=this.getTitle();b.find(".tooltip-inner")[this.options.html?"html":"text"](a);b.removeClass("fade in top bottom left right")};d.prototype.hide=function(b){function a(){"in"!=c.hoverState&&f.detach();c.$element.removeAttr("aria-describedby").trigger("hidden.bs."+c.type);b&&b()}var c=this,f=e(this.$tip),l=e.Event("hide.bs."+this.type);this.$element.trigger(l);if(!l.isDefaultPrevented())return f.removeClass("in"),e.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",a).emulateTransitionEnd(d.TRANSITION_DURATION):a(),this.hoverState=null,this};d.prototype.fixTitle=function(){var b=this.$element;(b.attr("title")||"string"!=typeof b.attr("data-original-title"))&&b.attr("data-original-title",b.attr("title")||"").attr("title","")};d.prototype.hasContent=function(){return this.getTitle()};d.prototype.getPosition=function(b){b=b||this.$element;var a=b[0],c="BODY"==a.tagName,a=a.getBoundingClientRect();null==a.width&&(a=e.extend({},a,{width:a.right-a.left,height:a.bottom-a.top}));var d=c?{top:0,left:0}:b.offset();b={scroll:c?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()};c=c?{width:e(window).width(),height:e(window).height()}:null;return e.extend({},a,b,c,d)};d.prototype.getCalculatedOffset=function(b,a,c,d){return"bottom"==b?{top:a.top+a.height,left:a.left+a.width/2-c/2}:"top"==b?{top:a.top-d,left:a.left+a.width/2-c/2}:"left"==b?{top:a.top+a.height/2-d/2,left:a.left-c}:{top:a.top+a.height/2-d/2,left:a.left+a.width}};d.prototype.getViewportAdjustedDelta=function(b,a,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var h=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);/right|left/.test(b)?(c=a.top-h-g.scroll,a=a.top+h-g.scroll+d,c<g.top?e.top=g.top-c:a>g.top+g.height&&(e.top=g.top+g.height-a)):(d=a.left-h,a=a.left+h+c,d<g.left?e.left=g.left-d:a>g.right&&(e.left=g.left+g.width-a));return e};d.prototype.getTitle=function(){var b=this.$element,a=this.options;return b.attr("data-original-title")||("function"==typeof a.title?a.title.call(b[0]):a.title)};d.prototype.getUID=function(b){do b+=~~(1E6*Math.random());while(document.getElementById(b));return b};d.prototype.tip=function(){if(!this.$tip&&(this.$tip=e(this.options.template),1!=this.$tip.length))throw Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip};d.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")};d.prototype.enable=function(){this.enabled=!0};d.prototype.disable=function(){this.enabled=!1};d.prototype.toggleEnabled=function(){this.enabled=!this.enabled};d.prototype.toggle=function(b){var a=this;b&&(a=e(b.currentTarget).data("bs."+this.type),a||(a=new this.constructor(b.currentTarget,this.getDelegateOptions()),e(b.currentTarget).data("bs."+this.type,a)));b?(a.inState.click=!a.inState.click,a.isInStateTrue()?a.enter(a):a.leave(a)):a.tip().hasClass("in")?a.leave(a):a.enter(a)};d.prototype.destroy=function(){var b=this;clearTimeout(this.timeout);this.hide(function(){b.$element.off("."+b.type).removeData("bs."+b.type);b.$tip&&b.$tip.detach();b.$tip=null;b.$arrow=null;b.$viewport=null})};var n=e.fn.tooltip;e.fn.tooltip=function(b){return this.each(function(){var a=e(this),c=a.data("bs.tooltip"),f="object"==typeof b&&b;if(c||!/destroy|hide/.test(b))if(c||a.data("bs.tooltip",c=new d(this,f)),"string"==typeof b)c[b]()})};e.fn.tooltip.Constructor=d;e.fn.tooltip.noConflict=function(){e.fn.tooltip=n;return this}}(jQuery);

// Popover
+function(b){var a=function(c,a){this.init("popover",c,a)};if(!b.fn.tooltip)throw Error("Popover requires tooltip.js");a.VERSION="3.3.5";a.DEFAULTS=b.extend({},b.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'});a.prototype=b.extend({},b.fn.tooltip.Constructor.prototype);a.prototype.constructor=a;a.prototype.getDefaults=function(){return a.DEFAULTS};a.prototype.setContent=function(){var c=this.tip(),a=this.getTitle(),b=this.getContent();c.find(".popover-title")[this.options.html?"html":"text"](a);c.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof b?"html":"append":"text"](b);c.removeClass("fade top bottom left right in");c.find(".popover-title").html()||c.find(".popover-title").hide()};a.prototype.hasContent=function(){return this.getTitle()||this.getContent()};a.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)};a.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var e=b.fn.popover;b.fn.popover=function(c){return this.each(function(){var f=b(this),d=f.data("bs.popover"),e="object"==typeof c&&c;if(d||!/destroy|hide/.test(c))if(d||f.data("bs.popover",d=new a(this,e)),"string"==typeof c)d[c]()})};b.fn.popover.Constructor=a;b.fn.popover.noConflict=function(){b.fn.popover=e;return this}}(jQuery);
