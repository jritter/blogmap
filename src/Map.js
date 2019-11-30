import React from "react";
import L from "leaflet";
import $ from "jquery";

import InfoPane from "./InfoPane";

import "./Map.css";
import "leaflet/dist/leaflet.css";

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCircle } from '@fortawesome/free-regular-svg-icons';

//import { renderToString } from 'react-dom/server'

class Map extends React.Component {
  constructor(props) {
    super(props);
    var blogmap = this;
    this.state = { posts: null, current: 1 };
    $.when(
      $.getJSON("/itinerario_desconocido_posts.json", function(data) {
        blogmap.setState({ posts: data });
      })
    ).then(function() {
      blogmap.moveToPost(1);
    });
  }

  componentDidMount() {
    var map = L.map("map").setView([51.505, -0.09], 5);
    L.tileLayer(
      "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: "abcd",
        minZoom: 0,
        maxZoom: 20,
        ext: "png"
      }
    ).addTo(map);
    
    const pulsemarkersvg = L.icon({
      iconUrl: '/marker-pulse.svg',
      iconSize: [80, 80],
    });

    const pulsemarker = L.marker([0, 0], {icon: pulsemarkersvg});
    pulsemarker.addTo(map);
    
    this.setState({ map: map, pulsemarker: pulsemarker});

    //var myIcon = L.divIcon({className: 'map-marker', html: renderToString(<FontAwesomeIcon icon={faCircle} />)});
  }

  next() {
    var num_posts = this.state.posts.length;
    var current = this.state.current;
    this.moveToPost(mod(current - 1, num_posts));
  }

  prev() {
    var num_posts = this.state.posts.length;
    var current = this.state.current;
    this.moveToPost(mod(current + 1, num_posts));
  }

  moveToPost(i) {
    const coords = this.state.posts[i].location;
    var blogmap = this;

    if (coords !== "") {
      $.getJSON("/ne/countries/" + this.state.posts[i].country_code + ".json", function(data) {
        
        if (blogmap.state.countrylayer != null){
          blogmap.state.map.removeLayer(blogmap.state.countrylayer);
        }

        const countrylayer = L.geoJSON(data, {
          style: function (feature) {
            return {
              color: '#bc4747',
              fillOpacity: 0.2,
              opacity: 0.5,
              weight: 5
            };
          }
        })

        countrylayer.addTo(blogmap.state.map);
        
        blogmap.setState({ countrylayer: countrylayer });
        
      })
      try {
        const position = L.latLng(coords.split(" ").map(x => parseFloat(x)));
        this.state.pulsemarker.setLatLng(position);
        this.state.map.flyTo(position);
      } catch (error) {
        console.log("error reading coordinates: " + error);
      }
    }
    this.setState({ current: i });
  }

  render() {
    var pane;

    if (this.state.posts !== null) {
      pane = (
        <InfoPane
          post={this.state.posts[this.state.current]}
          prev={() => this.prev()}
          next={() => this.next()}
        />
      );
    }

    return (
      <div>
        <div id="map"></div>
        {pane}
      </div>
    );
  }
}

export default Map;

function mod(n, m) {
  return ((n % m) + m) % m;
}
