import React        from 'react'
import { observer } from 'mobx-react'
import { Badge }    from 'reactstrap'

import Wrapper      from './Wrapper'
import TitleWrapper from './TitleWrapper'
import Title        from './Title'
import Preview      from './Preview'

const GroupItem = ({ group, onClick }) => {
  return (
    <Wrapper
      active  = {group.isActive} 
      onClick = {() => onClick(group)} 
    >
      <TitleWrapper>
        <Title isNew={group.isNew} title={group.groupName}>
          {group.groupName || 'Untitled Group'}
        </Title>
        {renderTypeTag(group)}   
      </TitleWrapper>
      <Preview>
        {group.description}
      </Preview>    
    </Wrapper>
  )
}

function renderTypeTag(group) {
  return (
    <Badge className='ml-2' color={group.groupType === 'user' ? 'info' : 'success'}>{group.groupType}</Badge>
  )
}

export default observer(GroupItem)