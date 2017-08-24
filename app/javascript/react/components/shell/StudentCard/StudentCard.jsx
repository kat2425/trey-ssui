import React, { Component }  from 'react'
import { observer }          from 'mobx-react'
import Modal                 from 'react-modal'
import { withRouter, Route } from 'react-router-dom'

import {
  Container,  Row,            Col,       Collapse,
  Button,     Card,           CardBlock, UncontrolledTooltip,
  Pagination, PaginationItem, PaginationLink,
  CardHeader, CardImg,        CardTitle, CardSubtitle, Badge, Table,
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

@withRouter
@observer
export default class StudentCard extends Component {
  constructor (props) {
    super(props)

    this.student = this.props.store.student
    this.visible = this.props.store.visible
  }

  closeCard = () => {
    const { store } = this.props

    store.hideCard()
    fireEvent('onCloseStudentCard', { student: store.student.id })
  }

  render () {
    const { store } = this.props
    const { isLoading, student } = store

    return (
      <Modal
        style={cardStyle}
        isOpen
        onRequestClose={this.closeCard}
        contentLabel='Student Card'
      >
        {student ? this.renderCard() : this.renderLoader()}
      </Modal>
    )
  }

  renderLoader = () =>
    <Row className='justify-content-sm-center align-items-sm-center h-100'>
      {/* TODO: use a better loading indicator */}
      <h3>Loading student ...</h3>
    </Row>

  renderCard () {
    const { store, match } = this.props
    const { student, groupedContacts: contacts } = store

    return (
      <Row>
        <Col sm='3'>
          <Info student={student} />
          <Demographics student={student} />
          <FinancialAid student={student} />

          <Card>
            {/* <h5 className='p-2 pb-0 mb-0'>Details</h5> */}
            <UserMenuSection title='Details'>
              <UserMenuItem
                title='Overview'
                iconClass='icon-list'
                link={`${match.url}/overview`}
              />
              <UserMenuItem
                title='Attendance'
                iconClass='icon-calendar'
                link={`${match.url}/attendance`}
              />
              <UserMenuItem
                title='Discipline'
                iconClass='icon-thermometer'
                link={`${match.url}/discipline`}
              />
              <UserMenuItem
                title='Assessment'
                iconClass='icon-bar-graph'
                link={`${match.url}/assessment`}
              />
            </UserMenuSection>
          </Card>
        </Col>

        <Col sm='9'>
          <h4 className='m-1 mb-3'>
            Overview
            <div className='float-right'>
              <span className='icon icon-cross' onClick={this.closeCard} />
            </div>
          </h4>

          <div>
            <Courses student={student} />
            <Card>
              <Table>
                <thead>
                  <tr>
                    <td>
                      <strong>Name</strong>
                    </td>
                    <td>
                      <strong>Relationship</strong>
                    </td>
                    <td>
                      <strong>Phone</strong>
                    </td>
                    <td>
                      <strong>Email</strong>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {contacts.map(c => this.renderContacts(c))}
                </tbody>
              </Table>
            </Card>
          </div>

          <Row>
            <Col sm='4' className='m-1 mt-3'>
              <Route
                path={`${match.url}/overview`}
                render={({ match }) => this.renderSubComponents('Overview')}
              />
              <Route
                path={`${match.url}/attendance`}
                render={({ match }) => this.renderSubComponents('Attendance')}
              />
              <Route
                path={`${match.url}/discipline`}
                render={({ match }) => this.renderSubComponents('Discipline')}
              />
              <Route
                path={`${match.url}/assessment`}
                render={({ match }) => this.renderSubComponents('Assessment')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

  renderSubComponents = page =>
    <Card>
      <CardImg src={`http://via.placeholder.com/318x180?text=${page}`} />
      <CardBlock>
        <CardSubtitle className='text-center'>sub component</CardSubtitle>
      </CardBlock>
    </Card>

  renderContacts (contact) {
    return (
      <tr key={`${contact.name}_${contact.relationship}`}>
        <td>
          {contact.name}
        </td>
        <td>
          {contact.relationship}
        </td>

        <td>
          {/* TODO: extract to function */}
          {contact.refs.map(ref => {
            return (
              <div key={ref.id} className='mb-1'>
                <ButtonGroup className='mr-2'>
                  <Button size='sm' color='success' disabled>
                    <span className='icon icon-phone' />
                  </Button>

                  <Button
                    size='sm'
                    color='primary'
                    disabled={ref.number_type !== 'mobile'}
                  >
                    <span className='icon icon-chat' />
                  </Button>
                </ButtonGroup>

                {ref.phone}
                <br />
              </div>
            )
          })}
        </td>

        <td>
          {/* TODO: extract to function */}
          {/* NOTE: should we uniq the email addy's in the store? */}
          {_.uniqBy(
            contact.refs.map((ref, i) => {
              return (
                <div key={ref.id} className='mb-1'>
                  <Button size='sm' color='info' className='mr-2' disabled>
                    <span className='icon icon-mail' />
                  </Button>
                  {ref.email}
                </div>
              )
            }),
            'email'
          )}
        </td>
      </tr>
    )
  }
}
