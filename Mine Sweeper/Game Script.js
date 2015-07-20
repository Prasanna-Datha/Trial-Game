var CompleteArray = [];
var safeBlockArray = [];
var unsafeBlockArrays = [];
var numArray = ["1", "2", "3"];
$(document).ready(function () {
    $('<div id="MainDiv">').appendTo("body");
    $('<table id="minesTable" border="1" style="width:500px; height:500px">').css({"table-layout":"fixed"}).appendTo("#MainDiv");
    for (var rows = 1; rows <= 10; rows++) {
        var row = $('<tr>').attr({ id: "r" + rows }).appendTo("#minesTable");
        for (var cols = 1; cols <= 10; cols++) {
            CompleteArray.push("r"+rows+"c"+cols);
            var col = $('<td>').attr({ id: "r" + rows + "c" + cols, onclick:'check(id)' }).css({ height: "43px", width: "43px" }).appendTo(row);
            var textBox = $('<input>').attr({ id: "txt", disabled:"disabled",display:"block",margin:"auto 0" }).css({width:"43px",height:"43px"}).appendTo(col);
        }
    }
    
    for (var mines = 1; mines <= 20; mines++) {

        var rand = randomIntFromInterval(0, 10);
        var rand1 = randomIntFromInterval(0, 10);
        unsafeBlockArrays.push("r" + rand + "c" + rand1);
        $("#r" + rand + "c" + rand1).find('#txt').css({ "background-color": "red", "text-align": "center", "font-size": "39px",display:"none"}).val("*");
    }

    safeBlockArray = $(CompleteArray).not(unsafeBlockArrays).get();
    
    //jQuery.grep(unsafeBlockArrays, function (el) {
    //    if (jQuery.inArray(el, CompleteArray) == -1) safeBlockArray.push(el);
    //});
    for (var safe = 0; safe <= safeBlockArray.length; safe++) {
        $("#" + safeBlockArray[safe]).find('#txt').val(numArray[randomIntFromInterval(0, 2)]);
        $("#" + safeBlockArray[safe]).find('#txt').css({ "background-color": "green", "text-align": "center", "font-size": "20px", color: "white", display:"none" });
    }

});

function check(id) {    
    $("#" + id).find("#txt").css({ display: "block" });
    var num = $("#" + id).find("#txt").val();
   
    for (k = 0; k < num+1; k++) {
        var rowNo = $("#" + id).attr("id").split('c')[0].split('r')[1];
        var colNo = $("#" + id).attr("id").split('c')[1];
        $("#r" + (++rowNo) + "c" + colNo).find("#txt").css({ "background-color": "grey", "text-align": "center", "font-size": "20px", color: "white", display: "block" });
    }

    for (var j = 0; j < unsafeBlockArrays.length; j++) {
        if (unsafeBlockArrays[j] == id) {
            alert("YOU LOSE !!!");
            window.location = "http://localhost:51612/Game%20Page.html";
        }       
    }    
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);    
    
}