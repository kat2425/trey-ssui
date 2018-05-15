import React            from 'react'
import { observer }     from 'mobx-react'
import styled           from 'styled-components'
import { List }         from 'antd'
import RelatedGroupItem from './RelatedGroupItem'
import _                from 'lodash'

const RelatedGroupsList = ({group, store}) => {
  return (
    <div>
      <GList
        itemLayout = 'horizontal'
        dataSource = {!_.isEmpty(group.childGroups) ? group.childGroups : [group.parentGroup]}
        renderItem = {renderItem(store)}
      />
    </div>
  )
}

const renderItem = (store) => (group) => {
  return (
    <RelatedGroupItem group={group} store={store} />
  )
}

const GList = styled(List)`
  & .ant-spin-dot {
    margin-left: -32px !important;
    width: auto !important;
    height: auto !important;
  }
`

export default observer(RelatedGroupsList)
