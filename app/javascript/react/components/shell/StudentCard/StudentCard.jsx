import React, { Component } from 'react'
import { observer }         from 'mobx-react'
import Modal                from 'react-modal'

import {
  Container,  Row,            Col,       Collapse,
  Button,     Card,           CardBlock, UncontrolledTooltip,
  Pagination, PaginationItem, PaginationLink,
  CardHeader, CardImg,        CardTitle, Badge, Table,
  ButtonGroup
} from 'reactstrap'

import UserMenuSection from 'ui/shell/UserMenu/UserMenuSection'
import UserMenuItem    from 'ui/shell/UserMenu/UserMenuItem'
import VJSChart        from 'ui/vjs/VJSChart'

import Info            from './Info'
import Demographics    from './Demographics'
import FinancialAid    from './FinancialAid'
import Courses         from './Courses'

import fireEvent       from 'helpers/FireEvent'

const cardStyle = {
  overlay: {
    zIndex:          3000,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },

  content: {
    zIndex:          3050,
    top:             20,
    bottom:          20,
    left:            55,
    right:           55,
    borderRadius:    '0.25em',
    border:          'none',
    backgroundColor: '#f7f9fb'
  }
}

@observer
export default class StudentCard extends Component {
  constructor(props) {
    super(props)

    this.student = this.props.store.student
    this.visible = this.props.store.visible
  }

  closeCard = () => {
    const {store} = this.props

    store.hideCard()
    fireEvent('onCloseStudentCard', {student: store.student.id})
  }

  render() {
    return (
      <Modal style={cardStyle} isOpen={this.props.store.visible} contentLabel='Student Card'>
        { this.props.store.student ? this.renderCard() : null }
      </Modal>
    )
  }

  renderCard() {
    const student  = this.props.store.student
    const contacts = this.props.store.groupedContacts

    return (
      <Row>
        <Col sm='3'>
          <Info student={student}/>
          <Demographics student={student}/>
          <FinancialAid student={student}/>

          <Card>
            {/* <h5 className='p-2 pb-0 mb-0'>Details</h5> */}
            <UserMenuSection title='Details'>
              <UserMenuItem title='Overview' iconClass='icon-list' />
              <UserMenuItem title='Attendance' iconClass='icon-calendar' />
              <UserMenuItem title='Discipline' iconClass='icon-thermometer' />
              <UserMenuItem title='Assessment' iconClass='icon-bar-graph' />
            </UserMenuSection>
          </Card>
        </Col>

        <Col sm='9'>
          <h4 className='m-1 mb-3'>
            Overview
            <div className='float-right'>
              <span className='icon icon-cross' onClick={this.closeCard}/>
            </div>
          </h4>

          <div>
            <Courses student={student}/>

            <Card>
              <Table>
                <thead>
                  <tr>
                    <td><strong>Name</strong></td>
                    <td><strong>Relationship</strong></td>
                    <td><strong>Phone</strong></td>
                    <td><strong>Email</strong></td>
                  </tr>
                </thead>

                <tbody>
                  { contacts.map(c => this.renderContacts(c)) }
                </tbody>
              </Table>
            </Card>
          </div>
        </Col>
      </Row>
    )
  }

  renderContacts(contact) {
    return (
      <tr key={ `${contact.name}_${contact.relationship}` }>
        <td>{ contact.name }</td>
        <td>{ contact.relationship }</td>

        <td>
          {/* TODO: extract to function */}
          { contact.refs.map(ref => {
            return (
              <div key={ref.id} className='mb-1'>
                <ButtonGroup className='mr-2'>
                  <Button size='sm' color='success' disabled>
                    <span className='icon icon-phone'/>
                  </Button>

                  <Button size='sm' color='primary' disabled={ref.number_type !== 'mobile'}>
                    <span className='icon icon-chat'/>
                  </Button>
                </ButtonGroup>

                { ref.phone }
                <br/>
              </div>
            )
          }) }
        </td>

        <td>
          {/* TODO: extract to function */}
          {/* NOTE: should we uniq the email addy's in the store? */}
          { _.uniqBy(contact.refs.map((ref, i) => {
            return (
              <div key={ref.id} className='mb-1'>
                <Button size='sm' color='info' className='mr-2' disabled>
                  <span className='icon icon-mail'/>
                </Button>
                { ref.email }
              </div>
            )
          }), 'email') }
        </td>
      </tr>
    )
  }
}
