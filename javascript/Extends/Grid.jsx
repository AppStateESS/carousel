'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu"
import './grid.scss'

const Grid = ({listing, columns, sortFunction, currentSort, contextMenu}) => {
  const sortIconTrack = {}
  columns.forEach((value) => {
    sortIconTrack[value.column] = 0
  })
  if (currentSort.sortBy) {
    sortIconTrack[currentSort.sortBy] = currentSort.sortByDir
  }

  const MENU_TYPE = 'SIMPLE'
  const collect = (props) => {
    return {name: props.name}
  }

  const headers = (columns, sortFunction) => {
    const th = columns.map((value, key) => {
      let icon
      let className = []
      if (sortIconTrack[value.column] === 1) {
        className.push('pointer')
        icon = <FontAwesomeIcon icon={faCaretUp}/>
      } else if (sortIconTrack[value.column] === 2) {
        className.push('pointer')
        icon = <FontAwesomeIcon icon={faCaretDown}/>
      }
      if (value.className) {
        className.push(value.className)
      }

      let style
      if (value.style && typeof value.style === 'object') {
        style = value.style
      }
      return (
        <th
          style={style}
          className={className}
          key={key}
          onClick={sortFunction.bind(null, value.column)}>{value.label}&nbsp;{icon}
        </th>
      )
    })
    return (<tr>{th}</tr>)
  }
  let tableClass = 'table table-striped table-hover'

  let menu
  if (contextMenu) {
    let menuOptions = contextMenu.map((value, key) => {
      return (
        <MenuItem onClick={value.handleClick} data={value.data} key={key}>
          {value.label}
        </MenuItem>
      )
    })
    menu = (
      <ContextMenu id={MENU_TYPE}>
        {menuOptions}
      </ContextMenu>
    )
  }

  let rows = listing.map((resource, key) => {
    let stack = columns.map((value, subkey) => {
      if (value.callback) {
        return <td key={subkey} className={value.className}>{value.callback(resource, key)}</td>
      } else {
        return <td key={subkey} className={value.className}>{resource[value.column]}</td>
      }
    })
    
    if (contextMenu) {
      return (
        <ContextMenuTrigger
          renderTag="tr"
          name={key}
          id={MENU_TYPE}
          holdToDisplay={1000}
          key={key}
          attributes={{className: 'context'}}
          collect={collect}>
          {stack}
        </ContextMenuTrigger>
      )
    } else {
      return (<tr key={key}>
        {stack}
      </tr>)
    }
  })

  return (
    <div>
      <table className={tableClass}>
        <tbody>
          {headers(columns, sortFunction)}
          {rows}
        </tbody>
      </table>
      {menu}
    </div>
  )
}

Grid.propTypes = {
  listing: PropTypes.array,
  columns: PropTypes.array,
  sortFunction: PropTypes.func,
  currentSort: PropTypes.object,
  contextMenu: PropTypes.array,
  name: PropTypes.string,
}

Grid.defaultProps = {
  contextMenu: null
}
export default Grid
