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
      secondary: props.interactive.secondary || 0,
      confirmed: false
    }
  }

  render() {
    return (
      <div className="surprise">
        <Visualization
          showPanel
          ref='example'
          labels={this.props.example.labels}
          max={this.props.example.max}
          primary={this.props.example.primary}
          numColumns={this.props.example.numColumns}
          numRows={this.props.example.numRows}
        />
        <Visualization
          interactive
          showPanel
          ref='interactive'
          labels={this.props.interactive.labels}
          max={this.state.max}
          primary={this.state.primary}
          secondary={this.state.secondary}
          numColumns={this.props.interactive.numColumns}
          numRows={this.props.interactive.numRows}
          onConfirm={event => this._handleConfirm(event)}
        />
        {this._renderSlider()}
      </div>
    )
  }

  componentDidMount() {
    let height = this.refs.interactive.getHeight();
    this.refs.slider.setHeight(height);
    let top = this.refs.interactive.getTop();
    this.refs.slider.setTop(top);
  }

  _renderSlider() {
    return <Slider
      ref='slider'
      max={this.state.max}
      value={this.state.secondary}
      // disabled=this.state.confirmed === false
      onChange={value => this._handleChange(value)}
    />
  }

  _handleChange(value) {
    this.setState({secondary: value});
  }

  _handleConfirm() {
    this.setState({confirmed: true});
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
