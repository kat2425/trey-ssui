import React          from 'react'
import PropTypes      from 'prop-types'
import Header         from './Header'
import Aside          from './Aside'
import Content        from './Content'
import CreateButton   from './CreateButton'
import Search         from './Search'
import NoteList       from 'ui/shell/Notes/NoteList'

SideNav.propTypes = {
  noteStore: PropTypes.object.isRequired
}

export default function SideNav({noteStore}) {
  return (
    <Aside>
      <Header title='Notes'>
        <CreateButton note={noteStore.selectedNote} store={noteStore} />
      </Header>
      <Search store={noteStore} />
      <Content>
        <NoteList store={noteStore}/>
      </Content>
    </Aside>
  )
}


