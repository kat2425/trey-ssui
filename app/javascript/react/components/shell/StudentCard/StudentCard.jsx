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

import StudentAvatar   from 'ui/shell/StudentAvatar'

import VJSChart        from 'ui/vjs/VJSChart'

import fireEvent       from 'helpers/FireEvent'

const cardStyle = {
  overlay: {
    zIndex: 3000,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },

  content: {
    zIndex: 3050,
    top:    20,
    bottom: 20,
    left: 55,
    right: 55,
    borderRadius: '0.25em',
    border: 'none',
    backgroundColor: '#f7f9fb'
  }
}

const cardHeader = {
  backgroundImage: 'url(https://secure.schoolstatus.com/images/student-card-overview-bg.png)',
  height: 80
}

const iconStyle = { fontSize: '16px' }

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
            <Card className='card-profile mb-4'>
              <CardHeader style={cardHeader}/>

              <CardBlock className='text-xs-center mb-0'>
                <StudentAvatar id={student.id} size={95} className='card-profile-img mx-auto' />
                <br/>
                <CardTitle>{student.first_name} {student.last_name}</CardTitle>
                <h6>{ student.school.school_name }</h6>
                <br/>

                <ul className='card-menu'>
                  <li className='card-menu-item'>
                    <strong>ID Number</strong>
                    <br/>
                    <h6><Badge color='success'>{student.state_id}</Badge></h6>
                  </li>

                  <li className='card-menu-item'>
                    <strong>Grade</strong>
                    <br/>
                    <h6><Badge color='info'>{ student.grade }</Badge></h6>
                  </li>

                  <li className='card-menu-item'>
                    <strong>Enrolled?</strong>
                    <br/>
                    <h6><Badge color='danger'>{ student.enrollment_status }</Badge></h6>
                  </li>
                </ul>
              </CardBlock>

            </Card>

            <Card className='mb-4'>
              <CardBlock>
                <h5>Demographics</h5>

                <ul className='list-unstyled list-spaced'>
                  <li>
                    <span className='mr-3 text-muted icon icon-cake' style={iconStyle}/>
                    <span>Birthdate: </span>
                    <span className='text-info'>{ student.dob }</span>
                  </li>

                  <li>
                    <span className='mr-3 text-muted icon icon-info-with-circle' style={iconStyle}/>
                    <span>Race: </span>
                    <span className='text-info'>{ student.race }</span>
                  </li>

                  <li>
                    <span className='mr-3 text-muted icon icon-v-card' style={iconStyle}/>
                    <span>Gender: </span>
                    <span className='text-info'>{ student.gender }</span>
                  </li>
                </ul>
              </CardBlock>
            </Card>

            <div>
              <VJSChart
                id               = 'sc-financial-aid-types'
                reportPath       = '/public/VJS/ss_ui/financials/student_card'
                scale            = 'container'
                title            = 'Financial Aid Types'
                isTable          = {true}
                ignorePagination = {true}
                params           = {{
                  student_id: [ student.id ]
                }}
              />
            </div>

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
              <VJSChart
                id         = 'sc-student-courses'
                reportPath = '/public/VJS/ss_ui/courses/student_card'
                scale      = 'container'
                title      = 'Schedule'
                isTable    = {true}
                params     = {{
                  student_id: [ student.id ]
                }}
              />

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
                      { contacts.map(c => {
                        return this.renderContacts(c)
                      }) }
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
