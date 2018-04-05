var eartquake_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';
var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

d3.json(eartquake_url, function(data){
    createFeatures(data.features);
});

function createFeatures(eartquake_data) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.mag +
          "</h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }
    var eartquake = L.geoJSON(eartquake_data, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng){
            return new L.circle(latlng,
            {fillColor: "red",
            wight: 0.1,
            fillOpacity: 0.8,
            color: "black"
        })
        }
        });
        // pointToLayer: function (feature, latlng) {
    //         return new L.circle(latlng,
    //           {radius: 8,
    //           fillColor: ,
    //           fillOpacity: .6,
    //           color: "#000",
    //           stroke: true,
    //           weight: .8
    //       })
    //     }
    // });
    createMap(eartquake);
}



function createMap(earthquake){
      // Define streetmap and darkmap layers
    // var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRpbm9sZmlhbGxlZ3JhIiwiYSI6ImNqZXZvcHU5YTBsNzUydnBzOTRtZm43Y20ifQ.13CyjP5TsBxoBDhfNFGCuQ");
    // var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRpbm9sZmlhbGxlZ3JhIiwiYSI6ImNqZXZvcHU5YTBsNzUydnBzOTRtZm43Y20ifQ.13CyjP5TsBxoBDhfNFGCuQ");
    // var gray = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRpbm9sZmlhbGxlZ3JhIiwiYSI6ImNqZXZvcHU5YTBsNzUydnBzOTRtZm43Y20ifQ.13CyjP5TsBxoBDhfNFGCuQ");
    var satelliteStreet = L.tileLayer("https://api.mapbox.com/styles/v1/abdullah1982/cjfkmkifh61fv2spbe9vt63b5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJkdWxsYWgxOTgyIiwiYSI6ImNqZXZvcW02bDBsOXIzNW43NjF4Y3U3N3AifQ.ERPS9G84Dkk0buz91kG3FA");

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/abdullah1982/cjfkmpd9s04ck2rn4qtpb0cah/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJkdWxsYWgxOTgyIiwiYSI6ImNqZXZvcW02bDBsOXIzNW43NjF4Y3U3N3AifQ.ERPS9G84Dkk0buz91kG3FA");

    var gray = L.tileLayer("https://api.mapbox.com/styles/v1/abdullah1982/cjfla3gwz05m52so2en7hf6al/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJkdWxsYWgxOTgyIiwiYSI6ImNqZXZvcW02bDBsOXIzNW43NjF4Y3U3N3AifQ.ERPS9G84Dkk0buz91kG3FA");
  
    // defining the base maps layers and pass in other layers 
    var baseMaps = {
      "Satellite Street": satelliteStreet,
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
        layers: [satelliteStreet, earthquake]
        
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