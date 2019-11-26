import React from 'react';
//import $ from 'jquery';

import './InfoPane.css';



class InfoPane extends React.Component {


  render () {
    return (


            <div className="modal-content" id="InfoPane">
              <div className="modal-header">
                <h5 className="modal-title">Puebla und die Pyramide von Cholula</h5>
              </div>
              <div className="post-image">
                <img src="https://itinerariodesconocido.ch/wp-content/uploads/2019/11/DSC04877.jpg" alt="" />
              </div>
              <div className="modal-body">
                <p>Nach dem vielversprechenden Start in Mexico Stadt und dem nahen Teotihuacán ging es weiter in Richtung südosten, in Millionenstadt Puebla, der viertgrössten Stadt Mexikos. Für die Reise dorthin sind wir in einen öffentlichen Bus gestiegen, welcher uns in etwas mehr als 2 Stunden dorthin gebracht hat. Ich war positiv überrascht von der Qualität von diesen&#8230; <a className="more-link" href="https://itinerariodesconocido.ch/2019/11/17/puebla-und-die-pyramide-von-cholula/#more-2729" target="blank">weiterlesen &rarr;</a></p>
              </div>
              <div className="modal-footer">
                <a className="btn btn-danger" href="https://itinerariodesconocido.ch/2019/11/17/puebla-und-die-pyramide-von-cholula/#more-2729" role="button" target="blank">Zum Blog Post</a>
              </div>
            </div>
    );
  }
}

export default InfoPane;