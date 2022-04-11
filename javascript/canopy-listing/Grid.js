'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import GridHeader from './GridHeader'
import './grid.scss'

const Grid = ({listing, columns, sortFunction, currentSort}) => {
  const sortIconTrack = {}
  if (columns === undefined || columns.length === 0) {
    throw 'No columns set for Grid'
  }
  columns.forEach((value) => {
    sortIconTrack[value.column] = 0
  })
  if (currentSort.sortBy) {
    sortIconTrack[currentSort.sortBy] = currentSort.sortByDir
  }

  let tableClass = 'table table-striped table-hover'

  let tbody

  let rows = listing.map((resource, key) => {
    let tdStack = buildTdColumns(resource, columns, key)
    const index = resource.id !== undefined ? resource.id : key
    return (
      <tr className="grid-row" key={index}>
        {tdStack}
      </tr>
    )
  })
  tbody = <tbody>{rows}</tbody>

  return (
    <div>
      <table className={tableClass}>
        <thead>
          <GridHeader
            columns={columns}
            sortFunction={sortFunction}
            sortIconTrack={sortIconTrack}
          />
        </thead>
        {tbody}
      </table>
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
  handleRowSort: PropTypes.func,
}

Grid.defaultProps = {
  contextMenu: null,
}

export default Grid

const buildTdColumns = (resource, columns, index) => {
  let tdStack = columns.map((value, subkey) => {
    let columnContent
    if (value.callback) {
      columnContent = value.callback(resource, index)
    } else {
      columnContent = resource[value.column]
    }
    return (
      <td key={subkey} className={value.className} style={value.style}>
        {columnContent}
      </td>
    )
  })
  return tdStack
}
