'use strict';

import React from 'react';
import Slider from './components/slider';
import Visualization from './components/visualization';

class Surprise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      max: 611,
      actual: 50,
      guess: 0,
    }
  }

  render() {
    return (
      <div className="surprise">
        <Slider
          max={this.state.max}
          onChange={value => this._handleChange(value)}
        />
        <Visualization
          max={this.state.max}
          actual={this.state.actual}
          guess={this.state.guess}
        />
      </div>
    )
  }

  _handleChange(value) {
    this.setState({guess: value});
  }
}

React.render(<Surprise name='BigSurprise' />, document.body);
