'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonGroup from '@essappstate/canopy-react-buttongroup'
import BigCheckbox from '@essappstate/canopy-react-bigcheckbox'

export default class Form extends Component {
  constructor(props) {
    super(props)
  }

  intervalTime() {
    const {resource, update} = this.props
    const buttons = [
      {
        value: '2',
        label: (<span>2</span>)
      }, {
        value: '4',
        label: (<span>4</span>)
      }, {
        value: '6',
        label: (<span>6</span>)
      }, {
        value: '8',
        label: (<span>8</span>)
      }, {
        value: '10',
        label: (<span>10</span>)
      }
    ]
    return <ButtonGroup
      name="intervalTime"
      buttons={buttons}
      match={resource.intervalTime}
      handle={update.bind(this, 'intervalTime')}
      activeColor="primary"/>
  }

  iterations() {
    const {resource, update} = this.props
    const buttons = [
      {
        value: '0',
        label: (<span>
          <i className="fas fa-infinity"></i>
        </span>)
      }, {
        value: '1',
        label: (<span>1</span>)
      }, {
        value: '2',
        label: (<span>2</span>)
      }, {
        value: '3',
        label: (<span>3</span>)
      }
    ]
    return <ButtonGroup
      name="iterations"
      buttons={buttons}
      match={resource.iterations}
      handle={update.bind(this, 'iterations')}
      vertical={false}
      activeColor="primary"/>
  }

  transition() {
    const {resource, update} = this.props
    const buttons = [
      {
        value: '0',
        label: (<span>
          Slide
        </span>)
      }, {
        value: '1',
        label: (<span>Fade</span>)
      }
    ]
    return (
      <ButtonGroup
        name="transition"
        buttons={buttons}
        match={resource.transition}
        handle={update.bind(this, 'transition')}
        activeColor="primary"/>
    )
  }

  indicator() {
    const {resource, update} = this.props
    const buttons = [
      {
        value: '0',
        label: (<span>None</span>)
      }, {
        value: '1',
        label: (<span>
          <i className="fas fa-circle"></i>&nbsp;Bullets</span>)
      }, {
        value: '2',
        label: (
          <span>
            <i className="fas fa-image"></i>&nbsp;Thumbnails</span>
        )
      }
    ]
    return <ButtonGroup
      name="indicator"
      buttons={buttons}
      match={resource.indicator}
      handle={update.bind(this, 'indicator')}
      activeColor="primary"/>
  }

  controls() {
    const {resource, update} = this.props
    return <BigCheckbox
      label="Show controls"
      checked={resource.controls}
      handle={update.bind(this, 'controls')}/>
  }

  pause() {
    const {resource, update} = this.props
    return <BigCheckbox
      label="Pause on mouse over"
      checked={resource.pause}
      handle={update.bind(this, 'pause')}/>
  }

  render() {
    const {resource, save, update} = this.props
    const disableSave = resource && resource.title.length === 0
    return (
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control mb-3"
          placeholder="Required"
          value={resource.title}
          onChange={update.bind(this, 'title')}/>
        <div className="row">
          <div className="col-sm-4 mb-3">
            <label className="lead">Iterations</label>
            <div className="d-inline">{this.iterations()}</div>
          </div>
          <div className="col-sm-4 mb-3">
            <label className="lead">Interval</label>{this.intervalTime()}
          </div>
          <div className="col-sm-4 mb-3">
            <label className="lead">Transition</label>{this.transition()}
          </div>
          <div className="col-sm-6 mb-3">
            <label className="lead">Indicator</label>{this.indicator()}
          </div>
          <div className="col-sm-6 mb-3">
            <div>{this.controls()}</div>
            <div>{this.pause()}</div>
          </div>
        </div>
        <button className="btn btn-primary" disabled={disableSave} onClick={save}>Save Carousel</button>
      </div>
    )
  }
}
Form.propTypes = {
  resource: PropTypes.object,
  finish: PropTypes.func,
  save: PropTypes.func,
  update: PropTypes.func
}
