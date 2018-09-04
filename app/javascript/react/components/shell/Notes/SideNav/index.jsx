import React            from 'react'
import PropTypes        from 'prop-types'
import Header           from './Header'
import Aside            from './Aside'
import Content          from './Content'
import CreateButton     from './CreateButton'
import Search           from './Search'
import NoteList         from 'ui/shell/Notes/NoteList'
import renderIf         from 'ui/hoc/renderIf'

const ECreateButton = renderIf(CreateButton)

SideNav.propTypes = {
  noteStore: PropTypes.object.isRequired
}

export default function SideNav({noteStore, userStore}) {
  return (
    <Aside>
      <Header title='Notes'>
        <ECreateButton 
          note     = {noteStore.selectedNote} 
          store    = {noteStore} 
          renderIf = {!userStore.isParent}
        />
      </Header>
      <Search store={noteStore} />
      <Content>
        <NoteList store={noteStore}/>
      </Content>
    </Aside>
  )
}


