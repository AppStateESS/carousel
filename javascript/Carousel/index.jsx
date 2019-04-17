'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import Listing from '../Extends/Listing'
import Form from './Form'

export default class Carousel extends Listing {
  constructor(props) {
    super(props)
    this.module = 'carousel'
    this.role = 'Admin'
    this.control = 'Carousel'
    this.label = 'Carousel'
    this.form = this.form.bind(this)
    this.defaultResource = {
      id: 0,
      title: '',
      iterations: '2',
      intervalTime: '4',
      indicator: '0',
      controls: true,
      pause: true
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
            <i className="fas fa-edit"></i>&nbsp;Edit Carousel</a>
        )
      }, {
        handleClick: this.command.bind(this),
        data: {
          command: 'slides'
        },
        label: (
          <a href="#">
            <i className="fas fa-images"></i>&nbsp;Update Slides</a>
        )
      }, {
        handleClick: this.command.bind(this),
        data: {
          command: 'delete'
        },
        label: (
          <a href="#">
            <i className="fas fa-trash"></i>&nbsp;Delete Carousel</a>
        )
      }
    ]
    this.state.resource = this.defaultResource
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

      case 'slides':
        location.href = './carousel/Admin/Slide/?carousel=' + this.state.listing[data.name].id
        break
    }
  }

  form() {
    return (
      <Form
        close={this.finish}
        update={this.update}
        resource={this.state.resource}
        save={this.save}/>
    )
  }

  overlay() {
    return {
      content: <div className="carousel-form">{this.form()}</div>,
      width: '80%',
      title: 'Edit Carousel',
      close: this.load
    }
  }

}
ReactDOM.render(<Carousel/>, document.getElementById('Carousel'))