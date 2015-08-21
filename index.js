'use strict';

import React from 'react';
import Slider from './components/slider';
import Visualization from './components/visualization';

class Surprise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      max: props.interactive.max,
      primary: props.interactive.primary || 0,
      secondary: props.interactive.secondary || 0
    }
  }

  render() {
    return (
      <div className="surprise">
        <Visualization
          ref='example'
          max={this.props.example.max}
          primary={this.props.example.primary}
          secondary={this.props.example.secondary}
          numRows={this.props.example.numRows}
        />
        <Visualization
          ref='interactive'
          max={this.state.max}
          primary={this.state.primary}
          secondary={this.state.secondary}
          numRows={this.props.interactive.numRows}
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
    let height = this.refs.interactive.getHeight();
    this.refs.example.setHeight(height);
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
