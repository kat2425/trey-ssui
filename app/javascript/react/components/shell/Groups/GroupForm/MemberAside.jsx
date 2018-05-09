import React        from 'react'
import { observer } from 'mobx-react'

import Wrapper      from './Wrapper'
import MemberList   from '../MemberList'

const MemberAside = ({ group, store }) => {
  return (
    <Wrapper style={{maxHeight: '65vh', overflow: 'auto'}}>
      <h4 className='p-4 text-muted'>{group.groupName} Members</h4>
      <MemberList
        group = {group}
        store = {store}
        paginate = {false}
      />
    </Wrapper>
  )
}

export default observer(MemberAside)