'use strict';

import React from 'react';

import {render} from './utils';

class ResultPanel extends React.Component {

  _createMarkup(template) {
    return {__html: template};
  };

  render() {
    let threshold = 10;
    let diff = this.props.value - this.props.realValue;
    let template = render(this.props.labels.revealDescription, {
        maxValue: this.props.maxValue,
        realValue: this.props.realValue,
        value: this.props.value
    });
    return (
      <div className='surprise__result-panel'>
        <p>
          Du hast <strong>{this.props.value}</strong> geschätzt.
          {this.guessDifference(diff, threshold)}
        </p>
        <p>
          <div dangerouslySetInnerHTML={this._createMarkup(template)} />
          <strong>{Math.round(this.props.percent_gt_real)}%</strong> aller Leser haben mehr als {this.props.realValue} geschätzt.
        </p>
        <p>
          Durchschnittlich wurde der Wert auf {Math.round(this.props.average)} geschätzt.
        </p>
      </div>
    )
  }
  guessDifference(diff, threshold) {
    if (diff > threshold * 10) {
      return ' Das war viel zu hoch. ';
    } else if (diff > threshold)  {
      return ' Das war zu hoch. ';
    } else if (diff < -threshold) {
      return ' Das war zu niedrig. ';
    } else if(diff === 0) {
      return ' Das war genau richtig! ';
    } else {
      return ' Das war ungefähr richtig. ';
    }
  }
}

export default ResultPanel;
