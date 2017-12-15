import React          from 'react'
import PropTypes      from 'prop-types'
import {observer}     from 'mobx-react'

import Wrapper        from './Wrapper'
import SettingsButton from './SettingsButton'

TagEntry.propTypes = {
  active: PropTypes.bool,
  tag:    PropTypes.shape({
    id:       PropTypes.string.isRequired,
    name:     PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
  }).isRequired,
  onClick:         PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func
}

function TagEntry({tag, active, onClick, onSettingsClick}){
  return (
    <Wrapper active={active} onClick={onClick}>
      <div>{tag.name}</div>
      <SettingsButton className='text-muted' onClick={onSettingsClick} />
    </Wrapper>
  )
}


export default observer(TagEntry)
