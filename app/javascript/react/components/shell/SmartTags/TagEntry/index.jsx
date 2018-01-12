import React                 from 'react'
import PropTypes             from 'prop-types'
import {observer}            from 'mobx-react'

import Wrapper               from './Wrapper'
import TagMenu               from './TagMenu'
import Title                 from './Title'
import Aside                 from './Aside'
import { ModifiedIndicator } from 'ui/shell/SmartTags'
import {
  FaEyeSlash,
  FaEye,
  FaGroup
} from 'react-icons/lib/fa'

import {
  Tooltip,
  Icon
} from 'antd'

TagEntry.propTypes = {
  tag: PropTypes.object.isRequired,
}

function TagEntry({tag}){
  return (
    <Wrapper active={tag.isActive}>
      <Title title={tag.name} isNew={tag.isNew} onClick={tag.handleOnTagClick}>
        <Icon type='tag-o' className='mr-2'/>
        <ModifiedIndicator tag={tag}>{tag.name}</ModifiedIndicator>
      </Title>
      <Aside>
        {!tag.isNew && (
          <div>
            {tag.isGlobal  && <ScopeIcon type='global' title='This tag is shared with other users.'/>}
            {tag.isGroup   && <ScopeIcon type='group' title='This tag is shared with groups.'/>}
            {tag.isPrivate && <ScopeIcon type='private' title='This tag is not shared with other users.'/>}
          </div>
        )}
        <TagMenu tag={tag} className='text-muted' />
      </Aside>
    </Wrapper>
  )
}

const icStyle = {
  fontSize: 14
}
const ScopeIcon = ({type, title}) => ( 
  <Tooltip title={title}>
    {
      (() => {
        switch(type){
        case 'global':
          return <FaEye style={icStyle} />
        case 'group':
          return <FaGroup style={icStyle} />
        case 'private':
          return <FaEyeSlash style={icStyle} />
        default:
          return null
        }
      })()
    }
  </Tooltip>
)

export default observer(TagEntry)
