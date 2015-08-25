'use strict';

import React from 'react';

class ResultPanel extends React.Component {

  render() {
    let threshold = 10;
    let diff = this.props.value - this.props.realValue;
    return (
      <div className='surprise__result-panel'>
        <p>
          Du hast <strong>{this.props.value}</strong> geschätzt.
          {this.guessDifference(diff, threshold)}
        </p>
        <p>
          Nur <strong>{this.props.realValue} von {this.props.maxValue}</strong> Verge&shy;waltigungen wurden berichtet.<br/>
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
