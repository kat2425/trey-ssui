import React          from 'react'
import PropTypes      from 'prop-types'
import {observer}     from 'mobx-react'
import _              from 'lodash'

import NoteEntry      from '../NoteEntry'
import Wrapper        from './Wrapper'
import ScrollView     from './ScrollView'
import LoadingSpinner from 'ui/shell/LoadingSpinner'
import { List }       from 'antd'
import styled         from 'styled-components'
import SSButton       from 'ui/shell/SSButton'

NoteList.propTypes = {
  store: PropTypes.object.isRequired
}

function NoteList({store}) {
  return (
    <Wrapper>
      <ScrollView>
        <SList
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

const loadMore = store => {
  return store.pagination.showLoadingMore ? (
    <div className='text-center my-4'>
      <SSButton 
        loading = {store.isLoading}
        onClick = {store.pagination.loadMore}
      >
        Load More
      </SSButton>
    </div>
  ) : null
}

const SList = styled(List)`
  & .ant-spin-dot {
    margin-left: -32px !important;
    width: auto !important;
    height: auto !important;
  }
`

export default observer(NoteList)
