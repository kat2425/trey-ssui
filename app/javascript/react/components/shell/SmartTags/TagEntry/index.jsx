import React                 from 'react'
import PropTypes             from 'prop-types'
import {observer}            from 'mobx-react'
import { Badge }             from 'reactstrap'
import renderIf              from 'render-if'

import Wrapper               from './Wrapper'
import TagMenu               from './TagMenu'
import Title                 from './Title'
import Aside                 from './Aside'
import {
  FaEyeSlash,
  FaGlobe,
  FaGroup,
  FaLock
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
    <Wrapper 
      active={tag.isActive} 
      onClick={tag.handleOnTagClick} 
      isModified={tag.isModified && !tag.isNew}
    >
      <Title title={tag.name} isNew={tag.isNew}>
        {tag.name}
      </Title>
      <Aside>
        {renderIf(tag.isNew)(
          <Badge className='mr-2' color='primary'>New</Badge>
        )}
        {renderIf(tag.isModified && !tag.isNew)(
          <Tooltip title={'You have unsaved changes.'}>
            <Badge className='mr-2' color='danger'>Not Saved</Badge>
          </Tooltip>
        )}
        <div>
          {renderIf(tag.isGlobal)(
            <ScopeIcon type='global' title='This list is public to the whole district.'/>
          )}
          {renderIf(tag.isGroup)(
            <ScopeIcon type='group' title='This list is shared with groups.'/>
          )}
          {renderIf(tag.isPrivate)(
            <ScopeIcon type='private' title='This list is visible only to me.'/>
          )}
          {renderIf(!tag.modifiable)(
            <ScopeIcon type='locked' title='This list cannot be modified.'/>
          )}
        </div>
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
          return <FaGlobe style={icStyle} />
        case 'group':
          return <FaGroup style={icStyle} />
        case 'private':
          return <FaEyeSlash style={icStyle} />
        case 'locked':
          return <FaLock style={icStyle} />
        default:
          return null
        }
      })()
    }
  </Tooltip>
)

export default observer(TagEntry)
