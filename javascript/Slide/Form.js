'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone-uploader'
import BigCheckbox from '@essappstate/canopy-react-bigcheckbox'
import './style.scss'
import 'react-dropzone-uploader/dist/styles.css'

const Form = ({close, update, resource, save, upload}) => {

  const uploadPrompt = (
    <div key="1">
      <div className="upload-text">Click to browse<br/>- or -<br/>drag image or video file here.</div>
    </div>
  )

  return (
    <div>
      <div className="mb-3">
        <BigCheckbox
          label="Active"
          checked={resource.active}
          handle={update.bind(null, 'active')}/>
      </div>
      <Dropzone
        classNames={{
          dropzone: 'dropzone'
        }}
        accept="image/jpg,image/png,video/mp4,video/webm"
        getUploadParams={upload}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        canRestart={false}
        minSizeBytes={1024}
        maxSizeBytes={8388608}
        inputContent={uploadPrompt}
        autoUpload={true}/>
      <div className="row mt-3 mb-3">
        <div className="col-sm-3">
          <label>Title</label>
        </div>
        <div className="col-sm-9">
          <input
            className="form-control"
            type="text"
            name="title"
            placeholder="Appears on image, above caption"
            value={resource.title}
            onChange={update.bind(null, 'title')}/>
          <div className="ml-3">
            <BigCheckbox
              label="Show title"
              checked={resource.show_title}
              handle={update.bind(null, 'show_title')}/>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-3">
          <label htmlFor="caption">Caption</label>
        </div>
        <div className="col-sm-9">
          <textarea
            className="form-control"
            placeholder="If not blank, appears on image, below title."
            name="caption"
            value={resource.caption}
            onChange={update.bind(null, 'caption')}/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <label htmlFor="caption_zone">Caption zone</label>
        </div>
        <div className="col-sm-4">
          <select
            className="form-control"
            name="caption_zone"
            value={resource.caption_zone}
            onChange={update.bind(null, 'caption_zone')}>
            <option value="" disabled="disabled">Choose where you want your caption to appear</option>
            <option value="0" label="Center">Center</option>
            <option value="1" label="Top left">Top left</option>
            <option value="2" label="Top right">Top right</option>
            <option value="3" label="Bottom left">Bottom left</option>
            <option value="4" label="Bottom right">Bottom right</option>
          </select>
        </div>
      </div>
    </div>
  )
}

Form.propTypes = {
  resource: PropTypes.object,
  finish: PropTypes.func,
  save: PropTypes.func,
  update: PropTypes.func
}

export default Form
