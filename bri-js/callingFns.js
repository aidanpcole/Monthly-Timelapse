/* global initializeMap, initializeDataTable */
/* 1. === Setting up Map === */
/* set up with zoom 5, may change, changed lat
and long from 34,0836417742618, -118.5298649280784 */
var bounds = new L.LatLngBounds(
    new L.LatLng(6.0152277, 58.6560663),
    new L.LatLng(35.8752762, 99.2332081));

let map = L.map('map', {zoomControl: false, center: bounds.getCenter(),maxBounds: bounds,maxBoundsViscosity: 1.0, maxZoom:9, minZoom:4 }).setView([20.94525, 78.9446], 3);
map.fitBounds(bounds);

const basemap = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
const attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.';
var WhiteCanvas = L.tileLayer(basemap, {
  attribution,
});

var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
    'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_DarkGreyCanvas = L.tileLayer(
    "http://{s}.sm.mapstack.stamen.com/" +
    "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
    "{z}/{x}/{y}.png",
    {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
        'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    }
);

let baseLayers = {
    "Satellite": Esri_WorldImagery,
    "Grey Canvas": Esri_DarkGreyCanvas,
    "White Canvas": WhiteCanvas
};


let layerControl = new L.control.layers(null, baseLayers, {position: 'bottomright',collapsed:false});
map.addLayer(WhiteCanvas);
map.addControl(layerControl);


sidebarContentController("story-slide");

L.control.browserPrint({position: 'bottomright'}).addTo(map);

let dataT = [];


var layer2010 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2010.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2010"
});

var layer2011 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2011.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2011"
});

var layer2012 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2012.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2012"
});

var layer2013 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2013.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2013"
});

var layer2014 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2014.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2014"
});

var layer2015 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2015.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2015"
});

var layer2016 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2016.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2016"
});

var layer2017 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2017.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2017"
});

var layer2018 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2018.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2018"
});

var layer2019 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/ReferenceData/PM25_2019.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2019"
});


layerGroup = L.layerGroup([layer2010,layer2011,layer2012,layer2013,layer2014,layer2015,layer2016,layer2017,layer2018,layer2019]);
var sliderControl = L.control.sliderControl({position: "topright", layer: layerGroup, timeAttribute: 'time', follow: 1, startTimeIdx: 0, timeStrLength: 4, alwaysShowDate: true});
map.addControl(sliderControl);
setInterval(function(){
            var current = $('#leaflet-slider').slider("value");
            var max = sliderControl.options.maxValue + 1;
            var step = ++current % max;
            $('#leaflet-slider').slider("value", step);
            sliderControl.slide(null, {value: step});
        }, 1000);
sliderControl.startSlider();
initializeMap();
L.Control.geocoder({position: 'topright', placeholder: 'Search for location...'}).addTo(map);
L.control.zoom({
  position: 'bottomright'
}).addTo(map);


map.setView([21.79, 78.43], 5);

const markerImage = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//L.MarkerClusterGroup instead of L.featureGroup
function addMarkers(url) { // THIS IS for pools, cooling centers and hosp
  let markersClust = new L.featureGroup();
  let iconuse;
  iconuse = markerImage;
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature(feature) {
          let popupContent = `<h4> ${feature.properties.Name} </h4>
        <p>India Rank: ${feature.properties.IRank} <br>
        World Rank: ${feature.properties.WRank} <br>
        PM 2.5 Concentration: ${feature.properties.Concentration} <br> </p>`;
          let marker = L.marker(
            [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
            { icon: iconuse }
          ).bindPopup(popupContent);
          markersClust.addLayer(marker);
        }
      });
      map.addLayer(markersClust);
    });
}


//addMarkers("https://raw.githubusercontent.com/aidanpcole/Raster-Timelapse/main/data/DataForMap/15mostpollutedcities.geojson");
