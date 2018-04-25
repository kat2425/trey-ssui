import React          from 'react'
import PropTypes      from 'prop-types'
import {observer}     from 'mobx-react'

import TagEntry       from '../TagEntry'
import Wrapper        from './Wrapper'
import ScrollView     from './ScrollView'
import { List }       from 'antd'
import SSButton       from 'ui/shell/SSButton'

TagList.propTypes = {
  store: PropTypes.object.isRequired
}

function TagList({store}) {
  return (
    <Wrapper>
      <ScrollView>
        <List
          style      = {{borderTop: '1px solid rgba(0,0,0,0.125)'}}
          itemLayout = "horizontal"
          loadMore   = {loadMore(store)}
          dataSource = {store.orderedTags}
          renderItem = {tag => <TagEntry tag={tag} />}
        />
      </ScrollView>
    </Wrapper>
  )
}

const loadMore = (store) => {
  return store.pagination.showLoadingMore ? (
    <div className='text-center my-4'>
      <SSButton 
        loading = {store.isFetchingTags}
        onClick = {store.pagination.loadMore}
      >
        Load More
      </SSButton>
    </div>
  ) : null
}

export default observer(TagList)
