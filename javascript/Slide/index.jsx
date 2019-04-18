'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import Listing from '../Extends/Listing'
import Form from './Form'
import PropTypes from 'prop-types'
import ratio from '../Extends/ratio'
import BigCheckbox from '@essappstate/canopy-react-bigcheckbox'
import {NavbarLink} from '@essappstate/react-navbar'
import './style.scss'

/* global carouselId, carouselTitle, $ */

export default class Slide extends Listing {
  constructor(props) {
    super(props)
    this.state.overlay = false
    this.state.dropzone = {
      remove: () => {},
      file: null,
      meta: null
    }
    this.module = 'carousel'
    this.role = 'Admin'
    this.control = 'Slide'
    this.label = 'Slide'
    this.defaultResource = {
      id: '0',
      carouselId: props.carouselId,
      title: '',
      show_title: false,
      filepath: '',
      caption: '',
      queue: '0',
      url: '',
      caption_zone: '0',
      active: true,
      width: '0',
      height: '0',
      type: '0'
    }
    this.columns = [
      {
        column: 'active',
        callback: (row, key) => {
          return (
            <BigCheckbox checked={row.active} handle={this.toggleActive.bind(this, key)}/>
          )
        }
      }, {
        column: 'thumbnail',
        callback: (value) => {
          return <img src={value.thumbnail}/>
        }
      }, {
        column: 'title',
        label: 'Title'
      }, {
        label: 'Dimensions/Ratio',
        callback: (row) => {
          return <div>{row.width}x{row.height}&nbsp;/&nbsp;{ratio(row.width, row.height)}</div>
        }
      }
    ]
    this.contextMenu = [
      {
        handleClick: this.command.bind(this),
        data: {
          command: 'edit'
        },
        label: (
          <a href="#">
            <i className="fas fa-edit"></i>&nbsp;Edit slide</a>
        )
      }, {
        handleClick: this.command.bind(this),
        data: {
          command: 'delete'
        },
        label: (
          <a href="#">
            <i className="fas fa-trash"></i>&nbsp;Delete slide</a>
        )
      }
    ]
    this.state.resource = this.defaultResource
    this.upload = this.upload.bind(this)
    this.removeMedia = this.removeMedia.bind(this)
    this.saveMedia = this.saveMedia.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
  }

  command(event, data) {
    event.preventDefault()
    switch (data.command) {
      case 'edit':
        this.editResource(data.name)
        break

      case 'delete':
        this.deleteResource(data.name)
        break

    }
  }

  dropzoneReset() {
    const {dropzone} = this.state
    dropzone.remove()
    dropzone.file = null
    dropzone.meta = null
    this.setState({dropzone})
  }

  reset() {
    super.reset()
    this.dropzoneReset()
  }

  toggleActive(key) {
    const {listing} = this.state
    const resource = listing[key]
    resource.active = resource.active === '1'
      ? '0'
      : '1'
    $.ajax({
      url: `./carousel/Admin/Slide/${resource.id}/active`,
      data: {
        'active': resource.active
      },
      dataType: 'json',
      type: 'patch',
      success: () => {
        listing[key] = resource
        this.setState({listing})
      },
      error: () => {}
    })
  }

  title() {
    return <h3>Slides:&nbsp;<a href="./carousel/Admin/Carousel">{this.props.carouselTitle}</a>
    </h3>
  }

  removeMedia() {
    this.update('filepath', '')
    const {dropzone} = this.state
    dropzone.remove()
    dropzone.file = null
    dropzone.meta = null
    this.setState({dropzone})
  }

  upload(dropzone) {
    const {resource} = this.state
    if (resource.title.length === 0) {
      resource.title = dropzone.file.name.replace(/\.(jpg|jpeg|png|gif)$/, '')
      resource.title = resource.title.replace(/-/, ' ')
    }
    this.setState({resource, dropzone})
  }

  navLeft() {
    const left = super.navLeft()
    const back = <NavbarLink href="./carousel/Admin/Carousel">Carousel list</NavbarLink>
    left.push(back)
    return left
  }

  saveMedia(slideId) {
    const formData = new FormData()
    formData.append('slideId', slideId)
    formData.append('file', this.state.dropzone.file)
    $.ajax({
      url: './carousel/Admin/Slide/media',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      type: 'post',
      success: () => {
        this.load()
        this.setMessage(
          <div>
            <i className="far fa-thumbs-up"></i>&nbsp;Save successful.</div>,
          'success'
        )
      },
      error: (data) => {
        let message = <div>An unknown error occurred</div>
        if (data.responseJSON.exception.message !== undefined) {
          message = data.responseJSON.exception.message
        } else if (data.exception.message !== undefined) {
          message = data.exception.message
        }
        this.setMessage(<div>{message}</div>)
      }
    })
  }

  success(data) {
    if (data.success) {
      this.saveMedia(data.slideId)
    } else {
      this.setMessage(
        <div>
          <i className="fas fa-exclamation-triangle"></i>&nbsp;Unable to save: {data.error}</div>
      )
    }
  }

  overlay() {
    const title = this.state.resource.id > 0
      ? 'Edit slide'
      : 'Create slide'
    const form = (
      <Form
        close={this.finish}
        update={this.update}
        resource={this.state.resource}
        upload={this.upload}
        dropzone={this.state.dropzone}
        save={this.save}
        removeMedia={this.removeMedia}/>
    )
    return {content: (<div className="slide-form">{form}
    </div>), width: '80%', title: title, close: this.load}
  }
}

Slide.propTypes = {
  carouselId: PropTypes.string,
  carouselTitle: PropTypes.string
}

ReactDOM.render(
  <Slide carouselId={carouselId} carouselTitle={carouselTitle}/>,
  document.getElementById(
    'Slide'
  )
)
