/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here, mostly so linting won't get triggered
// and its a good queue of what is available:
// /* global _ */

// Dependencies
import utils from './shared/utils.js';

// Mark page with note about development or staging
utils.environmentNoting();


// Auto enable Pym for embedding.  This will enable a Pym Child if
// the url contains ?pym=true
utils.autoEnablePym();


// Adding dependencies
// ---------------------------------
// Import local ES6 or CommonJS modules like this:
// import utilsFn from './shared/utils.js';
//
// Or import libraries installed with npm like this:
// import module from 'module';

// Adding Svelte templates in the client
// ---------------------------------
// We can bring in the same Svelte templates that we use
// to render the HTML into the client for interactivity.  The key
// part is that we need to have similar data.
//
// First, import the template.  This is the main one, and will
// include any other templates used in the project.
// import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  There are two ways to do this.
// If you are using the buildData function to get data, then ?
//
// 1. For smaller datasets, just import them like other files.
// import content from '../assets/data/content.json';
//
// 2. For larger data points, utilize window.fetch.
// let content = await (await window.fetch('../assets/data/content.json')).json();
//
// Once you have your data, use it like a Svelte component:
//
// const app = new Content({
//   target: document.querySelector('.article-lcd-body-content'),
//   data: {
//     content
//   }
// });

import * as d3 from 'd3';
// import * as mapboxgl from 'mapbox-gl';

import Chart from './chart.js';
import ageChart from './age.js';

const chart1 = new Chart('#chart');
const chart2 = new ageChart('#chartAgeB');
const chart3 = new ageChart('#chartAgeW');

chart1.render();
chart2.render();
chart3.render();

//chart selection parameters
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) { return results[1] || 0; }
    else { return null; }
  }
  
  var selected = $.urlParam('chart');
  
  if (selected != null){
    $(".slide").hide();
    $("#" + selected).show();
  }
  if (selected == "all"){
    $(".slide").show();
  }

      mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA';
    
      var map = new mapboxgl.Map({
          container: 'map', // container id
          style: 'mapbox://styles/shadowflare/ciqzo0bu20004bknkbrhrm6wf',
          center: [-93.264313, 44.973269], 
          zoom: 11,
          minZoom: 10,
          hash: false
      });
      
      map.addControl(new mapboxgl.NavigationControl());
      map.scrollZoom.disable();
      map.doubleClickZoom.disable();
      
      map.on('load', function() {

       map.addSource('nb', {
         type: 'geojson',
         data: './shapefiles/minneapolis_nb.json'
       });
      
        map.addLayer({
             'id': 'nb-layer',
             'interactive': true,
             'source': 'nb',
             'layout': {},
             'type': 'fill',
                  'paint': {
                 'fill-antialias' : true,
                 'fill-opacity': 0.7,
                 'fill-color': {
                  "property": "maindata_rate",
                  "stops": [
                    [0, "#dddddd"],
                    [1, "#fee0d2"],
                    [4, "#fcbba1"],
                    [6, "#fc9272"],
                    [8, "#fb6a4a"],
                    [10, "#ef3b2c"],
                    [20, "#cb181d"],
                    [30, "#99000d"]
                 ]
              },
                 'fill-outline-color': 'rgba(255, 255, 255, 1)'
           }
         }, 'road-street');
      
       map.addSource('shootings', {
         type: 'geojson',
         data: './shapefiles/incidents.json'
       });
      
               map.addLayer({
                        "id": "shootings-layer-1",
                        "type": "circle",
                        "source": "shootings",
                        "paint": {
                           "circle-radius": 1.4,
                           "circle-color": '#3580A3',
                           "circle-opacity": 0.3
                        },
                        "filter": ["==", "AgeGroup", "16_24"]
              }, 'place-neighbourhood');
  
              map.addLayer({
                "id": "shootings-layer-2",
                "type": "circle",
                "source": "shootings",
                "paint": {
                   "circle-radius": 1.4,
                   "circle-color": '#A7E6E3',
                   "circle-opacity": 0.3
                },
                "filter": ["==", "AgeGroup", "25_34"]
              }, 'place-neighbourhood');

      // var popup = new mapboxgl.Popup({
      //     closeButton: false,
      //     closeOnClick: false
      // });
      
      // map.on('mousemove', function(e) {
      //     var features = map.queryRenderedFeatures(e.point, { layers: ['shootings-layer','shootings-layer2'] });
      //     // Change the cursor style as a UI indicator.
      //     map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      
      //     if (!features.length) {
      //         popup.remove();
      //         return;
      //     }
      
      //     var feature = features[0];
      
      //     // Populate the popup and set its coordinates
      //     // based on the feature found.
      //     popup.setLngLat(e.lngLat)
      //         .setHTML("<div>" + feature.properties.FirstName + " " + feature.properties.LastName + "</div><div>died in " + feature.properties.year + "</div><div>" + feature.properties.WeaponCategory + "</div>")
      //         .addTo(map);
      // });
      
      });
  
      $(document).ready(function() {
        if ($("#wrapper").width() < 600) {
            map.flyTo({
              center: [-93.264313, 44.973269], 
              zoom: 10,
              minZoom: 9
            });
        } else {
            map.flyTo({
              center: [-93.264313, 44.973269], 
              zoom: 11,
              minZoom: 10
            });
        }
        $(window).resize(function() {
            if ($("#wrapper").width() < 600) {
                map.flyTo({
                  center: [-93.264313, 44.973269], 
                  zoom: 10,
                  minZoom: 9
                });
            } else {
                map.flyTo({
                  center: [-93.264313, 44.973269], 
                  zoom: 11,
                  minZoom: 10
                });
            }
        });
    });