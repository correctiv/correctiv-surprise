'use strict';

import React from 'react';
import Slider from './components/slider';
import Visualization from './components/visualization';

class Surprise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      max: props.max,
      primary: props.primary || 0,
      secondary: props.secondary || 0
    }
  }

  render() {
    return (
      <div className="surprise">
        <Visualization
          max={this.state.max}
          primary={this.state.primary}
          secondary={this.state.secondary}
        />
        <Visualization
          ref='visualization'
          max={this.state.max}
          primary={this.state.primary}
          secondary={this.state.secondary}
        />
        <Slider
          ref='slider'
          max={this.state.max}
          onChange={value => this._handleChange(value)}
        />
      </div>
    )
  }

  componentDidMount() {
    let height = this.refs.visualization.getHeight();
    this.refs.slider.setHeight(height);
  }

  _handleChange(value) {
    this.setState({secondary: value});
  }
}

window.Surprise = {
  render (el, options) {
    React.render(React.createElement(Surprise, options), el);
  },
  renderStatic (el, options) {
    React.render(React.createElement(Visualization, options), el);
  }
};
