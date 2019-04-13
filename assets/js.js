// var testvariable = document.createElement("div");
// testvariable.innerText = "New text!"
// document.getElementById("test").append(testvariable)

var app = {
    location : "MONT",
    refresh : "",

    // Where the data will be stored.
    data : {},
    trains : [],

    // checks whether the data can be refreshed
    isDataExamined : false,

    // css colors changed:
    colors : {
        RED : "#BE1B1B",
        BLUE : "#1B4299",
        YELLOW : "#DABE22",
        GREEN : "#1C9F14",
        PURPLE : "#A2127D",
    },

    // initiatilize the body of the app
    initialize: function() {
        app.traindiv = document.createElement("div");
            app.traindiv.id = "traindiv";


        document.getElementById("appwindow").append(app.traindiv, )
    },

    // convert the colors provided by the system into valid colors
    colorconvert : function(color) {
        return(app.colors[color])
    },

    // AJAX pull of the data. Currently uses a public key.
    datapull : function() {
        $.ajax({
            url: "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + app.location + "&key=MW9S-E7SL-26DU-VV8V&json=y",
            method: "GET"
        }).then( function(response) {
            app.divClear();
            console.log(response);
            app.data = response;
            app.trains = app.data.root.station[0].etd;
            console.log(app.trains);
            app.divCreation(app.trains);
        })
    },

    // List of all data that should be cleaned up. 
    divClear : function() {
        app.traindiv.innerHTML = "";
    },

    // Creates the divs based on an array. 
    divCreation : function(array) {
        // create a div for each message found
        for(i = 0; i < array.length; i++) {
            var data = array[i];
            var parentdiv = document.createElement("div");
            parentdiv.classList = "parentdiv btn mx-2 my-1 text-light";
            // set the background color of the div to a chosen list
            parentdiv.setAttribute("style", "background-color: " + app.colorconvert(data.estimate[0].color));
            // Create a desination div
            var destinationdiv = document.createElement("div");
            destinationdiv.classList = "destinationdiv";
            destinationdiv.innerHTML = data.destination;
            // Create an immediate time div (primary/secondary... maybe?)
            var nexttimediv = document.createElement("div");
            nexttimediv.classList = "nexttimediv";
            nexttimediv.innerHTML = data.estimate[0].minutes;
            // Create a secondary time div for other expected times
            var othertimediv = document.createElement("div");
            othertimediv.classList = "othertimediv";
            var timedetails = ""
            for (j = 1; j < data.estimate.length; j++) {
                timedetails += data.estimate[j].minutes
                if(j + 1 === data.estimate.length) {
                    // nothing happens
                }
                else{
                    timedetails += ", ";
                }
            }
            othertimediv.innerHTML = timedetails;

            // Create an alert if value of delay <10 minutes (600 seconds);


            // Create an expandable div that will have # of train details
                // https://codepen.io/peternguyen/pen/hICga
            // Append the divs
            parentdiv.append(destinationdiv, nexttimediv, othertimediv);
            app.traindiv.append(parentdiv);

            app.colorconvert(data.estimate[0].color)
        }
    },
    // When start the function, certain things happen
    start : function() {
        // initialize the body of the app
        app.initialize();
        // determine the location
        // pull the data
        app.datapull();
        app.refresh = setInterval(function() {
            app.datapull();
        }, 30000)
    },
}


app.start();
