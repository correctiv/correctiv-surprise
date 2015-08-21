'use strict';

import d3 from 'd3';
import React from 'react';

const NUM_COLUMNS = 20;
const RADIUS = 5;
const PADDING = 15;
const CLASS_NAMES = {
  BASE: 'chart__circle',
  PRIMARY: 'chart__circle--primary',
  SECONDARY: 'chart__circle--secondary'
}

class Renderer {

  constructor(el, state) {
    let numRows = Math.ceil(state.max / NUM_COLUMNS);
    let height = numRows * PADDING + PADDING;
    let width = NUM_COLUMNS * PADDING + PADDING;

    d3.select(el).append('svg')
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('class', 'd3')
      .append('g')
      .attr('width', '100%')

    this._renderGrid(el, state);
    this.update(el, state);
  }

  update(el, {primary, secondary}) {
    this._updateColors(el, secondary, CLASS_NAMES.SECONDARY);
    this._updateColors(el, primary, CLASS_NAMES.PRIMARY);
  }

  _renderGrid(el, state) {
    let index = d3.range(state.max);
    let g = d3.select(el).selectAll('g');
    let point = g.selectAll('.circle').data(index);

    point.enter()
      .append('circle')
      .attr('class', CLASS_NAMES.BASE)
      .attr('r', RADIUS)
      .attr('id', (d) => 'icon' + d)
      .attr('cx', (d) => {
        let remainder = d % NUM_COLUMNS; // calculates the x position (column number) using modulus
        return PADDING + (remainder * PADDING); // apply the buffer and return value
      })
      .attr('cy', (d) => {
        let whole = Math.floor(d / NUM_COLUMNS); // calculates the y position (row number)
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
    let el = React.findDOMNode(this);
    this.renderer = new Renderer(el, this.getChartState());
  }

  componentDidUpdate() {
    let el = React.findDOMNode(this);
    this.renderer.update(el, this.getChartState());
  }

  getChartState() {
    return {
      max: this.props.max,
      primary: this.props.primary,
      secondary: this.props.secondary
    }
  }

  getHeight() {
    let el = React.findDOMNode(this);
    return el.offsetHeight;
  }

  render() {
    return <div className="chart"></div>
  }
}

export default Visualization;
