'use strict'
import React, {Component} from 'react'
import {Navbar, NavbarButton, NavbarSearch} from '@essappstate/react-navbar'
import Waiting from '@essappstate/react-waiting'
import Grid from './Grid'
import Overlay from '@essappstate/canopy-react-overlay'
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
      resource: {}
    }
    this.allowSort = false
    this.module = 'module'
    this.role = 'role'
    this.control = 'control'
    this.label = 'label'
    this.sortBy = null
    this.sortByDir = 0
    this.defaultResource = {}
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
    this.setState(
      {overlay: true, resource: Object.assign({}, this.defaultResource)}
    )
  }

  overlayOn() {
    this.setState({overlay: true})
  }

  overlayOff() {
    this.reset()
  }

  loadResource(key, callback = null) {
    const resource = Object.assign({}, this.state.listing[key])
    this.setState({
      resource
    }, callback)
  }

  editResource(key, e) {
    e.preventDefault()
    this.loadResource(key)
    this.overlayOn()
  }

  deleteResource(key, e) {
    e.preventDefault()
    const resource = this.state.listing[key]
    if (confirm('Are you sure you want to delete this carousel along with all it\'s slides?')) {
      $.ajax({
        url: this.getUrl() + '/' + resource.id,
        dataType: 'json',
        type: 'delete',
        success: () => {
          this.setMessage(this.label + ' deleted.', 'success')
          this.load()
        },
        error: data => this.error(data)
      })
    }
  }

  reset() {
    this.setState(
      {overlay: false, resource: Object.assign({}, this.defaultResource)}
    )
  }

  getSearch() {
    return (
      <NavbarSearch
        value={this.state.search}
        placeholder="Search"
        onChange={(e) => {
          this.updateSearch(e.target.value)
        }}/>
    )
  }

  updateSearch(search) {
    this.setState({search})

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

    this.load()
  }

  getUrl() {
    return `${this.module}/${this.role}/${this.control}`
  }

  load() {
    const url = this.getUrl()
    $.ajax({
      url,
      data: {
        search: this.state.search,
        sortBy: this.sortBy,
        sortByDir: this.sortByDir
      },
      dataType: 'json',
      type: 'get',
      success: (data) => {
        this.setState({listing: data.listing, loading: false})
      },
      error: () => {
        this.setState({loading: false})
        this.setMessage('Could not access server')
      }
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
    let url = this.getUrl()
    if (this.state.resource.id !== '0') {
      url = url + '/' + this.state.resource.id
      type = 'put'
    }
    $.ajax({
      url,
      type,
      data: {
        ...this.state.resource
      },
      dataType: 'json',
      success: this.success,
      error: this.error,
      complete: this.complete
    })
  }

  success(data) {
    if (data.success) {
      this.load()
      this.setMessage(
        <div>
          <i className="far fa-thumbs-up"></i>&nbsp;Save successful.</div>,
        'success'
      )
      this.reset()
    } else {
      this.setMessage(
        <div>
          <i className="fas fa-exclamation-triangle"></i>&nbsp;Unable to save: {data.error}</div>
      )
    }
  }

  error(data) {
    let message = 'unknown'
    if (data.responseJSON.exception.message !== undefined) {
      message = data.responseJSON.exception.message
    } else if (data.exception.message !== undefined) {
      message = data.exception.message
    }
    this.setMessage(
      <div>
        <i className="fas fa-exclamation-triangle"></i>&nbsp;An error occurred: {message}</div>
    )
  }

  complete() {
    this.reset()
  }

  message() {
    const cn = `alert alert-${this.state.messageType} alert-dismissible fade show`
    if (this.state.message) {
      return (
        <div className={cn}>
          <span>{this.state.message}</span>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
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
        <i className="fas fa-plus"></i>&nbsp;Create</span>
    )
    const button = (
      <NavbarButton color="outline-primary" label={label} handleClick={this.create}/>
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
    return <Navbar
      leftSide={this.navLeft()}
      rightSide={[search]}
      background="light"
      className="border rounded mb-3"/>
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

    let title
    if (overlay.title) {
      title = overlay.title
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
      <Overlay show={this.state.overlay} width={width} title={title} close={close}>{overlay.content}</Overlay>
    )

  }

  /* Extended function should do actual work. This is a stub. */

  handleRowSort({oldIndex, newIndex}) {
    console.log(`moving ${oldIndex} to ${newIndex}`)
  }

  content() {
    if (this.state.loading) {
      return <div><Waiting/></div>
    }
    if (this.state.listing.length === 0) {
      const content = []
      content.push(<span key="1">No {this.label.toLowerCase()}s found.</span>)
      if (this.state.search.length > 0) {
        content.push(<span key="2">&nbsp;You may want to broaden your search.</span>)
      }
      return content
    }
    return (
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
          sortByDir: this.sortByDir
        }}/>
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
