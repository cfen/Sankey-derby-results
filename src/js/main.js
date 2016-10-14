import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'
import _ from 'lodash'
import moment from 'moment'

import d3 from './lib/d3.min_04_30_15.js'

var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');

var globalTeamsArr;

export function init(el, context, config, mediator) {
    el.innerHTML = mainHTML.replace(/%assetPath%/g, config.assetPath);
    addD3El();
}

function addGradients(u){
        var tempColorMC = y("MC");

        var tempColorMU = y("MU");      

        //Win games grads
        var gradientMCW = u.append("defs")
          .append("linearGradient")
            .attr("id", "gradientMCW")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradientMCW.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", tempColorMC)
            .attr("stop-opacity", 0.8);    

        gradientMCW.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", tempColorMC)
            .attr("stop-opacity", 0.6);

        gradientMCW.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", tempColorMC)
            .attr("stop-opacity", 0.8);

        var gradientMUW = u.append("defs")
          .append("linearGradient")
            .attr("id", "gradientMUW")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradientMUW.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", tempColorMU)
            .attr("stop-opacity", 0.8);

        gradientMUW.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", tempColorMU)
            .attr("stop-opacity", 0.6);

        gradientMUW.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", tempColorMU)
            .attr("stop-opacity", 0.8);



//Draw games grads
        var gradientMCD = u.append("defs")
          .append("linearGradient")
            .attr("id", "gradientMCD")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradientMCD.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", tempColorMC)
            .attr("stop-opacity", 0.5);    

        gradientMCD.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", tempColorMC)
            .attr("stop-opacity", 0.3);

        gradientMCD.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", tempColorMC)
            .attr("stop-opacity", 0.5);

        var gradientMUD = u.append("defs")
          .append("linearGradient")
            .attr("id", "gradientMUD")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradientMUD.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", tempColorMU)
            .attr("stop-opacity", 0.5);

        gradientMUD.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", tempColorMU)
            .attr("stop-opacity", 0.3);

        gradientMUD.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", tempColorMU)
            .attr("stop-opacity", 0.5);

    // game lost
        var gradientMCL = u.append("defs")
          .append("linearGradient")
            .attr("id", "gradientMCL")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradientMCL.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", tempColorMC)
            .attr("stop-opacity", 0.3);    

        gradientMCL.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", tempColorMC)
            .attr("stop-opacity", 0.1);

        gradientMCL.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", tempColorMC)
            .attr("stop-opacity", 0.3);

        var gradientMUL = u.append("defs")
          .append("linearGradient")
            .attr("id", "gradientMUL")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradientMUL.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", tempColorMU)
            .attr("stop-opacity", 0.3);

        gradientMUL.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", tempColorMU)
            .attr("stop-opacity", 0.1);

        gradientMUL.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", tempColorMU)
            .attr("stop-opacity", 0.3);        

}

function addD3El(){
    /*! alluvial_diagram 02-11-2015 */

    var game, _data, node;

        d3.alluvial = function() {

            function a() {
                function a(b, c) {
                 
                    if (c + 1 > d.length - 1) return [];
                    var e = d[c + 1],
                        f = e.filter(function(a) {
                            return b.key == a.key ? !0 : !1
                        });

                    return f.length < 1 ? (f = a(b, c + 1), c + 1 == d.length - 1 ? [] : f) : f
                }

                function k(a, b) {
                    
                    if (a.week < 1) return [];
                    var c = d[b - 1],
                        e = c.filter(function(b) {
                            // console.log(a.key)
                            // console.log(b.key)

                            return a.key == b.key ? !0 : !1
                        });
                // console.log(c)
                // console.log(e.length < 1 ? (e = k(a, b - 1), e.length < 1 && console.log("source - can't find team " + a.key + " in week " + (b - 1)), e) : e, e);

                    return e.length < 1 ? (e = k(a, b - 1), e.length < 1 && console.log("source - can't find team " + a.key + " in week " + (b - 1)), e) : e
                }

                c = [], b = [], d = [];

                var n = 0;
                var lastWinningTeam;

                _data.forEach(function(a) {

                    d.push([]), 
                    node = {}, 
                    node.key = a.away, 
                    node.value = a.away_prob, 
                    node.opponentValue = a.home_prob, 
                    node.gameKey = a.home + "_" + a.away+"_"+ a.season + "_w" + n, 
                    node.week = n, 
                    node.opponent = a.home, 
                    node.game = a, 
                    node.win = a.away_prob > a.home_prob  ? 1 : 0, 
                    node.lose = a.away_prob < a.home_prob ? 1 : 0, 
                    node.draw = a.away_prob == a.home_prob ? 1 : 0, 
                    node.winningTeam = getWinningTeam(a),
                    node.totalWins = 0, 
                    node.type = "away", 
                    node.gameIndex = n, 
                    node.sourceLinks = [], 
                    node.targetLinks = [], 
                    b.push(node), 
                    
                    d[n].push(node), 

                    node = {}, 
                    node.key = a.home, 
                    node.opponent = a.away, 
                    node.opponentValue = a.away_prob, 
                    node.gameKey = a.home + "_" + a.away+"_"+ a.season + "_w" + n, 
                    node.value = a.home_prob, 
                    node.week = n, 
                    node.game = a, 
                    node.type = "home", 
                    node.win = a.home_prob > a.away_prob ? 1 : 0,
                    node.lose = a.home_prob < a.away_prob ? 1 : 0,
                    node.draw = a.away_prob == a.home_prob ? 1 : 0,
                    node.winningTeam = getWinningTeam(a),  
                    node.gameIndex = n, 
                    node.totalWins = 0, 
                    node.sourceLinks = [], 
                    node.targetLinks = [], 
                    b.push(node), 

                    d[n].push(node), 
                    
                    n++

                }), i = m[1] * j, h = (m[1] - d[0].length * i) / d[0].length, e = (m[0] - l) / (d.length - 1), f = h + i;

                h = 90;

                //console.log(h,i,j,m,l)

                var o = 0;

                d.forEach(function(a) {
                    
                    g.push(o * e), 
                    o++
                }), 

                
                b.forEach(function(bObj, count) {

                    var NewY;
                    var n = count-1;
                    var nn;
                    var lastWinner;

                    var circR = h * (bObj.value + 0.05);

                    bObj.win ?  NewY = h-(circR/2) : NewY = 0-(circR/2);

                    if(bObj.winningTeam != "draw"){
                        lastWinningTeam = bObj.winningTeam;
                    }

                    if(bObj.winningTeam=="draw" ){ 
                        lastWinner = (lastWinningTeam==bObj.key) //Boolean    
                        lastWinner ? NewY=(h/2)+(circR/2)+1 : NewY=(h/2)-(circR/2)-1;
                    } 

                    //bObj.winningTeam =="draw" && bObj.key==lastWinningTeam ? NewY = 46 : NewY = 23; 
                    
                    bObj.sourceLinks = k(bObj, bObj.week), 
                    bObj.targetLinks = a(bObj, bObj.week), 
                    bObj.x = bObj.week * e, // need to change to plot on date line here
                    bObj.dx = l,
                    bObj.value >= .5 ? bObj.y = (bObj.gameIndex - 1) * (h) : bObj.y = (bObj.gameIndex - 1) * (h) + h * (1 - bObj.value) + 1,  // LOOK HERE - to set right height/position for links
                    bObj.y = NewY,
                    bObj.dy = circR;

                }), b.forEach(function(b) {
                    if (b.week < d.length - 1) {
                        
                        //console.log(b)
                        var e = a(b, b.week);
                        if (e.length > 0) {
                            var f = {};
                            f.source = b, 
                            f.target = e[0], 
                            f.sy = f.source.y, 
                            f.ty = f.target.y, 
                            f.sdy = f.source.dy, 
                            f.tdy = f.target.dy, 
                            f.dy = b.dy, 
                            f.key = b.key, 
                            f.value = f.target.value, 
                            f.target.totalWins = f.source.totalWins + f.target.win, 
                            f.wins = f.target.totalWins, 
                            c.push(f)
                        }
                    }

                })
            }

            var b, c, d, e, f, g = [],
                h = 50,
                i = 10,
                j = .01,
                k = {},
                l = 30,
                i = 30,
                m = [1, 1],
                b = [],
                c = [];

            return k.data = function(a) {
                return arguments.length ? (_data = a, k) : _data
            }, k.nodeHeight = function(a) {
                return arguments.length ? k : h
            }, k.nodeWidth = function(a) {
                return arguments.length ? (l = +a, k) : l
            }, k.nodePadding = function(a) {
                return arguments.length ? (i = +a, k) : i
            }, k.nodes = function(a) {
                return arguments.length ? (b = a, k) : b
            }, k.links = function(a) {
                return arguments.length ? (c = a, k) : c
            }, k.size = function(a) {
                return arguments.length ? (m = a, k) : m
            }, k.hOffsets = function() {
                return g
            }, k.xOffset = function() {
                return e
            }, k.layout = function() {
                return a(), k
            }, k.relayout = function() {
                return k
            }, k.link = function() {
                function a(a) {
                    
                    var c = a.source.x + a.source.dx,
                        d = a.target.x,
                        e = d3.interpolateNumber(c, d),
                        f = e(b),
                        g = e(1 - b),
                        h = a.source.y,
                        i = a.target.y,
                        j = "M " + c + "," + h + " C " + f + ", " + h + " " + g + ", " + i + " " + d + ", " + i + " L " + d + ", " + (i + a.tdy) + " C " + f + ", " + (i + a.tdy) + " " + f + ", " + (h + a.sdy) + " " + c + ", " + (h + a.sdy) + " L " + c + "," + h;  //  add curves
                        if(a.source.winningTeam == a.target.winningTeam){ j = "M"+a.source.x+","+a.source.y+" L"+a.target.x+" "+a.target.y+" L"+a.target.x+" "+(a.target.y+a.target.dy)+" L"+a.source.x+" "+(a.source.y+a.source.dy)+" Z" } // remove curves

                    return j
                }
                var b = .5;
                return a.curvature = function(c) {
                    return arguments.length ? (b = +c, a) : b
                }, a
            }, k
        }, 


        function main() {
                
            d3.json("https://interactive.guim.co.uk/2016/08/transfer-window/test-data/prem_teams.json", function(g, o) {

                var r = [],
                    s = {};

                o.teams.forEach(function(a) {
                    s[a.key] = a;  
                }), 


                 d3.json("https://interactive.guim.co.uk/docsdata-test/18uWr4OKGoJSPO3OVeKtxpwjGb2Iu1VDJeUDHKap-qn0.json", function(g) {

                    var resultsArr = g.sheets.Sheet1;

                    resultsArr.forEach(function(o,k){

                            o.year = o.Date.split(" ")[2],
                            o.sortDate = o.Date.split(" ")[2]+getMonthNum(o.Date.split(" ")[1])+getDayNum(o.Date.split(" ")[0]),
                            o.season = getSeason(o.Date),
                            o.decadeStr = getDecade(o.season)[0],
                            o.decadeKey = getDecade(o.season)[1],
                            // o.home = o.HomeTeam == "Spurs" ? "TH" : "AR",
                            // o.away = o.HomeTeam == "Arsenal" ? "AR" : "TH",
                            o.home = o.HomeTeam == "Spurs" ? "MC" : "MU",
                            o.away = o.HomeTeam == "Arsenal" ? "MC" : "MU",
                            o.homeScore = Number(o.Score.split("-")[0]),
                            o.awayScore = Number(o.Score.split("-")[1]),
                            o.home_prob = o.homeScore/10,
                            o.away_prob = o.awayScore/10,
                            o.comp = o.Competition.split(" ").join("_"),
                            o.uniqRef = k,
                            o.week = k

                        })

                    var decadesArr = _.groupBy(resultsArr, 'decadeStr');
                    var filteredArr = [];
                    

                    _.each(decadesArr, function (decade){
                        if(decade[0].decadeStr != "pre 1960s"){ filteredArr.push(decade)}
                    })

                    var allGames = []

                    _.each(filteredArr, function (decade,k){

                        decade.sort(function(a, b){return b.sortDate-a.sortDate});

                        var targetEl,  startTime, endTime;

                        if (decade[0]['decadeStr']=="2010s") { targetEl = "#derbyChart_2010s"; startTime = moment('2010 August', 'YYYY MMM', 'en');  endTime = moment('2016 July', 'YYYY MMM', 'en')}
                        if (decade[0]['decadeStr']=="2000s") { targetEl = "#derbyChart_2000s"; startTime = moment('2000 August', 'YYYY MMM', 'en');  endTime = moment('2010 July', 'YYYY MMM', 'en')}
                        if (decade[0]['decadeStr']=="1990s") { targetEl = "#derbyChart_1990s"; startTime = moment('1990 August', 'YYYY MMM', 'en');  endTime = moment('2000 July', 'YYYY MMM', 'en')}
                        if (decade[0]['decadeStr']=="1980s") { targetEl = "#derbyChart_1980s"; startTime = moment('1980 August', 'YYYY MMM', 'en');  endTime = moment('1990 July', 'YYYY MMM', 'en')}
                        if (decade[0]['decadeStr']=="1970s") { targetEl = "#derbyChart_1970s"; startTime = moment('1970 August', 'YYYY MMM', 'en');  endTime = moment('1980 July', 'YYYY MMM', 'en')}

                        
                        console.log(decade[0])

                        _.each(decade, function (game){
                            allGames.push(game)
                        });




                        addAlluvChart(decade, s, targetEl, startTime, endTime )

                        //if(decade[0].decadeStr != "pre 1960s"){ filteredArr.push(decade)}
                    })

                    allGames.sort(function(a, b){return a.sortDate-b.sortDate});

                    //allGames.reverse();



                   // Add all matches to one long svg
                   // var targetEl = "#derbyChart-V";  
                   // addAlluvChart(allGames, s, targetEl )

                    
                })
            })





        }();

   function y(a) {
        console.log(a)
        console.log(s[a].color)
        return s[a].color
    }    
}

var tempColor;
var gradient;

function addAlluvChart(arrIn, teamsArr, targetEl, startTime, endTime){

    console.log(targetEl)
 
    var gameSize = 90;
    var allGameSize = gameSize * (arrIn.length+1);

    globalTeamsArr = teamsArr;
    
    //var newTgt = document.getElementById(teamsArr, targetEl);

    var tgtW = d3.select(targetEl)[0][0].offsetWidth;

    //tgtW > 780 ? tgtW = 780 : tgtW = tgtW;

        var a = 0,

                b = 0,
                c = .4,
                d = .1,
                e = 0,
                f = 1,
                g = 50, // used to position nodes top
                h = d3.select("#gameToolTip"), //tooltip
                i = (d3.select("#winner"), d3.select("#game_winner_name")), //tooltip
                j = d3.select("#game_winner_img"), //tooltip
                k = d3.select("#game_winner_prob"), //tooltip
                l = (d3.select("#loser"), d3.select("#game_loser_name")), //tooltip
                m = d3.select("#game_loser_img"), //tooltip
                n = d3.select("#game_loser_prob"), //tooltip score 
                o = allGameSize,
                p = {
                    top: 0,
                    right: 50,
                    bottom: 120,
                    left: 50
                },
                q = Math.max(o, 800) - p.left - p.right,
                r = tgtW  - p.left - p.right, //height of svg
                s = (d3.format(",.0f"), d3.scale.category20(), 
                    d3.select(targetEl).append("svg").style("overflow", "visible")
                    .attr("width", r + p.left + p.right)
                    .attr("height", q + p.top + p.bottom)),
                t = s.append("g").attr("width",r), //.attr("transform", "translate(" + p.left + "," + p.top + ")")
                u = s.append("g").attr("width",300), //.attr("transform", "translate(" + p.left + "," + (p.top + g) + ")")
                
                v = d3.alluvial().nodeWidth(1).nodePadding(10).size([q, r - g]),
                w = v.link();

                
            
                var g = arrIn;
                var game;      
                
                /////////// BUILDING DECADE FROM HERE

                    r = [], g.forEach(function(a) {
                        //console.log("GET THE POSITION IN RANGE HERE", moment(a.Date).format('X') )  
                        game = {}, 
                        game.week = Number(a.week), 
                        game.season = a.season, 
                        game.decadeStr = a.decadeStr, 
                        game.away = a.away, 
                        game.home = a.home, 
                        game.away_prob = Number(a.away_prob), 
                        game.home_prob = Number(a.home_prob), 
                        game.unixStamp = moment(a.Date).format('X'),
                        game.unixPos = ((moment(a.Date).format('X') - moment(startTime).format('X')) / (endTime - startTime)) * 1000, 
                        game.yPos = q * game.unixPos,
                        //console.log(game)
                        r.push(game)
                       
                    }), v.data(r).layout();


                    var z = v.links(),
                        A = v.nodes(),
                        B = v.hOffsets(),
                        C = t.selectAll(".topLabel").data(B).enter()
                    var _seasonsMarkers = [];

                    var displaySeason;    
                    // add weeks text 
                    
                    C.append("text").attr("class", "weekLabel").attr("x", 15 - p.top).attr("y", function(a) {
                        return a + 15
                    })
                    .text(function(a, b) {
                        var displayTxt;
                        if(r[b]['season'] != displaySeason){ _seasonsMarkers.push(a) };
                        var shortTxt = r[b]['season'].split('–')[0].substring(2)+'–'+r[b]['season'].split('–')[1].substring(2);
                        r[b]['season'] != displaySeason ? displayTxt = displaySeason = r[b]['season'] : displayTxt = " ";

                        //r[b]['season'] != displaySeason ? shortTxt = shortTxt : shortTxt = " ";

                        
                        return displayTxt
                    }),

                    _seasonsMarkers.forEach(function(point) {
                        C.append("line").style("stroke", "#EFEFEF").style("stroke-width","1")
                        .attr("y1",function(a) {
                            
                            return point - 10
                        })
                        .attr("y2",function(a) { return point -10 })
                        .attr("x1", 0)
                        .attr("x2",tgtW);
                    });

                    addGradients(u);
                    var tempGrad;
                    //add links data
                    var D = (u.append("g")
                        .selectAll(".link")
                        .data(z)
                        .enter()
                        .append("path")
                        .attr("class", function(a) {
                        return "link " + a.key
                    }).attr("d", w)

                    .style("fill", function(a) {

                        // console.log(a)

                        if (a.key == "MC" && a.target.win){ tempGrad = "url(#gradientMCW)"}
                        if (a.key == "MU" && a.target.win){ tempGrad = "url(#gradientMUW)"}
                        if (a.key == "MC" && a.target.draw){ tempGrad = "url(#gradientMCD)"}
                        if (a.key == "MU" && a.target.draw){ tempGrad = "url(#gradientMUD)"}
                        if (a.key == "MC" && a.target.lose){ tempGrad = "url(#gradientMCL)"}
                        if (a.key == "MU" && a.target.lose){ tempGrad = "url(#gradientMUL)"}

                        return(tempGrad)

                    })
                    //.style("fill-opacity", a)
                    .style("stroke", function(a) {                    
                        return y(a.key)
                    })
                    //.style("fill-opacity", 0.5)
                    .style("stroke-width", .5)
                    .style("stroke-opacity", b), 

                    u.append("g")
                    .selectAll(".node")
                    .data(A)
                    .enter().append("g")
                    .attr("class", "node").attr("transform", function(a) {

                        //console.log(a)
                        //console.log(a,"Add this functionality to drawing of lines");
                        // var NewY;
                        // a.key == a.gameKey.split("_")[0] ? NewY = 0 : NewY = a.game.home_prob * 10 * 65;
                        return "translate(" + a.x + ", "+a.y+")"//" + a.y + "
                    }));

                    D.append("circle").attr("class", function(a) {
                        return "game " + a.key + " " + a.gameKey
                    })
                    .attr("cy",function(a) {
                        return a.dy/2
                    })
                    // .attr("cx",function(a) {
                    //     return a.dx/2
                    // })
                    .attr("r", function(a) {
                        return a.dy/2
                    })
                    // .attr("width", v.nodeWidth())
                    .style("fill", function(a) {
                        return y(a.key)
                    })
                    .style("fill-opacity", 1) //function(a) { return a.value < .5 ? c : .8 }
                    .style("stroke", function(a) {
                        return y(a.key)
                    }).style("stroke-opacity", e)
                    .on("mouseover", function(a) {
                        mouseOver(a,h,p,q, this)
                    })
                    .on("mouseout", function(a) {
                        mouseExit(a,h,p,q)
                    })
                


                console.log(u.attr("width"), tgtW)
                var tgtShim = (tgtW - u.attr("width"))/2 ;

                //rotate alluvial
                u.attr('transform', 'translate('+tgtShim+',50)rotate(90)');




        /////////// END BUILDING DECADE DATA

}

function mouseOver(a,h,p,q,circleEl ) {  //this isn't called until rolling over a node
        
        var pos = circleEl.getBoundingClientRect();

        console.log(circleEl)

        d3.selectAll("path." + a.key)
        .transition().style("fill-opacity", .9)
        // u.selectAll("rect")
        // .filter(function() {
        //     return this.__data__.key != a.key
        // })
        // .transition().style("fill-opacity", d), u.selectAll("rect").filter(function() {
        //     return this.__data__.opponent == a.key
        // })
        // .transition().style("fill-opacity", .25);


        // u.selectAll("text." + a.key).data();
        // u.selectAll("text").filter(function() {
        //     return this.__data__.key != a.key && this.__data__.opponent != a.key
        // })
        // .transition().style("fill-opacity", d);


        //var xywh =element[0][0].getBoundingClientRect();

        h.style("top", pos.top + "px" ).style("left", "0px"), 
        h.transition().style("opacity", 1);
        // var b, c, e, f;
        // a.value > .49 ? (b = s[a.key], c = s[a.opponent], e = a.value, f = a.opponentValue) : (b = s[a.opponent], c = s[a.key], console.log(c), e = a.opponentValue, f = a.value), 
           
        //     i.text(b.name).style("color", b.color), 
        //     k.text(Math.round(10 * e)).style("color", b.color), 
        //     j.attr("src", "assets/"+b.key+".png"), 
        //     l.text(c.name).style("color", c.color), 
        //     n.text(Math.round(10 * f))
        //     .style("color", c.color), 
        //     m.attr("src", "assets/"+c.key+".png")
        //     t.selectAll(".weekLabel")
        //     .transition()
        //     .style("font-weight", function(b, c) {
        //     return c == a.week || c == a.week ? "bold" : "normal"
        // }).style("font-size", function(b, c) {
        //     return c == a.week || c == a.week ? "16px" : "12px"
        // })
}

function mouseExit(a,h,p,q) { //rollout functionality

        d3.selectAll("path")
        .transition().style("fill-opacity", 0.5)

        // u.selectAll("rect").transition().style("fill-opacity", function(a) {
        //     return a.value < .5 ? c : .8
        // }), 

        // u.selectAll("text")
        // .transition()
        // .style("fill-opacity", f), 
        // t.selectAll(".headerLabel")
        // .transition().style("opacity", 0), 
        // t.selectAll(".weekLabel")
        // .transition()
        // .style("font-weight", "normal")
        // .style("font-size", "12px"), 
        h.transition().style("opacity", 0)
}


function getWinningTeam(a){
        var s = "draw";

        if(a.home_prob > a.away_prob){ s=a.home }
        if(a.home_prob < a.away_prob){ s=a.away } 

        return s;
}


function y(a) {
        // output different colors for arse and spurs
        var c = globalTeamsArr[a].color

        c == "#b00101" ? c ="#ff9b0b" : c = "#005689";

        return c;
}



function getMax( maxHScore, maxAScore){ 
            if( maxAScore > maxHScore || maxAScore == maxHScore ){ return (maxAScore) }; 
            if( maxHScore > maxAScore  ){ return (maxHScore) }; 
        }

        function getDecade(season){
            var a = season.split("–");
            var yy1 = Number(a[0]);
            var yy2 = Number(a[1]);
            var s = [ "pre 1960s", 0 ];

                // if (yy1 >= 1960 && yy2 <= 1970){ s = ['1960s', 1]}
                if (yy1 >= 1970 && yy2 <= 1980){ s = ['1970s', 2]}
                if (yy1 >= 1980 && yy2 <= 1990){ s = ['1980s', 3]}
                if (yy1 >= 1990 && yy2 <= 2000){ s = ['1990s', 4]}
                if (yy1 >= 2000 && yy2 <= 2010){ s = ['2000s', 5]}
                if (yy1 >= 2010 && yy2 <= 2020){ s = ['2010s', 6]}

            return s    
        }

        function getMonthNum(month){

            var n = 0;

            if( month == "January"){ n=0 }
            if( month == "February"){ n=1 }
            if( month == "March"){ n=2 } 
            if( month == "April"){ n=3 }
            if( month == "May"){ n=4 }
            if( month == "June"){ n=5 }
            if( month == "July"){ n=6 }
            if( month == "August"){ n=7 }
            if( month == "September"){ n=8 }
            if( month == "October"){ n=9 }
            if( month == "November"){ n=10 }
            if( month == "December"){ n=11 }

            if (n.toString().length == 1) {
                    n = "0" + n;
                }    

            return n;

        }

        function getDayNum(d){

            if (d.toString().length == 1) {
                    d = "0" + d;
                }    

            return d;

        }

        function getSeason(d){
            var dateArr = d.split(" ");
            var season;
            var month = dateArr[1];
            var yyyy = Number(dateArr[2]);


                if( month == "January" || month == "February" ||  month == "March" ||  month == "April" ||  month == "May" ||  month == "June" ){ season = (yyyy-1)+"–"+yyyy }
                if( month == "July" || month == "August" ||  month == "September" ||  month == "October" ||  month == "November" ||  month == "December" ){ season = yyyy+"–"+(yyyy+1) }

            return season;
        }
