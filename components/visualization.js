'use strict';

import d3 from 'd3';
import React from 'react';

const NUM_COLUMNS = 20;
const RADIUS = 5;
const PADDING = 15;
const CLASS_NAMES = {
  GUESS: 'circle--guess',
  ACTUAL: 'circle--actual'
}

class Renderer {

  constructor(el, state) {
    d3.select(el).append('svg')
      .attr('class', 'd3')
      .append('g')

    this._updateGrid(el, state);
    this._updateColors(el, 20, CLASS_NAMES.GUESS);
    this._updateColors(el, 40, CLASS_NAMES.ACTUAL);
  }

  update(el, {guess, actual}) {
    this._updateColors(el, guess, CLASS_NAMES.GUESS);
    this._updateColors(el, actual, CLASS_NAMES.ACTUAL);
  }

  _updateGrid(el, state) {
    let index = d3.range(state.max);
    let g = d3.select(el).selectAll('g');
    let point = g.selectAll('.circle').data(index);

    point.enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('r', RADIUS)
      .attr('id', (d) => 'icon' + d)
      .attr('cx', (d) => {
        var remainder = d % NUM_COLUMNS; // calculates the x position (column number) using modulus
        return PADDING + (remainder * PADDING); // apply the buffer and return value
      })
      .attr('cy', (d) => {
        var whole = Math.floor(d / NUM_COLUMNS); // calculates the y position (row number)
        return PADDING + (whole * PADDING); // apply the buffer and return the value
      });
  }

  _updateColors(el, value, className) {
    d3.select(el).selectAll('circle').classed(className, d => d < value);
  }
}

class Visualization extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var el = React.findDOMNode(this);
    this.renderer = new Renderer(el, this.getChartState());
  }

  componentDidUpdate() {
    var el = React.findDOMNode(this);
    this.renderer.update(el, this.getChartState());
  }

  getChartState() {
    return {
      max: this.props.max,
      actual: this.props.actual,
      guess: this.props.guess
    }
  }

  render() {
    return <div className="chart"></div>
  }
}

export default Visualization;
