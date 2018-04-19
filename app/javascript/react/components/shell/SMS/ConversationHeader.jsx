// FIXME
// Make header dry
// Add Contact object as a prop
// Make stateless component

import React, { Component} from 'react'
import PropTypes           from 'prop-types'
import { observer }        from 'mobx-react'
import { Col }             from 'reactstrap'
import ContactLink         from 'ui/shell/ContactLink'

const headerStyle = {
  position: 'absolute',
  top:      37
}

@observer
export default class ConversationHeader extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  renderHeader() {
    const {contact}    = this.props
    const studentId    = contact.student_id
    const studentName  = contact.student.full_name
    const relationship = contact.relationship

    return (
      <div key={ contact.id } className='text-right'>
        <ContactLink 
          vertical
          tag          = 'h4' 
          name         = {contact.name}
          studentId    = {studentId} 
          relationship = {relationship} 
          studentName  = {studentName} 
        />
        <span className='text-muted m-0'>{ contact.phone }</span>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Col className='float-left col-sm-1' style={headerStyle}>
          <span
            onClick   = {this.props.handleBack}
            style     = {{lineHeight: '20px'}}
            className = 'icon icon-chevron-thin-left cursor-pointer'
          />
        </Col>

        <Col className='float-right pt-3 col-sm-11'>
          {this.renderHeader()}
        </Col>
      </div>
    )
  }
}
