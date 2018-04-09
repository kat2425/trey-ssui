import React      from 'react'
import PropTypes  from 'prop-types'
import SSButton   from 'ui/shell/SSButton'


ActionButtons.propTypes = {
  disabled:      PropTypes.bool,
  modifiable:    PropTypes.bool,
  loadingOnTest: PropTypes.bool,
  loadingOnSave: PropTypes.bool,
  isModified:    PropTypes.bool,
  onTest:        PropTypes.func,
  onSave:        PropTypes.func
}
export default function ActionButtons({
  disabled      = true,
  modifiable    = true,
  loadingOnTest = false,
  loadingOnSave = false,
  isModified    = false,
  onTest,
  onSave
}) {
  return (
    <div className='d-flex my-4 justify-content-between mr-3'>
      <SSButton
        type      = 'default'
        className = 'btn btn-secondary'
        onClick   = {() => onSave()}
        disabled  = {disabled || !modifiable}
        iconClass = {isModified ? 'icon icon-save text-white' : 'icon icon-save text-muted'}
        loading   = {loadingOnSave}
        color     = {isModified && 'danger'}
      >
        Save List
      </SSButton>

      <SSButton
        type      = 'default'
        onClick   = {() => onTest()}
        disabled  = {disabled}
        loading   = {loadingOnTest}
        iconClass = "icon icon-controller-play text-muted"
      >
        Run
      </SSButton>
    </div>
  )
}
