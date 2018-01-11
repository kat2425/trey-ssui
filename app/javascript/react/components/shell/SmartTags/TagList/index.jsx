import React          from 'react'
import PropTypes      from 'prop-types'
import {observer}     from 'mobx-react'

import LoadingSpinner from 'ui/shell/LoadingSpinner'
import TagEntry         from '../TagEntry'
import Wrapper          from './Wrapper'
import ScrollView       from './ScrollView'
import { Button, List } from 'antd'

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
    <div style={{ textAlign: 'center', marginTop: 12, height: 50, lineHeight: '50px' }}>
      {store.isFetchingTags && <LoadingSpinner center />}
      {!store.isFetchingTags && <Button onClick={store.pagination.loadMore}>Load More</Button>}
    </div>
  ) : null
}

export default observer(TagList)
