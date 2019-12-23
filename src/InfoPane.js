import React from 'react';
import Flag from 'react-flags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
//import $ from 'jquery';

import './InfoPane.css';

function InfoPane(props) {
  var flag = '';
  if (props.post.country_code !== '') {
    flag = (
      <Flag
        name={props.post.country_code}
        format="png"
        pngSize="32"
        basePath=""
      />
    );
  }

  return (
    <div className="post posts type-post status-publish clear" id="InfoPane">
      <div className="post-header justify-content-between">
        <h1
          className="post-title entry-title"
          dangerouslySetInnerHTML={{ __html: props.post.title.rendered }}
        ></h1>
      </div>
      <div className="featured-media">
        <img src={props.image.src} alt={props.image.alt} />
      </div>
      <div className="post-content clear">
        <p
          dangerouslySetInnerHTML={{ __html: props.post.excerpt.rendered }}
        ></p>
      </div>
      <div className="post-footer">
        <div>
          {flag}
          <span style={{ float: 'right' }}>
            <a className="blogmap-button" href={props.post.link} target="blank">
              Zum Blog Post
            </a>
            <a
              className="blogmap-button blogmap-arrow-button"
              onClick={props.prev}
              href="#"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </a>
            <a
              className="blogmap-button blogmap-arrow-button"
              onClick={props.next}
              href="#"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default InfoPane;
