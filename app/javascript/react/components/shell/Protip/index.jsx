import React           from 'react'
import PropTypes       from 'prop-types'
import { Alert, Icon } from 'antd'
import _isEmpty        from 'lodash/isEmpty'
import uuid            from 'uuid'

Protip.propTypes = {
  tips:  PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

function Protip({ tips, title }) {
  if(isInStorage(title)) return null
  
  return (
    <Alert
      message     = {getMessage()}
      description = {tips.map(getDescription)}
      type        = "warning"
      closable
      afterClose={() => addToStorage(title)}
    />
  )
}

function getMessage() {
  return (
    <div className='mb-3'>
      <Icon className='mr-1' type="bulb" /> 
      <span>Pro-tips</span>
    </div>
  )
}

function getDescription(e) {
  return (
    <div key={uuid()} className='mb-1' style={{wordBreak: 'break-word'}}>
      <p className='mb-0'>
        <strong>{e.label}</strong>
      </p>
      <p>{e.content}</p>
    </div>
  )
}

function isInStorage(title) {
  if(!window.localStorage) return false

  return !_isEmpty(window.localStorage.getItem(title))
}

function addToStorage(title) {
  !_isEmpty(window.localStorage) && window.localStorage.setItem(title, true)
}

export default Protip