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
import RateChart from './rates.js';

const chart1 = new Chart('#chart');
const chart2 = new ageChart('#chartAgeB');
const chart3 = new ageChart('#chartAgeW');
const chart4 = new RateChart('#arrestChart');

chart1.render();
chart2.render();
chart3.render();
chart4.render();

//chart selection parameters
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    } else {
        return null;
    }
}

var selected = $.urlParam('chart');

if (selected != null) {
    $(".slide").hide();
    $("#" + selected).show();
}
if (selected == "all") {
    $(".slide").show();
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA';

var dzoom = 10.5;
var mzoom = 10.5;

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/shadowflare/ciqzo0bu20004bknkbrhrm6wf',
    center: [-93.264313, 44.973269],
    zoom: dzoom,
    minZoom: mzoom
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();
map.doubleClickZoom.disable();

            //CREATE A BOUNDING BOX AROUND POINTS (ALSO USE FOR HEX GRID)
            var enveloped = turf.envelope(removed); //send point geojson to turf, creates an 'envelope' (bounding box) around points
            var result = { //put the resulting envelope in a geojson format FeatureCollection
                "type": "FeatureCollection",
                "features": [enveloped] //don't forget brackets
            };

        //CREATE A HEX GRID
        //must be in order: minX, minY, maxX, maxY ... you have to pick these out from your envelope that you created previously
        var bbox = [-93.00432, 44.992016, -93.207787, 44.887399];
        var hexgridUnits = 'miles'; //units that will determine the width of the hex grid
        var cellWidth = 0.9; //in the units you defined above
        var hexgrid = turf.hexGrid(bbox, cellWidth, hexgridUnits); //makes the new geojson hexgrid features

        //COUNT THE NUMBER OF TREES IN EACH HEX BIN
        var hexRemoved = turf.count(hexgrid, removed, 'removedCount');
        var hexPlanted = turf.count(hexgrid, planted, 'plantedCount');
        var hexDIFF = turf.count(hexgrid, plantedAll, 'plantedAllCount');

                //create jenks natural breaks - generates min, breaks, max ... remember for 5 categories, we only need 4 numbers
                var numberBreaks = 10
                var jenksbreaks = turf.jenks(hexRemoved, 'removedCount', numberBreaks);
                var colors = ['#F2AC93', '#F2AC93', '#F2AC93', '#F28670', '#F28670', '#F2614C', '#F2614C', '#C22A22', '#C22A22', '#9C0004']
                var transparency = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]

                jenksbreaks.forEach(function(element, i) {

                    if (i > 0) {
                        jenksbreaks[i] = [element, colors[i - 1], transparency[i - 1]];
                    } else {
                        jenksbreaks[i] = [element, null];
                    }
                });

                var binaryBreaks = [-1,0,1];


                
map.on('load', function() {

    jenksbreaks.forEach(function(jenksbreak, i) {
        if (i > 0) {
            var filters = ['all', ['<=', 'removedCount', jenksbreak[0]]];
            if (i > 1) {
                filters.push(['>', 'removedCount', jenksbreaks[i - 1][0]]);
                map.setFilter('removedHexGrid-' + (i - 1), filters);
            };

        };
    });

     map.addSource("removed", {
        type: "geojson",
        data: removed
    });
                //HEXGRIDS
                map.addSource('removedHexGrid', {
                    "type": "geojson",
                    "data": hexRemoved //this is the hexgrid we just created!
                });
                for (var i = 0; i < jenksbreaks.length; i++) {
                    if (i > 0) {
                        map.addLayer({
                            "id": "removedHexGrid-" + (i - 1),
                            "type": "fill",
                            "source": "removedHexGrid",
                            "layout": {},
                            "paint": {
                                'fill-color': jenksbreaks[i][1],
                                'fill-opacity': jenksbreaks[i][2],
                            }
                        }, "road-label-medium");
                    };
                };



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
            'fill-antialias': true,
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

    map.addSource('incidents', {
        type: 'geojson',
        data: './shapefiles/incidents.json'
    });

    map.addLayer({
        "id": "incidents-layer-1",
        "type": "circle",
        "source": "incidents",
        "paint": {
            "circle-radius": 1.4,
            "circle-color": '#3580A3',
            "circle-opacity": 1
        },
        "filter": ["==", "AgeGroup", "16_24"]
    }, 'place-neighbourhood');

    map.addLayer({
        "id": "incidents-layer-2",
        "type": "circle",
        "source": "incidents",
        "paint": {
            "circle-radius": 1.4,
            "circle-color": '#A7E6E3',
            "circle-opacity": 1
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
            zoom: mzoom,
        });
    } else {
        map.flyTo({
            center: [-93.264313, 44.973269],
            zoom: dzoom,
        });
    }
    $(window).resize(function() {
        if ($("#wrapper").width() < 600) {
            map.flyTo({
                center: [-93.264313, 44.973269],
                zoom: mzoom,
            });
        } else {
            map.flyTo({
                center: [-93.264313, 44.973269],
                zoom: dzoom,
            });
        }
    });
});