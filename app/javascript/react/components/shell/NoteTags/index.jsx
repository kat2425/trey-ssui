import React, {Component}        from 'react'
import { toJS }                  from 'mobx'
import { observer }              from 'mobx-react'
import { Badge, Col }            from 'reactstrap'
import _                         from 'lodash'
import { Tag }                   from 'antd'

@observer
export default class NoteTags extends Component {
  renderTags() {
    const { currentNote, tags } = this.props
    const currentTags           = currentNote.student_note_tags
    const noteStoreTags         = toJS(tags)

    if(_.isEmpty(currentTags)) {
      return null
    }

    return currentTags.map((g) => {
      return _.find(noteStoreTags, (tag) => { return tag.id === g.id })
    }).map((t) => 
      <Tag className='mb-2'>{t.name}</Tag>
    )
  }

  render() {
    return (
      <Col sm="6">
        <span>
          <span style={{color: '#3f9fcf'}}>Tags: </span> 
          {this.renderTags()}
        </span>
      </Col>
    )
  }
}

