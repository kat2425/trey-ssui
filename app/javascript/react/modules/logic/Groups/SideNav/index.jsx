import React                       from 'react'

import Header                      from './Header'
import Aside                       from './Aside'
import Content                     from './Content'
import CreateButton                from './CreateButton'
import Search                      from './Search'

import GroupList                   from 'ui/shell/Groups/GroupList'
import Tabs                        from 'ui/shell/Groups/GroupList/Tabs'

export default function SideNav({groupStore}) {
  return (
    <Aside>
      <Header title='Groups'>
        <CreateButton groupStore={groupStore} />
      </Header>
      <Search groupStore={groupStore}/>
      <Tabs style={{width: '100%'}} store={groupStore}/>
      <Content>
        <GroupList store={groupStore} onClick={groupStore.setSelectedGroup} />
      </Content>
    </Aside>
  )
}
