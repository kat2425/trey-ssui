import React          from 'react'
import { observer }   from 'mobx-react'
import { List }       from 'antd'
import styled         from 'styled-components'

import Wrapper        from './Wrapper'
import ScrollView     from './ScrollView'
import GroupItem      from 'ui/shell/Groups/GroupItem'
import LoadingSpinner from 'ui/shell/LoadingSpinner'

const GroupList = ({store, onClick}) => {
  return (
    <Wrapper>
      <ScrollView>
        <GList
          locale     = {{emptyText: 'No groups to show'}}
          loading    = {loading(store)}
          itemLayout = 'horizontal'
          dataSource = { store.orderedGroups }
          renderItem = { group => <GroupItem group={group} onClick={() => onClick(group)} />}
        />
      </ScrollView>
    </Wrapper>
  )
}

const loading = (store) => ({
  spinning:  (store.isLoading),
  indicator: <LoadingSpinner center />
})

const GList = styled(List)`
  & .ant-spin-dot {
    margin-left: -32px !important;
    width: auto !important;
    height: auto !important;
  }
`

export default observer(GroupList)
