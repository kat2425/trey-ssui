import React          from 'react'
import { observer }   from 'mobx-react'
import styled         from 'styled-components'
import Paginatron     from 'ui/shell/Paginatron'
import { List }       from 'antd'
import LoadingSpinner from 'ui/shell/LoadingSpinner'
import MemberItem     from './MemberItem'

const MemberList = ({ group, store, paginate = true }) => {
  const { members, pagination } = group
  const { shouldSearch, searchResults } = store

  return (
    <div>
      <GList
        locale     = {{ emptyText: 'No members yet' }}
        itemLayout = 'horizontal'
        loading    = {loading(group, store)}
        dataSource = {shouldSearch ? searchResults : members.values().reverse()}
        renderItem = {(member) => renderItem(group, member)}
      />
      <div className='mt-4'>
        {(paginate && pagination.totalPages > 1) &&
          <Paginatron
            totalPages  = {pagination.totalPages}
            currentPage = {pagination.current}
            onChange    = {pagination.onChange}
          />
        }
      </div>
    </div>
  )
}

function renderItem(group, member) {
  return (
    <MemberItem group={group} member={member} />
  )
}

const GList = styled(List)`
  & .ant-spin-dot {
    margin-left: -32px !important;
    width: auto !important;
    height: auto !important;
  }
`

const loading = (group, store) => ({
  spinning:  group.isFetchingMembers || store.isSearching,
  indicator: <LoadingSpinner center />
})

export default observer(MemberList)
