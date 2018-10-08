import React                   from 'react'
import { UncontrolledTooltip } from 'reactstrap'

const PhoneNumber = ({contact, className}) => {
  const { stopped, id, phone, flagged } = contact
  const showTooltip = stopped || flagged

  return (
    <React.Fragment>
      <span id={`id-${id}`} style={wrapperStyle(contact)} className={className}>
        {stopped && <span style={iconStyle(stopped)} className = 'icon icon-circle-with-cross mr-2' />}
        {phone}
      </span>
      {showTooltip && (
        <UncontrolledTooltip
          placement = 'top'
          target    = {`id-${id}`}
        >
          {tooltip(contact)}
        </UncontrolledTooltip>
      )}
    </React.Fragment>
  )
}

const wrapperStyle = ({stopped, flagged}) => ({
  textDecoration: stopped ? 'line-through' : 'inherit',
  color:          flagged || stopped ? '#d24f4c' : 'inherit'
})

const iconStyle = stopped => ({
  display: stopped ? 'inline-block' : 'none'
})


const tooltip = ({stopped, flagged}) => {
  if(stopped) {
    return 'This number has requested no communication via SchoolStatus.'
  } 

  if(flagged) { 
    return 'This number has been flagged as inactive. You may still attempt to contact the number.'
  }
}

export default PhoneNumber
