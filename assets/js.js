// var testvariable = document.createElement("div");
// testvariable.innerText = "New text!"
// document.getElementById("test").append(testvariable)

var app = {
    location : "MONT",
    refresh : "",

    // Where the data will be stored.
    data : {},
    trains : [],
    platforms : [],

    // checks whether the data can be refreshed
    isDataExamined : false,

    // Active listeners
    divCreationDiv : "",

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
        this.traindiv = document.createElement("div");
            this.traindiv.id = "traindiv";

        document.getElementById("appwindow").append(app.traindiv, )
    },

    // convert the colors provided by the API call into valid colors
    colorconvert : function(color) {

        return(app.colors[color])
    },

    // AJAX pull of the data. Currently uses a public key.
    datapull : function() {
        $.ajax({
            url: "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + app.location + "&key=MW9S-E7SL-26DU-VV8V&json=y",
            method: "GET"
        }).then( function(response) {
            // Clear all the data!
            app.divClear();
            console.log(response);
            app.data = response;
            app.trains = app.data.root.station[0].etd;
            console.log(app.trains);
            app.divCreation(app.trains);
        }, function(response)  { 
            // This section looks to see if the AJAX call failed and then indicates that real times could not be loaded.
            // Ideally, this would pull data from stored tables when there is no internet connetion.
            var parentdiv = document.createElement("div");
            parentdiv.innerText = "Real times could not be loaded. Please check your internet connection."
            app.traindiv.append(parentdiv);
        })
    },

    // List of all data that should be cleaned up. 
    divClear : function() {
        this.traindiv.innerHTML = "";
        this.platforms = [];
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

            // Create an expandable div that will have # of train details
                // https://codepen.io/peternguyen/pen/hICga
            var expanddiv = document.createElement("div");
            expanddiv.classList = "expanddiv";
            expanddiv.innerHTML = "Number of Trains: " + data.estimate[0].length + 
                                "<br>" +
                                "Delay from scheduled time: " + Math.round(data.estimate[0].delay/60) + " minute" +
                                // Ternary operator! First use.
                                ((Math.round(data.estimate[0].delay/60) === 1) ? "" : "s")

            // Icon div for bike and other details
            var icondiv = document.createElement("div");
            icondiv.classList = "icondiv";
                // check if bikes not allowed on the next train
                if(data.estimate[0].bikeflag = 0) {
                    // display the bike image
                    var ban = document.createElement("i")
                    ban.classList = "fas fa-ban nobike nobikeban"

                    var bike = document.createElement("i")
                    bike.classList = "fas fa-bicycle nobike nobikebike"

                    icondiv.append(ban, bike);
                }

            // Append the divs
                parentdiv.append(destinationdiv, nexttimediv, othertimediv, expanddiv, icondiv);

            // Append the traindiv into the correct platform

            app.traindiv.append(parentdiv);
        // End of for loop
        }
        
        
        // Add listener events
        // Listener for the div to expand and show the expandable div
        this.divCreationDiv = document.getElementsByClassName("parentdiv")
            for(l = 0; l < app.divCreationDiv.length; l++) {
                app.divCreationDiv[l].onclick = function() {
                    // Check the classlist, if there's an expanded, then we remove it!
                    if(this.classList.contains("expanded")) {
                        this.classList.remove("expanded")
                        var that = this;
                        // For aesthetic purposes, delay the removal of the display:block css
                        setTimeout(function() {
                        that.childNodes[3].classList.remove("expanddivdisplay")
                        that.childNodes[4].classList.remove("expanddivdisplay")
                        }, 115);
                    }
                    // If the selected div is not expanded, remove all other expansions and expand this one
                    else{
                        for(k = 0; k < app.divCreationDiv.length; k++) {
                            app.divCreationDiv[k].classList.remove("expanded");
                            var child = app.divCreationDiv[k]
                            setTimeout(function() {
                                child.childNodes[3].classList.remove("expanddivdisplay")
                                child.childNodes[4].classList.remove("expanddivdisplay")
                            }, 110);
                        }
                        this.classList.add("expanded");
                        var that = this;
                        setTimeout(function() {
                            that.childNodes[3].classList.add("expanddivdisplay")
                            that.childNodes[4].classList.add("expanddivdisplay")
                        }, 110);
                    }
                }
            }
    },
    // When start the function, certain things happen
    start : function() {
        // initialize the body of the app
        this.initialize();
        // determine the location
        // pull the data
        this.datapull();
        this.refresh = setInterval(app.datapull, 30000)
    },
}


app.start();