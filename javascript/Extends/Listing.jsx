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
    this.module = 'module'
    this.role = 'role'
    this.control = 'control'
    this.label = 'label'
    this.sortBy = null
    this.sortByDir = 0
    this.defaultResource = {}
    this.save = this.save.bind(this)
    this.showGrid = this.showGrid.bind(this)
    this.load = this.load.bind(this)
    this.reset = this.reset.bind(this)
    this.sortByColumn = this.sortByColumn.bind(this)
    this.handle = this.handle.bind(this)
    this.overlayOn = this.overlayOn.bind(this)
    this.overlayOff = this.overlayOff.bind(this)
    this.editResource = this.editResource.bind(this)
    this.delayLoad = debounce(this.delayLoad, 1000)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.load()
    this.setState({resource: this.defaultResource})
  }

  finish() {
    this.load()
    this.overlayOff()
  }

  overlayOn() {
    this.setState({overlay: true})
  }

  overlayOff() {
    this.setState({overlay: false})
  }

  loadResource(key) {
    const resource = Object.assign({}, this.state.listing[key])
    this.setState({resource})
  }

  editResource(key) {
    this.loadResource(key)
    this.overlayOn()
  }
  
  deleteResource(key) {
    const resource = this.state.listing[key]
    if (confirm('Are you sure you want to delete this carousel along with all it\'s slides?')) {
      $.ajax({
        url: this.getUrl() + '/' + resource.id,
        dataType: 'json',
        type: 'delete',
        success: ()=>{
          this.setMessage(this.label +  ' deleted.', 'success')
          this.load()
        },
        error: ()=>{
          this.setMessage('Sorry. An error prevented deleting the ' + this.label, 'danger')
        }
      })
    }
  }

  handle(varname, value) {
    if (typeof value === 'object') {
      value = value.target.value
    }
    const resource = this.state.resource
    resource[varname] = value
    this.setState({resource})
  }

  reset() {
    this.overlayOff()
    this.setState({resource: Object.assign({}, this.defaultResource)})
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

  showGrid() {}

  setMessage(message, messageType = 'danger') {
    setTimeout(() => {
      this.clearMessage()
    }, 5000)

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
      data: {
        ...this.state.resource
      },
      dataType: 'json',
      type,
      success: () => {
        this.load()
        this.setMessage(
          <div>
            <i className="far fa-thumbs-up"></i>&nbsp;Save successful.</div>,
          'success'
        )
      },
      error: () => {
        this.setMessage(
          <div>
            <i className="fas fa-exclamation-triangle"></i>&nbsp;Unable to save&nbsp;{this.label}.</div>
        )
      },
      complete: () => this.reset()

    })
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

  navbarButton() {
    const label = (
      <span>
        <i className="fas fa-plus"></i>&nbsp;Create</span>
    )
    const button = (
      <NavbarButton
        color="outline-primary"
        label={label}
        handleClick={this.overlayOn}/>
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
    const button = this.navbarButton()

    const search = this.getSearch()
    return <Navbar
      leftSide={[button]}
      rightSide={[search]}
      background="light"
      className="border rounded"/>
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
