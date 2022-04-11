'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'

const GridHeader = ({columns, sortFunction, sortIconTrack}) => {
  const th = columns.map((value, key) => {
    let icon
    let className = []
    let handle = null
    if (value.sort === true) {
      className.push('pointer')
      handle = sortFunction.bind(null, value.column)
      if (sortIconTrack[value.column] === 1) {
        icon = <FontAwesomeIcon icon={faCaretUp} transform="up-4" />
      } else if (sortIconTrack[value.column] === 2) {
        icon = <FontAwesomeIcon icon={faCaretDown} transform="down-4" />
      } else {
        icon = (
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon icon={faCaretUp} transform="up-4" />
            <FontAwesomeIcon icon={faCaretDown} transform="down-4" />
          </span>
        )
      }
    }
    if (value.className) {
      className.push(value.className)
    }

    let style
    if (value.style && typeof value.style === 'object') {
      style = value.style
    }
    return (
      <th style={style} className={className} key={`th${key}`} onClick={handle}>
        {value.label}&nbsp;{icon}
      </th>
    )
  })
  return <tr>{th}</tr>
}

GridHeader.propTypes = {
  columns: PropTypes.array,
  sortFunction: PropTypes.func,
  sortIconTrack: PropTypes.object
}

export default GridHeader
