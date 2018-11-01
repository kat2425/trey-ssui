import React, {Component}   from 'react'
import { observer }         from 'mobx-react'
import SideNav              from './SideNav'
import noteStore            from 'stores/NoteStore'
import NoteView             from './NoteView'
import NoteForm             from './NoteForm'
import Wrapper              from './NoteView/Wrapper'
import ActionBar            from './NoteView/ActionBar'
import PrintAllButton       from './SideNav/PrintAllButton'
import _get                 from 'lodash/get'
import {
  Col, Row
} from 'antd'

@observer
export default class Notes extends Component {
  componentDidMount() {
    noteStore.resetNotes(this.props.student.id)
  }

  renderNote = (note) => {
    if(_get(note, 'isNew')) {
      return (
        <NoteForm note={note} store={noteStore} />
      )
    } else {
      return (
        <NoteView 
          store={noteStore} 
          note={noteStore.selectedNote}
        />
      )
    }
  }

  renderMain = () => {
    const { selectedNote } = noteStore

    if(selectedNote) {
      return (
        <Wrapper>
          <ActionBar store={noteStore} note={selectedNote} userStore={this.props.userStore} />
          {this.renderNote(selectedNote)}
        </Wrapper>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <Row type='flex'>
        <Col 
          style={{ background: '#fff'}} 
          xs={24} 
          sm={24} 
          md={6} 
          lg={5}
        >
          <SideNav noteStore={noteStore} userStore={this.props.userStore} />
        </Col>
        <Col 
          style={{
            borderLeft: '1px solid rgba(0,0,0,0.125)', 
            minHeight:  'calc(100vh - 108px)'
          }} 
          xs={24} 
          sm={24} 
          md={18} 
          lg={19}
        >
          <div className='mt-3 mr-2 text-right'>
            <PrintAllButton store={noteStore} />
          </div>
          {this.renderMain()}
        </Col>
      </Row>
    )
  }
}
