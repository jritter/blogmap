import React from 'react';
import L from 'leaflet';
import $ from 'jquery';

import './Map.css';
import logo from './logo.svg';
import 'leaflet/dist/leaflet.css';

import Flag from "react-flags";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import { renderToString } from 'react-dom/server'


class Map extends React.Component {

  componentDidMount() {
    var map = L.map('map').setView([51.505, -0.09], 5);
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
    }).addTo(map);
    
    var myIcon = L.divIcon({className: 'map-marker', html: renderToString(<FontAwesomeIcon icon={faCircle} />)});

    $.getJSON('/places_i_wanna_go.geojson', function(data){
      L.geoJSON(data, { pointToLayer: function (feature,latLng) {
        return L.marker(latLng,{icon: myIcon})
      }}).addTo(map);
    });
  }

  render () {
    return (
          <div><Flag
          name="CN"
          format="png"
          pngSize="64"
          alt="Canada Flag"
          basePath=""
        />
          <img src={logo} className="App-logo" alt="logo" />
          <div id="map">
          </div>
          </div>
    );
  }
}

export default Map;