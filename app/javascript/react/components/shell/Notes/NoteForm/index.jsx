import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import { observer }       from 'mobx-react'
import Wrapper            from './Wrapper'
import EditTitle          from '../NoteView/EditTitle'
import EditBody           from '../NoteView/EditBody'
import { Select }         from 'antd'
import groupStore         from 'stores/GroupStore'
import VisibilitySelector from './VisibilitySelector'
import TagSelector        from './TagSelector'

@observer
export default class NoteForm extends Component {
  static propTypes = {
    note:  PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {isNew} = this.props.note

    if(isNew) {
      this.handleDefaultFocus()
    }
  }

  componentDidUpdate() {
    const {shouldFocusTitle} = this.props.note
    
    if(shouldFocusTitle) {
      this.handleDefaultFocus()
    }
  }

  handleDefaultFocus() {
    this.titleInput.focus()
    this.titleInput.select()
  }


  render() {
    const {store, note} = this.props

    if(!store || !note) return null

    return (
      <Wrapper>
        <EditTitle
          innerRef={(input) => this.titleInput = input}
          className='mb-4'
          type="text"
          onChange={store.editTitleOnChange}
          value={store.selectedNote.title}
        />
        <EditBody 
          className='mb-4'
          onChange={store.editBodyOnChange}
          value={store.selectedNote.body}
        />

        <TagSelector store={store} note={note} />
        
        <div className='d-flex'>
          <VisibilitySelector note={note} />

          {note.showGroupSelector && 
            <Select
              labelInValue 
              className    = 'ml-4'
              onChange     = {(e) => note.handleSelectGroup(e)}
              defaultValue = {note.defaultGroups}
              mode         = "tags"
              style        = {{ minWidth: 235 }}
              placeholder  = "Select groups..."
            >
              {
                groupStore.groups.values().map((g) => {
                  return <Select.Option key={g.id} value={g.id}>{g.groupName}</Select.Option>
                })
              }
            </Select>
          }
        </div>
      </Wrapper>
    )
  }
}