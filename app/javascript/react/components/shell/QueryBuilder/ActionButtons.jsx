import React      from 'react'
import PropTypes  from 'prop-types'
import { Button } from 'reactstrap'

ActionButtons.propTypes = {
  disabled: PropTypes.bool,
  onTest:   PropTypes.func,
  onSave:   PropTypes.func
}
export default function ActionButtons({disabled = true, onTest, onSave}) {
  return (
    <div className='d-flex my-4 justify-content-end'>
      <Button 
        onClick={onSave} 
        disabled={!disabled} 
        color='success'
      >
        Save Tag
      </Button>
      <Button
        onClick={onTest}
        className='ml-2'
        disabled={!disabled}
        color='primary'
      >
        Test Tag
      </Button>
    </div>
  )
}
