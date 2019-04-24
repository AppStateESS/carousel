'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import GridHeader from './GridHeader'
import {SortableElement, SortableContainer} from 'react-sortable-hoc'
import './grid.scss'

const Grid = ({listing, columns, sortFunction, currentSort, allowSort, handleRowSort}) => {
  const sortIconTrack = {}
  columns.forEach((value) => {
    sortIconTrack[value.column] = 0
  })
  if (currentSort.sortBy) {
    sortIconTrack[currentSort.sortBy] = currentSort.sortByDir
  }

  let tableClass = 'table table-striped table-hover'

  let tbody

  if (allowSort) {
    tbody = (
      <SortableList axis="y" lockAxis="y" pressDelay={200} items={listing} helperClass="grid-row-sort-move" onSortEnd={handleRowSort} columns={columns}/>
    )
  } else {
    let rows = listing.map((resource, key) => {
      let tdStack = buildTdColumns(resource, columns, key)
      return <tr className="grid-row" key={key}>{tdStack}</tr>
    })
    tbody = <tbody>{rows}</tbody>
  }

  return (
    <div>
      <table className={tableClass}>
        <thead>
          <GridHeader
            columns={columns}
            sortFunction={sortFunction}
            sortIconTrack={sortIconTrack}/>
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
  allowSort: PropTypes.bool,
  name: PropTypes.string,
  handleRowSort: PropTypes.func,
}

Grid.defaultProps = {
  contextMenu: null
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
    return <td key={subkey} className={value.className}>{columnContent}</td>
  })
  return tdStack
}

const SortableItem = SortableElement(({value}) => {
  return <tr className="grid-row-sort">{value}</tr>
})

const SortableList = SortableContainer(({items, columns}) => {
  let rows = items.map((resource, index) => {
    let tdStack = buildTdColumns(resource, columns, index)
    return <SortableItem key={`item-${index}`} index={index} value={tdStack}/>
  })
  return (<tbody>{rows}</tbody>)
})
