import React            from 'react'
import PropTypes        from 'prop-types'
import {observer}       from 'mobx-react'

import NoteEntry        from '../NoteEntry'
import Wrapper          from './Wrapper'
import ScrollView       from './ScrollView'
import LoadingSpinner   from 'ui/shell/LoadingSpinner'
import { List }         from 'antd'

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
        />
      </ScrollView>
    </Wrapper>
  )
}

const loading = (store) => ({
  spinning:  store.isLoading,
  indicator: <LoadingSpinner center /> 
})

export default observer(NoteList)