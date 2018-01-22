import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Modal                from 'react-modal'
import {scrollStyle}   from 'helpers/modal-style'

import {
  Switch, withRouter, Route, Redirect, Link as RRNavLink
} from 'react-router-dom'

import {
  Container,  Row,            Col,       Collapse,
  Button,     Card,           CardBlock, UncontrolledTooltip,
  Pagination, PaginationItem, PaginationLink,
  CardHeader, CardImg,        CardTitle, CardSubtitle, Badge, Table,
  ButtonGroup
} from 'reactstrap'

import UserMenuSection  from 'ui/shell/UserMenu/UserMenuSection'
import UserMenuItem     from 'ui/shell/UserMenu/UserMenuItem'
import VJSChart         from 'ui/vjs/VJSChart'
import LoadingSpinner   from 'ui/shell/LoadingSpinner'

import Info             from './Info'
import Overview         from './Overview'
import Assessment       from './Assessment'
import Grades           from './Grades'
import FinancialAid     from './FinancialAid'
import Contacts         from './Contacts'
import CourseAttendance from './CourseAttendance'
import Engagement       from './CommsHistory/'
import SurveyMonkey     from './SurveyMonkey'

// FIXME: needs to be inside StudentCard dir
import Notes           from '../Notes'

import CallingStore    from 'stores/CallingStore'

import fireEvent       from 'helpers/FireEvent'
import _               from 'lodash'

const cardStyle = {
  overlay: {
    zIndex:          1027,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },

  content: {
    zIndex:          1028,
    top:             55,
    bottom:          50,
    left:            0,
    right:           0,
    border:          'none',
    backgroundColor: '#f7f9fb',
    paddingBottom:   35,
    borderRadius:    0
  }
}

const CloseBtn = ({onClick}) => (
  <div className='float-right h4 p-1 pr-0 mb-2'>
    <span className='icon icon-cross' onClick={onClick} />
  </div>
)

@withRouter
@inject('uiStore')
@observer
export default class StudentCard extends Component {
  constructor(props) {
    super(props)

    this.student = this.props.store.student
    this.visible = this.props.store.visible
  }

  closeCard = () => {
    const { store, noteStore } = this.props

    noteStore.resetNoteForm()
    store.hideCard()
    fireEvent('onCloseStudentCard', { student: store.student.id })
  }

  render() {
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

  renderLoader = () => {
    <Row className='justify-content-sm-center align-items-sm-center h-100'>
      <LoadingSpinner/>
    </Row>
  }

  renderCard() {
    const { store, match, location } = this.props

    const {
      student,
      groupedContacts:      contacts,
      sortedCommunications: communications
    } = store

    return (
      <Row>
        <Col sm='2' style={scrollStyle}>
          <Info student={student} />

          <Card>
            {this.props.children}

            <UserMenuSection title='Details'>
              <UserMenuItem
                title     = 'Overview'
                iconClass = 'icon-list'
                link      = {`${match.url}/overview`}
                location  = {location}
              />

              <UserMenuItem
                title     = 'Contacts'
                iconClass = 'icon-users'
                link      = {`${match.url}/contacts`}
                location  = {location}
              />

              <UserMenuItem
                title     = 'Attendance'
                iconClass = 'icon-calendar'
                link      = {`${match.url}/attendance`}
                location  = {location}
              />

              {/* <UserMenuItem  */}
              {/*   title     = 'Discipline' */}
              {/*   iconClass = 'icon-thermometer' */}
              {/*   link      = {`${match.url}/discipline`} */}
              {/*   location  = {location} */}
              {/* />  */}

              <UserMenuItem
                title     = 'Assessment'
                iconClass = 'icon-bar-graph'
                link      = {`${match.url}/assessment`}
                location  = {location}
              />

              <UserMenuItem
                title     = 'Grades'
                iconClass = 'icon-ruler'
                link      = {`${match.url}/grades`}
                location  = {location}
              />

              <UserMenuItem
                title     = 'Engagement'
                iconClass = 'icon-swap'
                link      = {`${match.url}/engagement`}
                location  = {location}
              />

              <UserMenuItem
                title     = 'Student Surveys'
                iconClass = 'icon-help-with-circle'
                link      = {`${match.url}/student_surveys`}
                location  = {location}
              />

              <UserMenuItem
                title     = 'Notes'
                iconClass = 'icon-pencil'
                link      = {`${match.url}/notes`}
                location  = {location}
              />
            </UserMenuSection>
          </Card>

          <FinancialAid student={student} />
        </Col>

        {/* Root Container */}
        <Col sm='10'>
          <CloseBtn onClick={this.closeCard} />

          <Switch location={location}>
            <Redirect exact from={`${match.url}`} to={`${match.url}/overview`} />

            <Route
              path   = {`${match.url}/overview`}
              render = {() => <Overview student={student} handleClick={this.closeCard}/> }
            />

            <Route
              path   = {`${match.url}/contacts`}
              render = {() => <Contacts
                store             = {CallingStore}
                student           = {student}
                contacts          = {contacts}
                handleContactFave = {::this.props.store.toggleContactPrimary}
                handleSendEmail   = {::this.props.store.triggerNativeMailTo}
              /> }
            />

            <Route
              path   = {`${match.url}/attendance`}
              render = {() => <CourseAttendance student={student}/> }
            />

            <Route
              path   = {`${match.url}/assessment`}
              render = {() => <Assessment student={student}/> }
            />

            <Route
              path   = {`${match.url}/grades`}
              render = {() => <Grades student={student}/> }
            />

            <Route
              path   = {`${match.url}/engagement`}
              render = {() => <Engagement student={student} /> }
            />

            <Route
              path   = {`${match.url}/student_surveys`}
              render = {() => <SurveyMonkey student={student} /> }
            />

            <Route
              path   = {`${match.url}/notes`}
              render = {() => <Notes student={student} noteStore={this.props.noteStore}/> }
            />

            <Route render={() => <div>404</div>} />
          </Switch>
        </Col>
      </Row>
    )
  }
}
