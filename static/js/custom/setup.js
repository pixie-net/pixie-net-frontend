$(function () {
    // ------------- button control functions -----------------------
    $("#refresh").click(function () {  // function for  refresh button
        $.get("../cgi/gettraces.cgi", function (data) {          //jQuery get function executes gettraces on Pixie-Net -> new ADC.csv
            var g2 = new Dygraph(                // and then recreates the plot in graphdiv2
                document.getElementById("graphdiv2"),
                "../ADC.csv", // path to CSV file
                {   // graph options
                    title: ' ',
                    ylabel: 'ADC value',
                    xlabel: 'Sample number',
                    labelsDiv: document.getElementById('legend'),
                    legend: 'always',
                    visibility: [true, true, true, true]
                }
            );
        })    // end get
    });     // end button click refresh

    $("#apply").click(function () {  // function for  apply button
        $("#apply").css("background-color", "lightgray");
        $("#read").css("background-color", "lightgray");
        $("#refresh").css("background-color", "lightgray");
        $.get("../cgi/progfippi.cgi", function (data) { //jQuery get function executes progfippi on Pixie-Net -> settings file applied
            alert(data);
        })    // end get
    });     // end button click refresh


    $(".readbutton").click(function () {       // function for  read settings button
        $.get("../cgi/cgireadsettings.cgi", function (data) {    //jQuery get function executes cgireadsettings on Pixie-Net -> return data is list of analog settings
            var dataarray = data.split(',');     // "split" data string at commas

            $("#polarity00").val(dataarray[7]);   // assign values to polarity controls
            $("#polarity01").val(dataarray[13]);
            $("#polarity02").val(dataarray[19]);
            $("#polarity03").val(dataarray[25]);

            $("#offset00").val(dataarray[8]);   // assign values to offset controls
            $("#offset01").val(dataarray[14]);
            $("#offset02").val(dataarray[20]);
            $("#offset03").val(dataarray[26]);

            $("#again00").val(dataarray[9]);      // assign values to analog gain controls
            $("#again01").val(dataarray[15]);
            $("#again02").val(dataarray[21]);
            $("#again03").val(dataarray[27]);

            $("#dgain00").val(dataarray[10]);      // assign values to analog gain controls
            $("#dgain01").val(dataarray[16]);
            $("#dgain02").val(dataarray[22]);
            $("#dgain03").val(dataarray[28]);

            $("#tau00").val(dataarray[11]);     // assign values to tau controls
            $("#tau01").val(dataarray[17]);
            $("#tau02").val(dataarray[23]);
            $("#tau03").val(dataarray[29]);

        });  // end get
        $("#read1").css("background-color", "green");
    });    // end button click read  settings


    $("#apply1").click(function () {  // function for  initialization apply button
        $.get("../cgi/progfippi.cgi", function (data) { //jQuery get function executes progfippi on Pixie-Net -> settings file applied
            alert(data);

        });    // end get
        $(this).css("background-color", "green");
    });     // end button click refresh

//  $("#hide").click(function(){  // hide extra controls
//     $("#first").toggle();
//   $("#row08").toggle();
//    alert("click");
//   });     // end button click

    // ------------- control field functions -----------------------
    $(".fieldp").focus(function () {        // change color of control field while editing
        $(this).css("background-color", "yellow");
        $("#apply").css("background-color", "yellow");
    });

    $(".fieldp").blur(function () {
        $(this).css("background-color", "white");     // restore color of control field when done editing

        $.get("../cgi/cgiwritesettings.cgi",       //jQuery get function executes cgiwritesettings on Pixie-Net -> webpage values saved to ini file
            {
                CCSRA_INVERT_05: "CHANNEL",
                v0: $("#polarity00").val(),
                v1: $("#polarity01").val(),
                v2: $("#polarity02").val(),
                v3: $("#polarity03").val()
            },
            function (data) {
                alert(data);
            })  // end get
    });  // end blur (deselect)

    $(".fieldo").focus(function () {        // change color of control field while editing
        $(this).css("background-color", "yellow");
        $("#apply").css("background-color", "yellow");
    });

    $(".fieldo").blur(function () {
        $(this).css("background-color", "white");     // restore color of control field when done editing
        //    alert("click");
        $.get("../cgi/cgiwritesettings.cgi",       //jQuery get function executes cgiwritesettings on Pixie-Net -> webpage values saved to ini file
            {
                VOFFSET: "CHANNEL",
                v0: $("#offset00").val(),
                v1: $("#offset01").val(),
                v2: $("#offset02").val(),
                v3: $("#offset03").val()
            },
            function (data) {
                alert(data);
            })  // end get
    });  // end blur (deselect)

    $(".fielda").focus(function () {        // change color of control field while editing
        $(this).css("background-color", "yellow");
        $("#apply").css("background-color", "yellow");
    });

    $(".fielda").blur(function () {
        $(this).css("background-color", "white");     // restore color of control field when done editing

        $.get("../cgi/cgiwritesettings.cgi",       //jQuery get function executes cgiwritesettings on Pixie-Net -> webpage values saved to ini file
            {
                ANALOG_GAIN: "CHANNEL",
                v0: $("#again00").val(),
                v1: $("#again01").val(),
                v2: $("#again02").val(),
                v3: $("#again03").val()
            },
            function (data) {
                alert(data);
            })  // end get
    });  // end blur (deselect)

    $(".fieldd").focus(function () {        // change color of control field while editing
        $(this).css("background-color", "yellow");
        $("#apply").css("background-color", "yellow");
    });

    $(".fieldd").blur(function () {
        $(this).css("background-color", "white");     // restore color of control field when done editing

        $.get("../cgi/cgiwritesettings.cgi",       //jQuery get function executes cgiwritesettings on Pixie-Net -> webpage values saved to ini file
            {
                DIG_GAIN: "CHANNEL",
                v0: $("#dgain00").val(),
                v1: $("#dgain01").val(),
                v2: $("#dgain02").val(),
                v3: $("#dgain03").val()
            },
            function (data) {
                alert(data);
            })  // end get
    });  // end blur (deselect)

    $(".fieldt").focus(function () {        // change color of control field while editing
        $(this).css("background-color", "yellow");
        $("#apply").css("background-color", "yellow");
    });

    $(".fieldt").blur(function () {
        $(this).css("background-color", "white");     // restore color of control field when done editing

        $.get("../cgi/cgiwritesettings.cgi",       //jQuery get function executes cgiwritesettings on Pixie-Net -> webpage values saved to ini file
            {
                TAU: "CHANNEL",
                v0: $("#tau00").val(),
                v1: $("#tau01").val(),
                v2: $("#tau02").val(),
                v3: $("#tau03").val()
            },
            function (data) {
                alert(data);
            })  // end get
    });  // end blur (deselect)
}); // end document ready