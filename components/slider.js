import React from 'react';
import ReactSlider from 'react-slider';

React.initializeTouchEvents(true);

class Slider extends React.Component {

  render() {
    return (
      <ReactSlider
        max={this.props.max}
        onChange={this.props.onChange}
        defaultValue={[0]}
        orientation='vertical'
        className='vertical-slider'
        withBars={true} />
    )
  }
}

export default Slider;
