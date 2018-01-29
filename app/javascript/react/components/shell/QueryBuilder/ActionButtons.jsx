import React      from 'react'
import PropTypes  from 'prop-types'
import { Button } from 'antd'

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
    <div className='d-flex my-4 justify-content-between mr-3'>
      <Button
        onClick  = {() => onSave()}
        disabled = {disabled}
        icon     = 'save'
        loading  = {loadingOnSave}
        type     = 'default'
      >
        Save Tag
      </Button>

      <Button
        type      = 'default'
        onClick   = {() => onTest()}
        disabled  = {disabled}
        loading   = {loadingOnTest}
        icon      = "play-circle-o"
      >
        Run
      </Button>
    </div>
  )
}
