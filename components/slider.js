import React from 'react';
import ReactSlider from 'react-slider';

React.initializeTouchEvents(true);

class Slider extends React.Component {

  render() {
    return (
      <ReactSlider
        value={this.props.value}
        max={this.props.max}
        onChange={this.props.onChange}
        defaultValue={[0]}
        orientation='vertical'
        className='vertical-slider'
        withBars={true} />
    )
  }

  setHeight(height) {
    let el = React.findDOMNode(this);
    el.style.height = `${height}px`;
  }
  setTop(top) {
    let el = React.findDOMNode(this);
    el.style.top = `${top}px`;
  }
}

export default Slider;
