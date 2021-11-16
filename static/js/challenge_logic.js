// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [42.65, -75.7],
	zoom: 6,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark
};

// 1. Add a 2nd layer group for the covid data.

let completedVaccines = new L.LayerGroup();
let initiatedVaccines = new L.LayerGroup();
let deaths = new L.LayerGroup();
// let distributedVaccines = new L.LayerGroup();

// 2. Add a reference to the covid data group to the overlays object.
let overlays = {
  "Completed Vaccines": completedVaccines,
  "Initiated Vaccines": initiatedVaccines,
  // "Distributed Vaccines": distributedVaccines,
  "Deaths": deaths
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);


  d3.json("https://raw.githubusercontent.com/Anoobis5/COVID_GeoJSON_FinalProject/wallaceportia--DV/site/static/js/data/nycounties.geojson").then(function(data) 
  {
    

    function getColor(deaths) {
      ratio = deaths;
      if (deaths > 9000) {
        return "#FD5E53";
      }
      if (deaths > 5000) {
        return "#f2606a";
      }
      if (deaths > 3000) {
        return "#e66380";
      }
      if (deaths > 1000) {
        return "#db6597";
      }
      if (deaths > 500) {
        return "#cf68ad";
      }
      return "#C46AC4";
    };


    function styleInfo(feature) {
      let fips = feature.properties.id;
      //let population = feature.properties.pop;
      let deaths = c_data[fips].deaths;
      return {
        opacity: 1,
        fillOpacity: 0.60,
        fillColor: getColor(deaths),
        color: "#000000",
        stroke: true,
        weight: 0.5
      };
    };
    L.geoJson(data, {
        
      style: styleInfo,
      
      onEachFeature: function(feature, layer) {
        //layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        let fips = feature.properties.id;
        let deaths = c_data[fips].deaths;
        layer.bindPopup("County: " + feature.properties.county +
                        "<br>Deaths: " + deaths +
                        
                        "<br>");
        console.log(feature.properties);
        

      }

      
    }).addTo(deaths);
  

    deaths.addTo(map);
  });


  //For each layer, do from here ------------->

  d3.json("https://raw.githubusercontent.com/Anoobis5/COVID_GeoJSON_FinalProject/wallaceportia--DV/site/static/js/data/nycounties.geojson").then(function(data) {
    // let styleInfo = {
    //   color: "blue",
    //   weight: 1
    // };
    console.log(data)
    function getColor(completed_ratio) {
      if (completed_ratio > 0.72) {
        return "#f4f4fb";
      }
      if (completed_ratio > 0.65) {
        return "#cfcdff";
      }
      if (completed_ratio > 0.58) {
        return "#ada5ff";
      }
      if (completed_ratio > 0.51) {
        return "#8d7dff";
      }
      if (completed_ratio > 0.44) {
        return "#6d51fb";
      }
      return "#4d12f2";
    };


    function styleInfo(feature) {
      let fips = feature.properties.id;
      
      let completed_ratio = c_data[fips].completed_ratio;
      return {
        opacity: 1,
        fillOpacity: 0.5,
        fillColor: getColor(completed_ratio),
        color: "#000000",
        stroke: true,
        weight: 0.5
      };
    };
    L.geoJson(data, {
        // We turn each feature into a circleMarker on the map.
        
        // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
      //  after the marker has been created and styled.
      onEachFeature: function(feature, layer) {
        //layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        let fips = feature.properties.id;
        let completedVaccines = c_data[fips].completed;
        let completed_ratio = c_data[fips].completed_ratio;
        // console.log('completedVaccines' + fips)
        // console.log(completedVaccines)
        // console.log(completed_ratio)
        let popup_html = "County: " + feature.properties.county +
          "<br>Completed Vaccines: " + completedVaccines +
          "<br>Ratio: " + completed_ratio + 
          "<br>";
        console.log(popup_html);
        layer.bindPopup(popup_html);
        console.log(feature.properties);
        

      }

      
    }).addTo(completedVaccines);

    completedVaccines.addTo(map);

  });

  // <---- TO here
  d3.json("https://raw.githubusercontent.com/Anoobis5/COVID_GeoJSON_FinalProject/wallaceportia--DV/site/static/js/data/nycounties.geojson").then(function(data) {
    // 

    function getColor(initiated_ratio) {
      ratio = initiated_ratio;
      if (ratio > 0.78) {
        return "#ea2c2c";
      }
      if (ratio > 0.69) {
        return "#ea822c";
      }
      if (ratio > 0.60) {
        return "#ee9c00";
      }
      if (ratio > 0.51) {
        return "#eecc00";
      }
      if (ratio > 0.42) {
        return "#d4ee00";
      }
      return "#98ee00";
    };


    function styleInfo(feature) {
      let fips = feature.properties.id;
      let population = feature.properties.pop;
      let initiated_ratio = c_data[fips].initiated_ratio;
      return {
        opacity: 1,
        fillOpacity: 0.5,
        fillColor: getColor(initiated_ratio),
        color: "#000000",
        stroke: true,
        weight: 0.5
      };
    };
    L.geoJson(data, {
        // We turn each feature into a circleMarker on the map.
        
        // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
      //  after the marker has been created and styled.
      onEachFeature: function(feature, layer) {
        //layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        let fips = feature.properties.id;
        let initiatedVaccines = c_data[fips].initiated;
        let initiated_ratio = c_data[fips].initiated_ratio;
        layer.bindPopup("County: " + feature.properties.county +
                        "<br>Initiated Vaccine: " + initiatedVaccines +
                        "<br>Ratio: " + initiated_ratio + 
                        "<br>");
        console.log(feature.properties);
        

      }

      
    }).addTo(initiatedVaccines);

    initiatedVaccines.addTo(map);

  });

  // d3.json("https://raw.githubusercontent.com/Anoobis5/COVID_GeoJSON_FinalProject/wallaceportia--DV/site/static/js/data/nycounties.geojson").then(function(data) {
  //   // 

  //   function getColor(initiatedVaccines) {
  //     ratio = completed_ratio;
  //     if (ratio > 0.75) {
  //       return "#f4f4fb";
  //     }
  //     if (ratio > 0.70) {
  //       return "#cfcdff";
  //     }
  //     if (ratio > 0.65) {
  //       return "#ada5ff";
  //     }
  //     if (ratio > 0.50) {
  //       return "#8d7dff";
  //     }
  //     if (ratio > 0.45) {
  //       return "#6d51fb";
  //     }
  //     return "#4d12f2";
  //   };


  //   function styleInfo(feature) {
  //     let fips = feature.properties.id;
  //     let population = feature.properties.pop;
  //     let completedVaccines = c_data[fips].completed_ratio;
  //     return {
  //       opacity: 1,
  //       fillOpacity: 0.5,
  //       fillColor: getColor(initiatedVaccines),
  //       color: "#000000",
  //       stroke: true,
  //       weight: 0.5
  //     };
  //   };
  //   L.geoJson(data, {
        
      
  //     onEachFeature: function(feature, layer) {
        
  //       let fips = feature.properties.id;
  //       let initiatedVaccines = c_data[fips].initiatedVaccines;
  //       layer.bindPopup("306County: " + feature.properties.county +
  //                       "<br>Initiated Vaccines: " + initiatedVaccines +
  //                       "<br>Ratio: " + initiatedVaccines / feature.properties.pop + 
  //                       "<br>");
  //       console.log(feature.properties);
        

  //     }

      
  //   }).addTo(initiatedVaccines);

  //   initiatedVaccines.addTo(map);

  // });