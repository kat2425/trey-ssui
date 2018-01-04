import React                 from 'react'
import PropTypes             from 'prop-types'
import {observer}            from 'mobx-react'

import Wrapper               from './Wrapper'
import SettingsButton        from './SettingsButton'
import { ModifiedIndicator } from 'ui/shell/SmartTags'

TagEntry.propTypes = {
  active: PropTypes.bool,
  tag:    PropTypes.shape({
    id:       PropTypes.string.isRequired,
    name:     PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isNew:    PropTypes.bool.isRequired
  }).isRequired,
  onClick:         PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func
}

function TagEntry({tag, active, onClick, onSettingsClick}){
  return (
    <Wrapper active={active} onClick={onClick}>
      <div style={tagNameStyle(tag.isNew)}><ModifiedIndicator tag={tag}>{tag.name}</ModifiedIndicator></div>
      <SettingsButton className='text-muted' onClick={onSettingsClick} />
    </Wrapper>
  )
}

function tagNameStyle(isNew){
  if(!isNew) return

  return {
    fontStyle: 'italic'
  }
}

export default observer(TagEntry)
