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
  stations: [
      {
        name: "12th St. Oakland City Center",
        abbr: "12TH",
        gtfs_latitude: "37.803768",
        gtfs_longitude: "-122.271450",
        address: "1245 Broadway",
        city: "Oakland",
        county: "alameda",
        state: "CA",
        zipcode: "94612"
      },
      {
        name: "16th St. Mission",
        abbr: "16TH",
        gtfs_latitude: "37.765062",
        gtfs_longitude: "-122.419694",
        address: "2000 Mission Street",
        city: "San Francisco",
        county: "sanfrancisco",
        state: "CA",
        zipcode: "94110"
      },
      {
        name: "19th St. Oakland",
        abbr: "19TH",
        gtfs_latitude: "37.808350",
        gtfs_longitude: "-122.268602",
        address: "1900 Broadway",
        city: "Oakland",
        county: "alameda",
        state: "CA",
        zipcode: "94612"
      },
      {
        name: "24th St. Mission",
        abbr: "24TH",
        gtfs_latitude: "37.752470",
        gtfs_longitude: "-122.418143",
        address: "2800 Mission Street",
        city: "San Francisco",
        county: "sanfrancisco",
        state: "CA",
        zipcode: "94110"
      },
      {
        name: "Antioch",
        abbr: "ANTC",
        gtfs_latitude: "37.995388",
        gtfs_longitude: "-121.780420",
        address: "1600 Slatten Ranch Road",
        city: "Antioch",
        county: "Contra Costa",
        state: "CA",
        zipcode: "94509"
      },
      {
        name: "Ashby",
        abbr: "ASHB",
        gtfs_latitude: "37.852803",
        gtfs_longitude: "-122.270062",
        address: "3100 Adeline Street",
        city: "Berkeley",
        county: "alameda",
        state: "CA",
        zipcode: "94703"
      },
      {
        name: "Balboa Park",
        abbr: "BALB",
        gtfs_latitude: "37.721585",
        gtfs_longitude: "-122.447506",
        address: "401 Geneva Avenue",
        city: "San Francisco",
        county: "sanfrancisco",
        state: "CA",
        zipcode: "94112"
      },
      {
        name: "Bay Fair",
        abbr: "BAYF",
        gtfs_latitude: "37.696924",
        gtfs_longitude: "-122.126514",
        address: "15242 Hesperian Blvd.",
        city: "San Leandro",
        county: "alameda",
        state: "CA",
        zipcode: "94578"
      },
      {
        name: "Castro Valley",
        abbr: "CAST",
        gtfs_latitude: "37.690746",
        gtfs_longitude: "-122.075602",
        address: "3301 Norbridge Dr.",
        city: "Castro Valley",
        county: "alameda",
        state: "CA",
        zipcode: "94546"
      },
      {
        name: "Civic Center/UN Plaza",
        abbr: "CIVC",
        gtfs_latitude: "37.779732",
        gtfs_longitude: "-122.414123",
        address: "1150 Market Street",
        city: "San Francisco",
        county: "sanfrancisco",
        state: "CA",
        zipcode: "94102"
      },
      {
        name: "Coliseum",
        abbr: "COLS",
        gtfs_latitude: "37.753661",
        gtfs_longitude: "-122.196869",
        address: "7200 San Leandro St.",
        city: "Oakland",
        county: "alameda",
        state: "CA",
        zipcode: "94621"
      },
      {
        name: "Colma",
        abbr: "COLM",
        gtfs_latitude: "37.684638",
        gtfs_longitude: "-122.466233",
        address: "365 D Street",
        city: "Colma",
        county: "sanmateo",
        state: "CA",
        zipcode: "94014"
      },
      {
        name: "Concord",
        abbr: "CONC",
        gtfs_latitude: "37.973737",
        gtfs_longitude: "-122.029095",
        address: "1451 Oakland Avenue",
        city: "Concord",
        county: "contracosta",
        state: "CA",
        zipcode: "94520"
      },
      {
        name: "Daly City",
        abbr: "DALY",
        gtfs_latitude: "37.706121",
        gtfs_longitude: "-122.469081",
        address: "500 John Daly Blvd.",
        city: "Daly City",
        county: "sanmateo",
        state: "CA",
        zipcode: "94014"
      },
      {
        name: "Downtown Berkeley",
        abbr: "DBRK",
        gtfs_latitude: "37.870104",
        gtfs_longitude: "-122.268133",
        address: "2160 Shattuck Avenue",
        city: "Berkeley",
        county: "alameda",
        state: "CA",
        zipcode: "94704"
      },
      {
        name: "Dublin/Pleasanton",
        abbr: "DUBL",
        gtfs_latitude: "37.701687",
        gtfs_longitude: "-121.899179",
        address: "5801 Owens Dr.",
        city: "Pleasanton",
        county: "alameda",
        state: "CA",
        zipcode: "94588"
      },
      {
        name: "El Cerrito del Norte",
        abbr: "DELN",
        gtfs_latitude: "37.925086",
        gtfs_longitude: "-122.316794",
        address: "6400 Cutting Blvd.",
        city: "El Cerrito",
        county: "contracosta",
        state: "CA",
        zipcode: "94530"
      },
      {
        name: "El Cerrito Plaza",
        abbr: "PLZA",
        gtfs_latitude: "37.902632",
        gtfs_longitude: "-122.298904",
        address: "6699 Fairmount Avenue",
        city: "El Cerrito",
        county: "contracosta",
        state: "CA",
        zipcode: "94530"
      },
      {
        name: "Embarcadero",
        abbr: "EMBR",
        gtfs_latitude: "37.792874",
        gtfs_longitude: "-122.397020",
        address: "298 Market Street",
        city: "San Francisco",
        county: "sanfrancisco",
        state: "CA",
        zipcode: "94111"
      },
      {
        name: "Fremont",
        abbr: "FRMT",
        gtfs_latitude: "37.557465",
        gtfs_longitude: "-121.976608",
        address: "2000 BART Way",
        city: "Fremont",
        county: "alameda",
        state: "CA",
        zipcode: "94536"
      },
      {
        name: "Fruitvale",
        abbr: "FTVL",
        gtfs_latitude: "37.774836",
        gtfs_longitude: "-122.224175",
        address: "3401 East 12th Street",
        city: "Oakland",
        county: "alameda",
        state: "CA",
        zipcode: "94601"
      },
      {
        name: "Glen Park",
        abbr: "GLEN",
        gtfs_latitude: "37.733064",
        gtfs_longitude: "-122.433817",
        address: "2901 Diamond Street",
        city: "San Francisco",
        county: "sanfrancisco",
        state: "CA",
        zipcode: "94131"
      },
      {
        name: "Hayward",
        abbr: "HAYW",
        gtfs_latitude: "37.669723",
        gtfs_longitude: "-122.087018",
        address: "699 'B' Street",
        city: "Hayward",
        county: "alameda",
        state: "CA",
        zipcode: "94541"
      },
      {
        name: "Lafayette",
        abbr: "LAFY",
        gtfs_latitude: "37.893176",
        gtfs_longitude: "-122.124630",
        address: "3601 Deer Hill Road",
        city: "Lafayette",
        county: "contracosta",
        state: "CA",
        zipcode: "94549"
      },
      {
        name: "Lake Merritt",
        abbr: "LAKE",
        gtfs_latitude: "37.797027",
        gtfs_longitude: "-122.265180",
        address: "800 Madison Street",
        city: "Oakland",
        county: "alameda",
        state: "CA",
        zipcode: "94607"
      },
      {
        name: "MacArthur",
        abbr: "MCAR",
        gtfs_latitude: "37.829065",
        gtfs_longitude: "-122.267040",
        address: "555 40th Street",
        city: "Oakland",
        county: "alameda",
        state: "CA",
        zipcode: "94609"
      },
      {
        name: "Millbrae",
        abbr: "MLBR",
        gtfs_latitude: "37.600271",
        gtfs_longitude: "-122.386702",
        address: "200 North Rollins Road",
        city: "Millbrae",
        county: "sanmateo",
        state: "CA",
        zipcode: "94030"
      },
      {
        name: "Montgomery St.",
        abbr: "MONT",
        gtfs_latitude: "37.789405",
        gtfs_longitude: "-122.401066",
        address: "598 Market Street",
        city: "San Francisco",
        county: "sanfrancisco",
        state: "CA",
        zipcode: "94104"
      },
      {
        name: "North Berkeley",
        abbr: "NBRK",
        gtfs_latitude: "37.873967",
        gtfs_longitude: "-122.283440",
        address: "1750 Sacramento Street",
        city: "Berkeley",
        county: "alameda",
        state: "CA",
        zipcode: "94702"
      },
      {
        name: "North Concord/Martinez",
        abbr: "NCON",
        gtfs_latitude: "38.003193",
        gtfs_longitude: "-122.024653",
        address: "3700 Port Chicago Highway",
        city: "Concord",
        county: "contracosta",
        state: "CA",
        zipcode: "94520"
      },
      {
        name: "Oakland International Airport",
        abbr: "OAKL",
        gtfs_latitude: "37.713238",
        gtfs_longitude: "-122.212191",
        address: "4 Airport Drive",
        city: "Oakland",
        county: "alameda",
        state: "CA",
        zipcode: "94621"
      },
      {
        name: "Orinda",
        abbr: "ORIN",
        gtfs_latitude: "37.878361",
        gtfs_longitude: "-122.183791",
        address: "11 Camino Pablo",
        city: "Orinda",
        county: "contracosta",
        state: "CA",
        zipcode: "94563"
      },
      {
        name: "Pittsburg/Bay Point",
        abbr: "PITT",
        gtfs_latitude: "38.018914",
        gtfs_longitude: "-121.945154",
        address: "1700 West Leland Road",
        city: "Pittsburg",
        county: "contracosta",
        state: "CA",
        zipcode: "94565"
      },
      {
        name: "Pittsburg Center",
        abbr: "PCTR",
        gtfs_latitude: "38.016941",
        gtfs_longitude: "-121.889457",
        address: "2099 Railroad Avenue",
        city: "Pittsburg",
        county: "Contra Costa",
        state: "CA",
        zipcode: "94565"
      },
      {
        name: "Pleasant Hill/Contra Costa Centre",
        abbr: "PHIL",
        gtfs_latitude: "37.928468",
        gtfs_longitude: "-122.056012",
        address: "1365 Treat Blvd.",
        city: "Walnut Creek",
        county: "contracosta",
        state: "CA",
        zipcode: "94597"
      },
      {
        name: "Powell St.",
        abbr: "POWL",
        gtfs_latitude: "37.784471",
        gtfs_longitude: "-122.407974",
        address: "899 Market Street",
        city: "San Francisco",
        county: "sanfrancisco",
        state: "CA",
        zipcode: "94102"
      },
      {
        name: "Richmond",
        abbr: "RICH",
        gtfs_latitude: "37.936853",
        gtfs_longitude: "-122.353099",
        address: "1700 Nevin Avenue",
        city: "Richmond",
        county: "contracosta",
        state: "CA",
        zipcode: "94801"
      },
      {
        name: "Rockridge",
        abbr: "ROCK",
        gtfs_latitude: "37.844702",
        gtfs_longitude: "-122.251371",
        address: "5660 College Avenue",
        city: "Oakland",
        county: "alameda",
        state: "CA",
        zipcode: "94618"
      },
      {
        name: "San Bruno",
        abbr: "SBRN",
        gtfs_latitude: "37.637761",
        gtfs_longitude: "-122.416287",
        address: "1151 Huntington Avenue",
        city: "San Bruno",
        county: "sanmateo",
        state: "CA",
        zipcode: "94066"
      },
      {
        name: "San Francisco International Airport",
        abbr: "SFIA",
        gtfs_latitude: "37.615966",
        gtfs_longitude: "-122.392409",
        address: "International Terminal, Level 3",
        city: "San Francisco Int'l Airport",
        county: "sanmateo",
        state: "CA",
        zipcode: "94128"
      },
      {
        name: "San Leandro",
        abbr: "SANL",
        gtfs_latitude: "37.721947",
        gtfs_longitude: "-122.160844",
        address: "1401 San Leandro Blvd.",
        city: "San Leandro",
        county: "alameda",
        state: "CA",
        zipcode: "94577"
      },
      {
        name: "South Hayward",
        abbr: "SHAY",
        gtfs_latitude: "37.634375",
        gtfs_longitude: "-122.057189",
        address: "28601 Dixon Street",
        city: "Hayward",
        county: "alameda",
        state: "CA",
        zipcode: "94544"
      },
      {
        name: "South San Francisco",
        abbr: "SSAN",
        gtfs_latitude: "37.664245",
        gtfs_longitude: "-122.443960",
        address: "1333 Mission Road",
        city: "South San Francisco",
        county: "sanmateo",
        state: "CA",
        zipcode: "94080"
      },
      {
        name: "Union City",
        abbr: "UCTY",
        gtfs_latitude: "37.590630",
        gtfs_longitude: "-122.017388",
        address: "10 Union Square",
        city: "Union City",
        county: "alameda",
        state: "CA",
        zipcode: "94587"
      },
      {
        name: "Walnut Creek",
        abbr: "WCRK",
        gtfs_latitude: "37.905522",
        gtfs_longitude: "-122.067527",
        address: "200 Ygnacio Valley Road",
        city: "Walnut Creek",
        county: "contracosta",
        state: "CA",
        zipcode: "94596"
      },
      {
        name: "Warm Springs/South Fremont",
        abbr: "WARM",
        gtfs_latitude: "37.502171",
        gtfs_longitude: "-121.939313",
        address: "45193 Warm Springs Blvd",
        city: "Fremont",
        county: "alameda",
        state: "CA",
        zipcode: "94539"
      },
      {
        name: "West Dublin/Pleasanton",
        abbr: "WDUB",
        gtfs_latitude: "37.699756",
        gtfs_longitude: "-121.928240",
        address: "6501 Golden Gate Drive",
        city: "Dublin",
        county: "alameda",
        state: "CA",
        zipcode: "94568"
      },
      {
        name: "West Oakland",
        abbr: "WOAK",
        gtfs_latitude: "37.804872",
        gtfs_longitude: "-122.295140",
        address: "1451 7th Street",
        city: "Oakland",
        county: "alameda",
        state: "CA",
        zipcode: "94607"
      }
  ],

  // checks whether the data can be refreshed
  isDataExamined: false,

  // Active listeners
  divCreationDiv: "",

  // css colors changed:
  colors: {
    RED: "#BE1B1B",
    BLUE: "#1B4299",
    YELLOW: "#DABE22",
    GREEN: "#1C9F14",
    PURPLE: "#A2127D"
  },

  // initiatilize the body of the app
  initialize: function() {


    this.headerdiv = document.createElement("div");
    this.headerdiv.id = "headerdiv";
    document.getElementById("appwindow").append(this.headerdiv);


    // create the locationdiv where the current location is identified
    this.locationdiv = document.createElement("select");
    this.locationdiv.id = "locationdiv";
    this.locationdiv.classList.add("form-control")
    this.headerdiv.append(this.locationdiv);

    for(var i = 0; i < this.stations.length; i++) {
      var option = document.createElement("option");
      option.innerText = this.stations[i].name;
      option.id = "station" + this.stations[i].abbr;
      this.locationdiv.append(option);
    }

    // create the traindiv where all train data is going into
    this.traindiv = document.createElement("div");
    this.traindiv.id = "traindiv";
    document.getElementById("appwindow").append(this.traindiv);
  },

  // convert the colors provided by the API call into valid colors
  colorconvert: function(color) {
    return app.colors[color];
  },

  // AJAX pull of the data. Currently uses a public key.
  realtimePull: function(station) {
    $.ajax({
      url:
        "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" +
        station +
        "&key=MW9S-E7SL-26DU-VV8V&json=y",
      method: "GET"
    }).then(
      function(response) {
        // Clear all the data!
        app.divClear();
        console.log(response);
        app.data = response;
        app.trains = app.data.root.station[0].etd;
        app.divCreation(app.trains);
      },
      function(response) {
        // This section looks to see if the AJAX call failed and then indicates that real times could not be loaded.
        // Ideally, this would pull data from stored tables when there is no internet connetion.
        var parentdiv = document.createElement("div");
        parentdiv.innerText =
          "Real times could not be loaded. Please check your internet connection.";
        app.traindiv.append(parentdiv);
      }
    );
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
        "background-color: " + app.colorconvert(data.estimate[0].color)
      );

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
        "Number of Trains: " +
        data.estimate[0].length +
        "<br>" +
        "Delay from scheduled time: " +
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

      // Append the traindiv into the correct platform

      app.traindiv.append(parentdiv);
      // End of for loop
    }

    // Add listener events
    // Listener for the div to expand and show the expandable div
    this.divCreationDiv = document.getElementsByClassName("parentdiv");
    for (l = 0; l < app.divCreationDiv.length; l++) {
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
          for (k = 0; k < app.divCreationDiv.length; k++) {
            app.divCreationDiv[k].classList.remove("expanded");
            var child = app.divCreationDiv[k];
            setTimeout(function() {
              child.childNodes[3].classList.remove("expanddivdisplay");
              child.childNodes[4].classList.remove("expanddivdisplay");
            }, 110);
          }
          this.classList.add("expanded");
          var that = this;
          setTimeout(function() {
            that.childNodes[3].classList.add("expanddivdisplay");
            that.childNodes[4].classList.add("expanddivdisplay");
          }, 110);
        }
      };
    }
  },
  // When start the function, certain things happen
  start: function() {
    // initialize the body of the app
    this.initialize();

    // tests for location request
    this.locationRequest();


    this.refresh = setInterval(app.realtimePull(app.location), 30000);

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
      app.closestStationFinder();
    }, function() {
        app.closestStationFinder();
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

    this.realtimePull(this.location);
  }
};

app.start();