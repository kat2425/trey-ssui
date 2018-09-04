import React          from 'react'
import { observer }   from 'mobx-react'
import { Badge }      from 'reactstrap'

import Wrapper        from './Wrapper'
import MemberList     from '../MemberList'
import LoadingSpinner from 'ui/shell/LoadingSpinner'
import InfiniteScroll from 'react-infinite-scroller'

const MemberAside = ({ group, store }) => {
  const badgeColor = group.groupType === 'student' ? 'success' : 'primary'
  const { pagination } = group

  return (
    <Wrapper style={{ maxHeight: '65vh', overflow: 'auto' }}>
      <div className='d-flex align-items-center'>
        <h4 className='p-4 text-muted'>{group.groupName} Members</h4>
        <h4><Badge color={badgeColor} style={{ marginRight: '20px' }}>{group.pagination.total}</Badge></h4>
      </div>
      <InfiniteScroll
        initialLoad = {false}
        pageStart   = {0}
        loadMore    = {group.loadMoreMembers}
        loader      = {<LoadingSpinner key={0} center />}
        hasMore     = {pagination.current < pagination.totalPages}
        useWindow   = {false}
      >
        <MemberList
          group    = {group}
          store    = {store}
          paginate = {false}
        />
      </InfiniteScroll>
    </Wrapper>
  )
}

export default observer(MemberAside)
