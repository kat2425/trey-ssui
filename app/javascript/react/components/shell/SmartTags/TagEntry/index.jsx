import React                 from 'react'
import PropTypes             from 'prop-types'
import {observer}            from 'mobx-react'

import Wrapper               from './Wrapper'
import TagMenu               from './TagMenu'
import { ModifiedIndicator } from 'ui/shell/SmartTags'

TagEntry.propTypes = {
  active:  PropTypes.bool,
  tag:     PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

function TagEntry({tag, active, onClick}){
  return (
    <Wrapper active={active} onClick={onClick}>
      <div style={tagNameStyle(tag.isNew)}><ModifiedIndicator tag={tag}>{tag.name}</ModifiedIndicator></div>
      <TagMenu tag={tag} className='text-muted' />
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
