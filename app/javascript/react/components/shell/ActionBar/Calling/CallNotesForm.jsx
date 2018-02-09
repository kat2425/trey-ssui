import React                   from 'react'
import { observer }            from 'mobx-react'
import { Button }              from 'reactstrap'

const wrapperStyle = bottom => ({
  padding:         '25px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  width:           '35%',
  position:        'absolute',
  left:            '0px',
  right:           '0px',
  transition:      '0.5s all',
  bottom:          bottom
})

const CallNotesForm = observer(({
  onSave,
  onCancel,
  Text,
  onTextChange,
  contactName,
  bottomPosition
}) => {
  return (
    <div style={wrapperStyle(bottomPosition)}>
      <h2 style={{ color: 'dimgray' }}>Take a Note</h2>
      <p style={{ color: 'darkgray' }}>
        Call with <span style={{ fontWeight: 'bold' }}>{contactName}</span>
      </p>
      <textarea
        style    = {{ width: '100%', padding: 10, color: 'dimgray', border: 'solid 1px dimgray' }}
        value    = {Text}
        onChange = {onTextChange}
      />
      <Button
        className = 'mt-4 mr-2'
        onClick   = {onSave}
        color     = 'primary'
      >
        Save Note
      </Button>
      <Button
        className = 'mt-4 mr-2'
        onClick   = {onCancel}
      >
        Cancel
      </Button>
    </div>
  )
})

export default CallNotesForm