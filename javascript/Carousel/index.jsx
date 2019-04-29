'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import Listing from '../Extends/Listing'
import BigCheckbox from '@essappstate/canopy-react-bigcheckbox'
import Form from './Form'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

/* global $ */

export default class Carousel extends Listing {
  constructor(props) {
    super(props)
    this.module = 'carousel'
    this.role = 'Admin'
    this.control = 'Carousel'
    this.label = 'Carousel'
    this.form = this.form.bind(this)
    this.defaultResource = {
      id: '0',
      title: '',
      transition: '1',
      iterations: '2',
      intervalTime: '4',
      indicator: '0',
      controls: true,
      pause: true
    }

    const dropdown = (key) => {
      return (
        <div className="dropdown">
          <button
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            className="btn btn-outline-secondary"
          id="dropdownMenuButton">
            <FontAwesomeIcon icon={faBars}/>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              className="dropdown-item pointer"
              href={`./carousel/Admin/Slide/?carouselId=${this.state.listing[key].id}`}><i className="fas fa-images"></i>&nbsp;Slides</a>
            <a
              className="dropdown-item pointer"
              href="#"
              onClick={this.editResource.bind(this, key)}>
              <i className="fas fa-edit"></i>&nbsp;Edit</a>
            <a
              className="dropdown-item pointer"
              href="#"
              onClick={this.deleteResource.bind(this, key)}>
              <i className="fas fa-trash"></i>&nbsp;Delete</a>
          </div>
        </div>
      )
    }

    this.columns = [
      {
        column: 'options',
        callback: (row, key) => {
          return dropdown(key)
        },
        style: {
          width: '10%'
        }

      }, {
        column: 'title',
        label: 'Title'
      }, {
        column: 'frontpage',
        callback: (row, key) => {
          return (
            <BigCheckbox
              checked={row.frontpage === '1'}
              handle={this.sentToFrontPage.bind(this, key)}/>
          )
        },
        label: 'Front page',
        style: {
          width: '20%'
        }
      }
    ]

    this.state.resource = this.defaultResource
  }

  sentToFrontPage(key) {
    const {listing} = this.state
    const resource = listing[key]
    $.ajax({
      url: `./carousel/Admin/Carousel/${resource.id}/frontpage`,
      dataType: 'json',
      type: 'patch',
      success: () => {
        this.load()
      },
      error: (data) => this.error(data)
    })
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
  
  title() {
    return <h2>Carousels</h2>
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
