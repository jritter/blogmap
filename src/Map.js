import React from 'react';
import L from 'leaflet';
import $ from 'jquery';

import InfoPane from './InfoPane';

import './Map.css';
import 'leaflet/dist/leaflet.css';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCircle } from '@fortawesome/free-regular-svg-icons';

//import { renderToString } from 'react-dom/server'


class Map extends React.Component {


  constructor(props) {
    super(props);
    var map = this;
    this.state = { posts: null, current: 1 };
    $.getJSON('/itinerario_desconocido_posts.json', function(data){
      map.setState({ posts: data });
    });
  }

  componentDidMount() {
    var map = L.map('map').setView([51.505, -0.09], 5);
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
    }).addTo(map);
    
    //var myIcon = L.divIcon({className: 'map-marker', html: renderToString(<FontAwesomeIcon icon={faCircle} />)});

    
    
  }

  next() {
    var num_posts = this.state.posts.length;
    var current = this.state.current;
    this.setState({ current : mod(current + 1, num_posts)});
  }

  prev() {
    var num_posts = this.state.posts.length;
    var current = this.state.current;
    this.setState({ current : mod(current - 1, num_posts)});
  }

  render () {
    var pane = '';

    if (this.state.posts !== null) {
      pane = <InfoPane post={this.state.posts[this.state.current]} prev={() => this.prev()} next={() => this.next()}/>          
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