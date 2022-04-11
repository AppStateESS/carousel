'use strict'
import React, {Component} from 'react'
import {Navbar, NavbarButton, NavbarSearch} from '@essappstate/react-navbar'
import Waiting from './Waiting'
import Grid from './Grid'
import Overlay from '@essappstate/canopy-react-overlay'
import './Listing.scss'
/* global $ */

export function debounce(fn, delay) {
  var timer = null
  return function () {
    var context = this,
      args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// const Waiting = () => {
//   return <div>Waiting wtf</div>
// }

export default class Listing extends Component {
  delayLoad() {
    this.load()
  }

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      listing: [],
      loading: true,
      message: null,
      messageType: 'danger',
      overlay: false,
      overlayType: 'form',
      resource: {},
      limit: 10,
      offset: 0,
      more: false,
    }
    this.allowSort = false
    this.restUrl = 'Module/Control/'
    this.label = 'label'
    this.sortBy = null
    this.sortByDir = 0
    this.defaultResource = {}
    this.clearMessage = this.clearMessage.bind(this)
    this.save = this.save.bind(this)
    this.load = this.load.bind(this)
    this.reset = this.reset.bind(this)
    this.sortByColumn = this.sortByColumn.bind(this)
    this.overlayOn = this.overlayOn.bind(this)
    this.overlayOff = this.overlayOff.bind(this)
    this.editResource = this.editResource.bind(this)
    this.delayLoad = debounce(this.delayLoad, 1000)
    this.update = this.update.bind(this)
    this.create = this.create.bind(this)
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
    this.complete = this.complete.bind(this)
    this.handleRowSort = this.handleRowSort.bind(this)
    this.finish = this.finish.bind(this)
    this.content = this.content.bind(this)
    this.moreRows = this.moreRows.bind(this)
  }

  componentDidMount() {
    this.load()
    this.setState({resource: this.defaultResource})
  }

  finish() {
    this.load()
    this.overlayOff()
  }

  create() {
    this.setState({
      overlay: true,
      overlayType: 'form',
      resource: Object.assign({}, this.defaultResource),
    })
  }

  overlayOn(overlayType = 'form') {
    this.setState({overlay: true, overlayType, message: null})
  }

  overlayOff() {
    this.reset()
  }

  loadResource(key, callback = null) {
    const resource = Object.assign({}, this.state.listing[key])
    this.setState(
      {
        resource,
      },
      callback
    )
  }

  editResource(key, e) {
    e.preventDefault()
    this.loadResource(key)
    this.overlayOn('form')
  }

  deleteResource(key, e) {
    e.preventDefault()
    if (
      confirm(
        'Are you sure you want to delete this item along with all its content?'
      )
    ) {
      this.sendDelete(key)
    }
  }

  sendDelete(key) {
    const resource = this.state.listing[key]
    $.ajax({
      url: this.restUrl + '/' + resource.id,
      dataType: 'json',
      type: 'delete',
      success: () => {
        this.setMessage(this.label + ' deleted.', 'success')
        this.load()
      },
      error: (data) => this.error(data),
    })
  }

  reset() {
    this.setState({
      overlay: false,
      resource: Object.assign({}, this.defaultResource),
    })
  }

  getSearch() {
    return (
      <NavbarSearch
        value={this.state.search}
        placeholder="Search"
        onClick={() => {
          this.load()
        }}
        onChange={(e) => {
          this.updateSearch(e.target.value)
        }}
      />
    )
  }

  updateSearch(search) {
    this.setState({search, offset: 0})

    if (search.length > 2 || search.length === 0) {
      this.delayLoad()
    }
  }

  sortByColumn(column) {
    if (column === this.sortBy) {
      switch (this.sortByDir) {
        case 0:
          this.sortByDir = 1
          break

        case 1:
          this.sortByDir = 2
          break

        case 2:
          this.sortByDir = 0
          this.sortBy = null
      }
    } else {
      this.sortByDir = 1
      this.sortBy = column
    }
    this.setState({offset: 0}, this.load)
  }

  getUrl() {
    return this.restUrl
  }

  load(otherData = {}, onSuccess = null) {
    this.setState({loading: this.state.listing.length === 0})
    let sortByDir
    switch (this.sortByDir) {
      case 1:
        sortByDir = 'asc'
        break

      case 2:
        sortByDir = 'desc'
        break

      default:
        sortByDir = null
    }

    const url = this.restUrl
    const data = {
      offset: this.state.offset,
      limit: this.state.limit,
      search: this.state.search,
      sortBy: this.sortBy,
      sortByDir: sortByDir,
    }
    const sendData = Object.assign(otherData, data)
    $.ajax({
      url,
      data: sendData,
      dataType: 'json',
      type: 'get',
      success: (data) => {
        if (data.listing !== undefined) {
          let more = false
          if (data.more !== undefined) {
            more = data.more
          }
          if (this.state.offset === 0) {
            this.setState({listing: data.listing, loading: false, more})
          } else {
            this.setState({
              listing: this.state.listing.concat(data.listing),
              loading: false,
              more,
            })
          }
        } else {
          this.setState({loading: false})
          this.setMessage('Problem accessing server')
        }
        if (onSuccess) {
          console.log('running')
          onSuccess(data)
        }
      },
      error: () => {
        this.setState({loading: false})
        this.setMessage('Problem accessing server')
      },
    })
  }

  setMessage(message, messageType = 'danger') {
    setTimeout(() => {
      this.clearMessage()
    }, 6000)

    this.setState({message, messageType})
  }

  clearMessage() {
    this.setState({message: null, messageType: 'danger'})
  }

  save() {
    let type = 'post'
    let url = this.restUrl
    let resourceId = parseInt(this.state.resource.id)
    if (resourceId !== 0) {
      url = url + '/' + this.state.resource.id
      type = 'put'
    }
    $.ajax({
      url,
      type,
      data: {
        ...this.state.resource,
      },
      dataType: 'json',
      success: this.success,
      error: this.error,
      complete: this.complete,
    })
  }

  success(data) {
    if (data.success) {
      this.load()
      this.setMessage(
        <div>
          <i className="far fa-thumbs-up" />
          &nbsp;Save successful.
        </div>,
        'success'
      )
      this.reset()
    } else {
      this.setMessage(
        <div>
          <i className="fas fa-exclamation-triangle" />
          &nbsp;Unable to save: {data.error}
        </div>
      )
    }
  }

  error(data) {
    let message = 'unknown'
    if (data.responseJSON !== undefined) {
      message = data.responseJSON.exception.message
    } else if (data.exception !== undefined) {
      message = data.exception.message
    }
    this.setMessage(
      <div>
        <i className="fas fa-exclamation-triangle" />
        &nbsp;An error occurred: {message}
      </div>
    )
  }

  complete() {
    this.reset()
  }

  message() {
    const cn = `fixed-message alert alert-${this.state.messageType} fade show alert-dismissible`
    if (this.state.message) {
      return (
        <div className={cn}>
          <span>{this.state.message}</span>
          <button
            type="button"
            className="close"
            onClick={this.clearMessage}
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )
    }
  }

  navLeft() {
    const button = this.navbarButton()
    return [button]
  }

  navbarButton() {
    const label = (
      <span>
        <i className="fas fa-plus" />
        &nbsp;Create
      </span>
    )
    const button = (
      <NavbarButton color="success" label={label} handleClick={this.create} />
    )
    return button
  }

  update(varname, value) {
    let changeValue
    if (typeof value === 'object') {
      changeValue = value.target.value
    } else {
      changeValue = value
    }
    const {resource} = this.state
    resource[varname] = changeValue
    this.setState({resource})
  }

  navbar() {
    const search = this.getSearch()
    return (
      <Navbar
        leftSide={this.navLeft()}
        rightSide={[search]}
        background="light"
        className="border rounded mb-3 p-0"
      />
    )
  }

  title() {
    return null
  }

  showOverlay() {
    const overlay = this.overlay()
    if (overlay === null) {
      return
    }

    let width
    if (overlay.width) {
      width = overlay.width
    }

    let title = ''
    if (overlay.title) {
      title = overlay.title
    }

    let cname = ''
    if (overlay.cname) {
      cname = overlay.cname
    }

    let close
    if (overlay.close) {
      close = () => {
        overlay.close()
        this.overlayOff()
      }
    } else {
      close = this.overlayOff
    }
    return (
      <Overlay
        show={this.state.overlay}
        width={width}
        title={title}
        cname={cname}
        close={close}>
        {overlay.content}
      </Overlay>
    )
  }

  /* Extended function should do actual work. This is a stub. */

  handleRowSort({oldIndex, newIndex}) {
    alert(`Row sorting handle has not been set: ${oldIndex} to ${newIndex}`)
  }

  moreRows() {
    const {offset} = this.state
    this.setState({offset: offset + 1}, this.load)
  }

  content() {
    if (this.state.loading) {
      return (
        <div>
          <Waiting />
        </div>
      )
    }
    if (this.state.listing.length === 0) {
      const content = []
      content.push(<span key="1">No {this.label.toLowerCase()}s found.</span>)
      if (this.state.search.length > 0) {
        content.push(
          <span key="2">&nbsp;You may want to broaden your search.</span>
        )
      }
      return content
    }
    const button = (
      <button className="btn btn-outline-dark" onClick={this.moreRows}>
        Show more
      </button>
    )
    return (
      <div>
        <Grid
          listing={this.state.listing}
          handleRowSort={this.handleRowSort}
          allowSort={this.allowSort}
          edit={this.editResource}
          contextMenu={this.contextMenu}
          columns={this.columns}
          sortFunction={this.sortByColumn}
          currentSort={{
            sortBy: this.sortBy,
            sortByDir: this.sortByDir,
          }}
        />
        {this.state.more ? button : null}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>{this.showOverlay()}</div>
        <div>{this.navbar()}</div>
        <div>{this.message()}</div>
        <div>{this.title()}</div>
        <div className="mt-3">{this.content()}</div>
      </div>
    )
  }
}
