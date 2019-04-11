'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import Listing from '../Extends/Listing'
import Form from './Form'
import PropTypes from 'prop-types'

/* global carouselId, $ */

export default class Slide extends Listing {
  constructor(props) {
    super(props)
    this.state.overlay = true
    this.module = 'carousel'
    this.role = 'Admin'
    this.control = 'Slide'
    this.label = 'Slide'
    this.defaultResource = {
      id: 0,
      title: '',
      show_title: false,
      filepath: '',
      caption: '',
      queue: 0,
      url: '',
      caption_zone: 0,
      active: true,
      width: 0,
      height: 0,
      type: 0
    }
    this.columns = [
      {
        column: 'title',
        label: 'Title'
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

  upload(upload) {
    let formData = new FormData()
    formData.append('carouselId', this.props.carouselId)
    formData.append('file', upload.file)
    $.ajax({
      url: './carousel/Admin/Slide/upload',
      type: 'POST',
      data: formData,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      success: (data) => {
        console.log(data)
      },
      error: (data) => {
        console.log(data)
        alert(
          'Sorry but your file is unacceptable. It may be of the wrong type or too large ' +
          '(8MB is the maximum allowed). Please try again.'
        )
      }
    })
  }

  overlay() {
    const title = this.state.resource.id > 0 ? 'Edit slide' : 'Create slide'
    const form = (
      <Form
        close={this.finish}
        update={this.update}
        resource={this.state.resource}
        upload={this.upload}
        save={this.save}/>
    )
    return {content: (<div className="slide-form">{form}
    </div>), width: '80%', title: title, close: this.load}
  }
}

Slide.propTypes = {
  carouselId: PropTypes.string
}

ReactDOM.render(<Slide carouselId={carouselId}/>, document.getElementById(
  'Slide'
))
