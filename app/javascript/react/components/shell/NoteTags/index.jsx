import React, {Component}        from 'react'
import { toJS }                  from 'mobx'
import { observer }              from 'mobx-react'
import { Badge, Col }            from 'reactstrap'
import _                         from 'lodash'

@observer
export default class NoteTags extends Component {
  renderTags() {
    const { currentNote, tags } = this.props
    const notesTags                    = currentNote.student_note_tags
    const noteStoreTags                = toJS(tags)

    return notesTags.map((g) => {
      return _.find(noteStoreTags, (tag) => { return tag.id === g.id })
    })
      .map((t) => 
        <Badge key={ t.id } color="primary" pill style={{ marginRight: 5 }}>
          <span className='icon icon-tag' style={{ padding: 5 }}>{' '}{t.name}</span>
        </Badge>
      )
  }

  render() {
    return (
      <Col sm="6">
        <span className="float-right">
          {!_.isEmpty(this.noteStoreTags) && this.renderTags()}
        </span>
      </Col>
    )
  }
}

