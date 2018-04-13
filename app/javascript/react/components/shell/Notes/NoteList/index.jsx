import React            from 'react'
import PropTypes        from 'prop-types'
import {observer}       from 'mobx-react'
import _                from 'lodash'

import NoteEntry        from '../NoteEntry'
import Wrapper          from './Wrapper'
import ScrollView       from './ScrollView'
import LoadingSpinner   from 'ui/shell/LoadingSpinner'
import { Button, List } from 'antd'

NoteList.propTypes = {
  store: PropTypes.object.isRequired
}

function NoteList({store}) {
  return (
    <Wrapper>
      <ScrollView>
        <List
          locale     = {{emptyText: 'No notes for this student'}}
          loading    = {loading(store)}
          style      = {{borderTop: '1px solid rgba(0,0,0,0.125)'}}
          itemLayout = 'horizontal'
          dataSource = {store.orderedNotes}
          renderItem = {note => <NoteEntry note={note} />}
          loadMore   = {loadMore(store)}
        />
      </ScrollView>
    </Wrapper>
  )
}

const loading = (store) => ({
  spinning:  (_.isEmpty(store.orderedNotes) && store.isLoading),
  indicator: <LoadingSpinner center /> 
})

const loadMore = (store) => {
  return store.pagination.showLoadingMore ? (
    <div style={{ textAlign: 'center', marginTop: 12, height: 50, lineHeight: '50px' }}>
      {store.isLoading && <LoadingSpinner center />}
      {!store.isLoading && <Button onClick={store.pagination.loadMore}>Load More</Button>}
    </div>
  ) : null
}

export default observer(NoteList)
