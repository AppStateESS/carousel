'use strict'
import React from 'react'
import PropTypes from 'prop-types'

const Waiting = (props) => {
  let message
  if (props.message.length === 0) {
    message = <span>Loading {props.label}...</span>
  } else {
    message = props.message
  }
  return (
    <div className="lead text-center">
      <i className="fa fa-cog fa-spin fa-lg"></i>&nbsp;{message}
    </div>
  )
}

Waiting.propTypes = {
  label: PropTypes.string,
  message: PropTypes.string,
}

Waiting.defaultProps = {
  message: '',
  label: '',
}
export default Waiting
