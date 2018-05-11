import React        from 'react'
import { observer } from 'mobx-react'
import { Badge }    from 'reactstrap'

import Wrapper      from './Wrapper'
import MemberList   from '../MemberList'

const MemberAside = ({ group, store }) => {
  const badgeColor = group.groupType === 'student' ? 'success' : 'primary'
  
  return (
    <Wrapper style={{maxHeight: '65vh', overflow: 'auto'}}>
      <div className='d-flex align-items-center'>
        <h4 className='p-4 text-muted'>{group.groupName} Members</h4>
        <h4><Badge color={badgeColor} style={{marginRight: '20px'}}>{group.members.size}</Badge></h4>
      </div>
      <MemberList
        group = {group}
        store = {store}
        paginate = {false}
      />
    </Wrapper>
  )
}

export default observer(MemberAside)
