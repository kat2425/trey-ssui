import React      from 'react'
import PropTypes  from 'prop-types'
import { Button } from 'antd'
import 'antd/lib/button/style/css'

ActionButtons.propTypes = {
  disabled:      PropTypes.bool,
  loadingOnTest: PropTypes.bool,
  loadingOnSave: PropTypes.bool,
  onTest:        PropTypes.func,
  onSave:        PropTypes.func
}
export default function ActionButtons({
  disabled      = true,
  loadingOnTest = false,
  loadingOnSave = false,
  onTest, 
  onSave
}) {
  return (
    <div className='d-flex my-4 justify-content-end'>
      <Button.Group>
        <Button 
          onClick  = {() => onSave()}
          disabled = {disabled}
          icon     = 'cloud-upload-o'
          loading  = {loadingOnSave}
          type     = 'primary'
        >
          Save Tag
        </Button>
        <Button
          type      = 'primary'
          ghost
          onClick   = {() => onTest()}
          disabled  = {disabled}
          loading   = {loadingOnTest}
          icon      = "play-circle-o"
        >
          Test Tag
        </Button>
      </Button.Group>
    </div>
  )
}
