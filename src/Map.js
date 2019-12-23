import React from 'react';
import L from 'leaflet';
import 'leaflet-active-area';
import 'leaflet-arc';
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
    const blogmap = this;

    this.state = { posts: null, current: 1 };
    $.when(
      $.getJSON('/itinerario_desconocido_posts.json', function(data) {
        var images = [];
        for (var i = 0; i < data.length; i++) {
          images[i] = new Image();
          images[i].src = data[i].jetpack_featured_media_url;
          images[i].alt = data[i].title.rendered;
        }
        blogmap.setState({ posts: data, images: images });
      })
    ).then(function() {
      blogmap.moveToPost(blogmap.state.posts.length - 1);
    });
  }

  componentDidMount() {
    const blogmap = this;

    var map = L.map('map', {
      zoomControl: false,
      keyboard: true
    }).setView([51.505, -0.09], 5);
    map.setActiveArea('activeArea');

    // L.control
    //   .zoom({
    //     position: 'bottomleft'
    //   })
    //   .addTo(map);

    L.tileLayer(
      'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}',
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
      }
    ).addTo(map);

    /*L.Polyline.Arc([43.11667, 131.9], [55.75222, 37.61556], {
      color: 'red',
      vertices: 200
    }).addTo(map);*/

    const pulsemarkersvg = L.icon({
      iconUrl: '/marker-pulse.svg',
      iconSize: [80, 80]
    });

    const pulsemarker = L.marker([0, 0], { icon: pulsemarkersvg });
    pulsemarker.addTo(map);

    this.setState({ map: map, pulsemarker: pulsemarker });

    $(document).keydown(function(e) {
      switch (e.which) {
        case 37: // left
          //blogmap.prev();
          break;

        case 38: // up
          break;

        case 39: // right
          //blogmap.next();
          break;

        case 40: // down
          break;

        case 107: // numpad +
          //map.zoomIn();
          break;

        case 109: // numpad -
          //map.zoomOut();
          break;

        case 33: // page up
          blogmap.next();
          break;

        case 34: // page down
          blogmap.prev();
          break;

        default:
          return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });

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

    if (coords !== '') {
      $.getJSON(
        '/ne/countries/' + this.state.posts[i].country_code + '.json',
        function(data) {
          if (blogmap.state.countrylayer != null) {
            blogmap.state.map.removeLayer(blogmap.state.countrylayer);
          }

          const countrylayer = L.geoJSON(data, {
            style: function(feature) {
              return {
                color: '#bc4747',
                fillOpacity: 0.2,
                opacity: 0.5,
                weight: 5
              };
            }
          });

          countrylayer.addTo(blogmap.state.map);

          blogmap.setState({ countrylayer: countrylayer });
          blogmap.state.map.flyToBounds(countrylayer.getBounds());

          try {
            const position = L.latLng(
              coords.split(' ').map(x => parseFloat(x))
            );
            blogmap.state.pulsemarker.setLatLng(position);
          } catch (error) {
            console.log('error reading coordinates: ' + error);
          }
        }
      );
    }

    this.setState({ current: i });
  }

  render() {
    var pane;

    if (this.state.posts !== null) {
      pane = (
        <InfoPane
          post={this.state.posts[this.state.current]}
          image={this.state.images[this.state.current]}
          prev={() => this.prev()}
          next={() => this.next()}
        />
      );
    }

    return (
      <div>
        <div id="map"></div>
        {pane}
        <div className="activeArea"></div>
      </div>
    );
  }
}

export default Map;

function mod(n, m) {
  return ((n % m) + m) % m;
}
