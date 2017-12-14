import React          from 'react'
import PropTypes      from 'prop-types'
import {observer}     from 'mobx-react'

import Wrapper        from './Wrapper'
import SettingsButton from './SettingsButton'

TagEntry.propTypes = {
  active: PropTypes.bool.isRequired,
  tag:    PropTypes.shape({
    id:       PropTypes.string.isRequired,
    name:     PropTypes.string.isRequired,
    query:    PropTypes.object.isRequired,
    isGlobal: PropTypes.bool.isRequired,
    user:     PropTypes.bool.isRequired,
    group:    PropTypes.bool.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

function TagEntry({tag, active, onClick, onSettingsClick}){
  const {name} = tag

  return (
    <Wrapper active={active} onClick={onClick}>
      <div>{name}</div>
      <SettingsButton className='text-muted' onClick={onSettingsClick} />
    </Wrapper>
  )
}


export default observer(TagEntry)
