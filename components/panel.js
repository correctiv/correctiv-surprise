'use strict';

import React from 'react';

class Panel extends React.Component {

  render() {
    return (
      <header className='chart__panel'>
        <div className='description'>
          <h1 className='description__title'>{this.props.labels.title}</h1>
          <p>{this.props.labels.description}</p>
          <ul className='legend chart__legend'>
            {this._renderSecondary()}
            {this._renderPrimary()}
            <li className='legend__item'>
              {this.props.labels.maxLabel} {this.props.max}
            </li>
          </ul>
          {this._renderButton()}
        </div>
      </header>
    )
  }

  _renderPrimary() {
    if (this.props.primary) {
      return <li className='legend__item --primary'>
        <strong>{this.props.labels.primaryLabel} {this.props.primary}</strong>
      </li>
    }
  }

  _renderSecondary() {
    if (this.props.secondary) {
      return <li className='legend__item --secondary'>
        <strong>{this.props.labels.secondaryLabel} {this.props.secondary}</strong>
      </li>
    }
  }

  _renderButton() {
    if (this.props.onConfirm) {
      return <button
        className='chart__button'
        onClick={this.props.onConfirm}>
        {this.props.labels.button}
      </button>;
    }
  }
}

export default Panel;
