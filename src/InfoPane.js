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
    <div className="modal-content" id="InfoPane">
      <div className="modal-header d-flex justify-content-between">
        <h5 className="modal-title">
          <p
            dangerouslySetInnerHTML={{ __html: props.post.title.rendered }}
          ></p>
        </h5>
        <span className="flag">{flag}</span>
      </div>
      <div className="post-image">
        <img src={props.image.src} alt={props.image.alt} />
      </div>
      <div className="modal-body">
        <p
          dangerouslySetInnerHTML={{ __html: props.post.excerpt.rendered }}
        ></p>
      </div>
      <div className="modal-footer d-flex justify-content-between">
        <a
          className="btn btn-danger"
          href={props.post.link}
          role="button"
          target="blank"
        >
          Zum Blog Post
        </a>
        <div className="btn-group" role="group" aria-label="...">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.prev}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.next}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoPane;

//
//
// {props.post.title.rendered}
//
//
