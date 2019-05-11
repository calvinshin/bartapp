// var testvariable = document.createElement("div");
// testvariable.innerText = "New text!"
// document.getElementById("test").append(testvariable)

var app = {
  location: "MONT",
  refresh: "",

  // Where the data will be stored.
  data: {},
  trains: [],
  platforms: [],
//   static pull of stations from 19 April 2019
  stations: stations,

  // checks whether the data can be refreshed
  isDataExamined: false,

  // Active listeners
  divCreationDiv: "",
  stationListener: "",

  colorOptions : {
    standard : {
      RED: "#BE1B1B",
      BLUE: "#1B4299",
      YELLOW: "#D1B621",
      GREEN: "#1C9F14",
      PURPLE: "#A2127D",
      WHITE: "#808080",
      ORANGE: "#cc620c",
      fontColor: "white",
    },
    vaporwave : {
      RED: "#ed7b95",
      BLUE: "#7baeed",
      YELLOW: "#ede25c",
      GREEN: "#8ae57e",
      PURPLE: "#e893ed",
      WHITE: "#808080",
      ORANGE: "#eaae70",
      fontColor: "black",
    },
    monochrome : {
      RED: "#a0a0a0",
      BLUE: "#424242",
      YELLOW: "#757575",
      GREEN: "#636363",
      PURPLE: "#303030",
      WHITE: "#1c1c1c",
      ORANGE: "#8c8c8c",
      fontColor: "black",
    }
  },

  // css colors changed:
  colors: {},

  colorOrder: ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "PURPLE", "WHITE"],

  // initiatilize the body of the app
  initialize: function() {
    // Creates a header
    this.headerCreation();

    // create the traindiv where all train data is going into
    this.traindiv = document.createElement("div");
    this.traindiv.id = "traindiv";
    document.getElementById("appwindow").append(this.traindiv);
  },

  // convert the colors provided by the API call into valid colors
  colorconvert: function(color) {
    if(typeof app.colors[color] === "undefined") {
      return "#000000"
    }
    return app.colors[color];
  },

  // AJAX pull of the data. Currently uses a public key.
  realtimePull: function(station) {
    $.ajax({
      url:
        "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" +
        station +
        "&key=MW9S-E7SL-26DU-VV8V&json=y",
      method: "GET",
      // before sending, do a refresh image rotating
      // This does not work as it stands; issue with ordering of all the functions as they stand.
      // beforeSend: function() {
      //   var refresh = document.createElement("i");
      //   refresh.classList = "fas fa-sync fa-spin";
      //   // app.traindiv.append(refresh)
      // }
    }).then(
      function(response) {
        // Clear all the data!
        app.divClear();
        console.log(response);
        app.data = response;
        app.trains = app.data.root.station[0].etd;
        // Create the divs
        app.divCreation(app.trains);

        // Create listeners for the station;
        app.stationListenerCreator();
      },
      function(response) {
        // This section looks to see if the AJAX call failed and then indicates that real times could not be loaded.
        // Ideally, this would pull data from stored tables when there is no internet connetion.
        app.traindiv.innerHTML("");
        var parentdiv = document.createElement("div");
        parentdiv.innerText =
          "Real times could not be loaded. Please check your internet connection.";
        app.traindiv.append(parentdiv);
      }
    );
  },

  headerCreation : function() {
    this.headerdiv = document.createElement("div");
    this.headerdiv.id = "headerdiv";
    this.headerdiv.classList = "";
    document.getElementById("appwindow").append(this.headerdiv);

    // create the locationdiv where the current location is identified
    this.locationdiv = document.createElement("select");
    this.locationdiv.id = "locationdiv";
    this.locationdiv.classList = "btn btn-light dropdown-toggle"
    // this.locationdiv.classList.add("form-control")
    this.headerdiv.append(this.locationdiv);

    // Create each of the options in the dropdown selection
    for(var i = 0; i < this.stations.length; i++) {
      var option = document.createElement("option");
      option.innerText = this.stations[i].name;
      option.id = "station" + this.stations[i].abbr;
      option.setAttribute("abbr", this.stations[i].abbr);
      option.classList.add("realtimeOption");
      this.locationdiv.append(option);
    }

    // Create the refresh button
    var refreshIcon = document.createElement("i");
    refreshIcon.classList = "fas fa-sync icon";
    refreshIcon.id = "refreshIcon";
    this.headerdiv.append(refreshIcon);

    // Create the refresh listener
    this.refreshListener();
  },

  // List of all data that should be cleaned up.
  divClear: function() {
    this.traindiv.innerHTML = "";
    this.platforms = [];
  },

  // Creates the divs based on an array.
  divCreation: function(array) {
    // create a div for each message found
    for (i = 0; i < array.length; i++) {
      var data = array[i];
      var parentdiv = document.createElement("div");
      parentdiv.classList = "parentdiv btn mx-2 my-1 text-light";
      // set the background color of the div to a chosen list
      parentdiv.setAttribute(
        "style",
        "background-color: " + app.colorconvert(data.estimate[0].color) + ";" + 
        "order : " + parseInt(parseInt(this.colorOrder.indexOf(data.estimate[0].color) * 100) + (data.estimate[0].minutes === "Leaving" ? parseInt(0) : parseInt(data.estimate[0].minutes)))
      );

      // Create a desination div
      var destinationdiv = document.createElement("div");
      destinationdiv.classList = "destinationdiv";
      destinationdiv.innerHTML = data.destination;

      // Create an immediate time div (primary/secondary... maybe?)
      var nexttimediv = document.createElement("div");
      nexttimediv.classList = "nexttimediv";
      nexttimediv.innerHTML = data.estimate[0].minutes + (data.estimate[0].minutes === "Leaving" ? "" : "<section class='smallMin'> min</section>");

      // Create a secondary time div for other expected times
      var othertimediv = document.createElement("div");
      othertimediv.classList = "othertimediv";
      var timedetails = "";
      for (j = 1; j < data.estimate.length; j++) {
        timedetails += data.estimate[j].minutes;
        if (j + 1 === data.estimate.length) {
          // nothing happens
        } else {
          timedetails += ", ";
        }
      }

      othertimediv.innerHTML = timedetails;

      // Create an expandable div that will have # of train details
      // https://codepen.io/peternguyen/pen/hICga
      var expanddiv = document.createElement("div");
      expanddiv.classList = "expanddiv";
      expanddiv.innerHTML =
        "Number of trains: " +
        data.estimate[0].length +
        "<br>" +
        "Delayed by " +
        Math.round(data.estimate[0].delay / 60) +
        " minute" +
        // Ternary operator! First use.
        (Math.round(data.estimate[0].delay / 60) === 1 ? "" : "s");

      // Icon div for bike and other details
      var icondiv = document.createElement("div");
      icondiv.classList = "icondiv";
      // check if bikes not allowed on the next train
      if ((data.estimate[0].bikeflag = 0)) {
        // display the bike image
        var ban = document.createElement("i");
        ban.classList = "fas fa-ban nobike nobikeban";

        var bike = document.createElement("i");
        bike.classList = "fas fa-bicycle nobike nobikebike";

        icondiv.append(ban, bike);
      }

      // Append the divs
      parentdiv.append(
        destinationdiv,
        nexttimediv,
        othertimediv,
        expanddiv,
        icondiv
      );


      // Check the list of platforms
        // data.estimate[0].platform
      if(app.platforms.indexOf(data.estimate[0].platform) === -1) {
        var platformNumber = data.estimate[0].platform
        app.platforms.push(platformNumber)
      // If there is no platform that exists, create a new div for the platform
        var platformDiv = document.createElement("div");
        platformDiv.id = "platform" + platformNumber;
        platformDiv.classList = "platformContainerDiv"
        platformDiv.innerHTML = "<h5 class='platformDiv'>Platform " + platformNumber + "</h5>"
        platformDiv.style.setProperty("order", platformNumber);
        app.traindiv.append(platformDiv);

        document.getElementById("platform" + platformNumber).append(parentdiv);

        // reorder the traindivs
      }
      // If the platform exists, insert it into that platform.
      else{
        var platformNumber = data.estimate[0].platform
        document.getElementById("platform" + platformNumber).append(parentdiv);
      }
      // Append the traindiv into the correct platform

      // app.traindiv.append(parentdiv);
      // End of for loop
    }

    // Add listener events
    // Listener for the div to expand and show the expandable div
    this.divCreationDiv = document.getElementsByClassName("parentdiv");
    for (var l = 0; l < app.divCreationDiv.length; l++) {
      app.divCreationDiv[l].removeAttribute("onclick");
      app.divCreationDiv[l].onclick = function() {
        // Check the classlist, if there's an expanded, then we remove it!
        if (this.classList.contains("expanded")) {
          this.classList.remove("expanded");
          var that = this;
          // For aesthetic purposes, delay the removal of the display:block css
          setTimeout(function() {
            that.childNodes[3].classList.remove("expanddivdisplay");
            that.childNodes[4].classList.remove("expanddivdisplay");
          }, 115);
        }
        // If the selected div is not expanded, remove all other expansions and expand this one
        else {
          for (var k = 0; k < app.divCreationDiv.length; k++) {
            app.divCreationDiv[k].classList.remove("expanded");
            var child = app.divCreationDiv[k];
            // Having this function causes the system to break
            // setTimeout(function() {
              child.childNodes[3].classList.remove("expanddivdisplay");
              child.childNodes[4].classList.remove("expanddivdisplay");
            // }, 110);
          }
          this.classList.add("expanded");
          var that = this;
          setTimeout(function() {
            that.childNodes[3].classList.add("expanddivdisplay");
            that.childNodes[4].classList.add("expanddivdisplay");
          }, 160);
        }
      };
    }
  },
  // When start the function, certain things happen
  start: function() {
    this.colors = this.colorOptions.standard;

    // initialize the body of the app
    this.initialize();

    // tests for location request
    this.locationRequest();

    // this.refresh = setInterval(app.realtimePull(app.location), 5000);

    //   LocationRequest, LocationPull, closestStation, then realtimePull    
  },

  // pulls the location via the location API
  locationPull: function() {
    $.ajax({
      url:
        "http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y",
      method: "GET"
    }).then(function(response) {
      app.stations = response.root.stations.station;
      app.realtimePull(app.closestStationFinder());
    }, function() {
      app.realtimePull(app.closestStationFinder());
    });
  },

//   LocationRequest, LocationPull, closestStation, then realtimePull
  locationRequest: function() {
    navigator.geolocation.getCurrentPosition(
        // captures position if provided
        function(position) {
            app.x = position.coords.latitude;
            app.y = position.coords.longitude;
            app.locationPull();
        }, 
        // defaults to Montgomery if not returned
        function() {
            app.x = "37.789405";
            app.y = "-122.401066";
            app.locationPull();
        }
    );
  },

  distance: function(x1, x2, y1, y2) {
    var conv = Math.PI / 180
    var radx1 = conv * x1;
    var rady1 = conv * y1;
    var theta = x2 - y2;
    var radtheta = conv * theta;
    var dist = Math.sin(radx1) * Math.sin(rady1) + Math.cos(radx1) * Math.cos(rady1) * Math.cos(radtheta);
    dist = Math.acos(dist) / conv * 60 * 1.1515;
    return dist;
  },

  closestStationFinder : function() {
    // set a variable for the closest station
    var closestDistance = 90000;

    for(var i = 0; i < this.stations.length; i++) {
        // iterate nearest neighbor search doing linear search
        var linearDistance = this.distance(this.x, this.y, this.stations[i].gtfs_latitude, this.stations[i].gtfs_longitude)
        // if the distance of this item is closer than the current closest station, replace closest station
        if(closestDistance > linearDistance) {
          this.location = this.stations[i].abbr;
          closestDistance = linearDistance;
        }
    }

    document.getElementById("station" + this.location).setAttribute("selected", "selected");

    this.refresh = setInterval(function() {
      app.realtimePull(app.location)}
      , 90000000);

    return app.location
  },

  
stationFunction : function() {
  app.location = this.options[this.selectedIndex].getAttribute("abbr")
  app.realtimePull(app.location);


  app.refresh = clearInterval();
  app.refresh = setInterval(function() {
    app.realtimePull(app.location)}
    , 90000);
    
    // Testing to see if the app.station should be kept separate than the app.location
  this.station = this.options[this.selectedIndex].getAttribute("abbr");
},

  stationListenerCreator : function() {
    var options = document.getElementById("locationdiv");

    // potentially redundant step; left to ensure that the listener only happens once;
    options.removeEventListener("change", app.stationFunction);

    // this.stationListener.removeEventListener("change");
    options.addEventListener("change", app.stationFunction);

  },

  refreshListener : function() {
    var refresh = document.getElementById("refreshIcon");

    // turn off the listener
    refresh.removeEventListener("click", function() {app.realtimePull(app.location)});
  
    // refresh the listener 
    refresh.addEventListener("click", function() {app.realtimePull(app.location)});
  }
};

app.start();

setInterval(function() {
  console.log("interval")
}, 15000)
