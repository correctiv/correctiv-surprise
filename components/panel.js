'use strict';

import React from 'react';

class Panel extends React.Component {

  render() {
    return (
      <div className='surprise-chart__footer'>
        <div className='description'>
          <ul className='legend chart__legend'>
            {this._renderSecondary()}
            {this._renderPrimary()}
            {this._renderLegend()}
          </ul>
          {this._renderButton()}
        </div>
      </div>
    )
  }

  _renderPrimary() {
    if (this.props.primary !== undefined && this.props.labels.primaryLabel) {
      return <li className='legend__item --primary'>
        <strong>{this.props.labels.primaryLabel} {this.props.primary}</strong>
      </li>
    }
  }

  _renderSecondary() {
    if (this.props.secondary !== undefined && this.props.labels.secondaryLabel) {
      return <li className='legend__item --secondary'>
        <strong>{this.props.labels.secondaryLabel} {this.props.secondary}</strong>
      </li>
    }
  }

  _renderLegend() {
    if (this.props.labels.maxLabel !== null) {
      return <li className='legend__item'>
        {this.props.labels.maxLabel} {this.props.max}
      </li>
    }
  }

  _renderButton() {
    if (this.props.onConfirm) {
      return <button
        className='surprise-chart__button'
        onClick={this.props.onConfirm}>
        {this.props.labels.button}
      </button>;
    }
  }
}

export default Panel;
