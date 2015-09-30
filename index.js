'use strict';

import React from 'react';
import Slider from './components/slider';
import ResultPanel from './components/resultpanel';
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
        {this._renderResultPanel()}
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
      disabled={this.state.confirmed}
      onChange={value => this._handleChange(value)}
    />
  }

  _renderResultPanel() {
    if (this.state.average) {
      return <ResultPanel
        average={this.state.average}
        realValue={this.state.primary}
        maxValue={this.state.max}
        value={this.state.secondary}
        percent_lt_real={this.state.percent_lt_real}
        percent_gt_real={this.state.percent_gt_real}
        labels={this.props.interactive.labels}
      />
    }
  }

  _handleChange(value) {
    if (this.state.confirmed) {
      return;
    }
    this.setState({secondary: value});
  }

  _handleConfirm() {
    this.setState({confirmed: true});
    this._sendStats();
  }

  _sendStats() {
    if (this.props.revealUrl === undefined) {
      return;
    }
    let self = this;
    let request = new XMLHttpRequest();

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        self.setState(data);
      }
    };

    request.open('POST', this.props.revealUrl, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Accept', 'application/json; charset=UTF-8');
    request.send('_method=PUT&value=' + this.state.secondary);
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
