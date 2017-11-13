import React, {Component} from 'react'
import { observer }       from 'mobx-react'
import { Badge, CardBlock, Col }          from 'reactstrap'

@observer
export default class NoteTags extends Component {
  
  componentDidMount() {
    console.log(this.props.tags)
  }

  renderTags() {
    const { notes, currentNote, tags } = this.props
    const notesTags                    = currentNote.student_note_tags
    const noteStoreTags                = tags.toJS()

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
          {this.renderTags()}
        </span>
      </Col>
    )
  }
}

