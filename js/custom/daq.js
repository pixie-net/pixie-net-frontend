$(document).ready(function () {
    $("#apply").click(function () {		// function for  refresh button
        $("#apply").css("background-color", "lightgray");
        $("#read").css("background-color", "lightgray");
        $("#start").css("background-color", "lightgray");
        $.get("../cgi/progfippi.cgi", function (data) {	//jQuery get function executes progfippi on Pixie-Net -> settings file applied
            alert(data);
        })  		// end get
    });		   // end button click refresh


    $("#read").click(function () {							// function for  read settings button
        $.get("../cgi/cgireadsettings.cgi", function (data) {	   //jQuery get function executes cgireadsettings on Pixie-Net -> return data is list of analog settings
            var dataarray = data.split(',');			  // "split" data string at commas
            $("#runtime").val(dataarray[33]);			// assign values to polarity controls
            $("#runtype").val(dataarray[31]);

        })
    });

    $("#start").click(function () {
        move()
        $.get("../cgi/startdaq.cgi", function (data) {
            alert(data);
        })
    });

    $("#runtime").focus(function () {							 // change color of control field while editing
        $(this).css("background-color", "yellow");
        $("#apply").css("background-color", "yellow");
    });

    $("#runtime").blur(function () {
        $(this).css("background-color", "white");		   // restore color of control field when done editing

        $.get("../cgi/cgiwritesettings.cgi", 					 //jQuery get function executes cgiwritesettings on Pixie-Net -> webpage values saved to ini file
            {
                REQ_RUNTIME: "MODULE",
                v0: $("#runtime").val()
            },
            function (data) {
                alert(data);
            })  // end get
    });  // end blur (deselect)

    $("#runtype").focus(function () {							 // change color of control field while editing
        $(this).css("background-color", "yellow");
        $("#apply").css("background-color", "yellow");
    });

    $("#runtype").blur(function () {
        $(this).css("background-color", "white");

        $.get("../cgi/cgiwritesettings.cgi",
            {
                RUN_TYPE: "MODULE",
                v1: $("#runtype").val()
            },
            function (data) {
                alert(data);
            })
    });
});
