var eartquake_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';
var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

d3.json(eartquake_url, function(data){
    createFeatures(data.features);
});

function createFeatures(eartquake_data) {
    var eartquake = L.geoJSON(eartquake_data, {
        onEachFeature: function(features, layer){
            layer.binfPopup("<h3>" + features.properties.mag + "</h3>" 
            "<h3>" + features.properties.place + "</h3><hr><p>" + new Date(feature.properties.time)+ "</p>");
        },
        pointToLayer: function (feature, latlng) {
            return new L.circle(latlng,
              {radius: getRadius(feature.properties.mag),
              fillColor: getColor(feature.properties.mag),
              fillOpacity: .6,
              color: "#000",
              stroke: true,
              weight: .8
          })
        }
    });
    createMap(eartquake);
}

function createMap(earthquake){
      // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");
    var gray = L.tileLayer("https://api.mapbox.com/styles/v1/abdullah1982/cjfla3gwz05m52so2en7hf6al/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJkdWxsYWgxOTgyIiwiYSI6ImNqZXZvcW02bDBsOXIzNW43NjF4Y3U3N3AifQ.ERPS9G84Dkk0buz91kG3FA");
  
    // defining the base maps layers and pass in other layers 
    var baseMaps = {
      "Satellite Street": streetmap,
      "Dark Map": darkmap,
      "Gray Scale": gray
    };
    var overlayMaps = {
        Earthquakes: earthquake
    };

    var myMap = L.map("map", {
        center:[
            37.09, 95.71
        ],
        zoom: 2.5,
        layers: [streetmap, earthquake]
        
    });

//     // tectonic plates layer
//     var tectonicPlates = new L.LayerGroup();

//     var overlayMaps = {
//       "Earthquakes": earthquake,
//       "Tectonic Plates": tectonicPlates
//     };

//     // setting the center of the map and zoom
//     var myMap = L.map("map", {
//       center: [
//         21.3891, 39.8579],
//       zoom: 2.25,
//       layers: [streetmap, earthquake, tectonicPlates]
//     }); 

//     // fault lines data, geoJSON data, style information
//     d3.json(tectonicPlatesURL, function(plateData) {
//       L.geoJson(plateData, {
//         color: "yellow",
//         weight: 2
//       })
//       .addTo(tectonicPlates);
//   });

  
    // control layer
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
}