import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Modal                from 'react-modal'
import {scrollStyle}        from 'helpers/modal-style'

import {
  Switch, withRouter, Route, Redirect
} from 'react-router-dom'

import {
  Row, Col, Card
} from 'reactstrap'

import UserMenuSection  from 'ui/shell/UserMenu/UserMenuSection'
import UserMenuItem     from 'ui/shell/UserMenu/UserMenuItem'
import LoadingSpinner   from 'ui/shell/LoadingSpinner'

import Info             from './Info'
import Overview         from './Overview'
import Assessment       from './Assessment'
import Assessments      from './Assessments/Assessment'
import Infractions      from './Infractions'
import FinancialAid     from './FinancialAid'
import Contacts         from './Contacts/'
import Attachments      from './Attachments/'
import Grades           from './Grades'
import CourseAttendance from './CourseAttendance'
import PeriodAttendance from './PeriodAttendance'
import Attendance       from './Attendance'
import Engagement       from './CommsHistory/'
import SurveyMonkey     from './SurveyMonkey'

import Notes            from '../Notes'

import renderIf         from 'ui/hoc/renderIf'
import userStore        from 'stores/UserStore'
import fireEvent        from 'helpers/FireEvent'

const EFinancialAid = renderIf(FinancialAid)
const EUserMenuItem = renderIf(UserMenuItem)

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
    borderRadius:    0,
    border:          'none',
    backgroundColor: '#f7f9fb',
    paddingLeft:     '15px',
    paddingRight:    '15px',
    paddingTop:      '0px',
    paddingBottom:   '0px',
    height:          'calc(100vh - 103px)'
  }
}

const CloseBtn = ({embedded, handlePrint, handleClose}) => (
  <div className='float-right h4 p-1 pr-0 mb-2 mt-3' style={{cursor: 'pointer'}}>
    <span className='icon icon-print mr-2' onClick={handlePrint} />
    {!embedded ? <span className='icon icon-cross' onClick={handleClose} /> : ''}
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
    const { store } = this.props

    store.hideCard()
    fireEvent('onCloseStudentCard')
  }

  printCard = () => {
    const { store } = this.props

    store.printStudentCard()
  }

  render() {
    const { store, embedded } = this.props
    const { student } = store

    const content = embedded ? (
      <div>
        {student ? this.renderCard() : this.renderLoader()}
      </div>
    ) : (
      <Modal
        style={cardStyle}
        isOpen
        onRequestClose = {this.closeCard}
        contentLabel   = 'Student Card'
      >
        {student ? this.renderCard() : this.renderLoader()}
      </Modal>
    )

    return content
  }

  renderLoader = () => {
    <Row className='justify-content-sm-center align-items-sm-center'>
      <LoadingSpinner/>
    </Row>
  }

  renderCard() {
    const { store, match, location } = this.props

    const {
      student,
      overview,
    } = store

    return (
      <Row>
        <Col xl='2' lg='3' md='3' sm='3' style={scrollStyle}>
          <Info student={student} />

          <Card className='mb-3'>
            {this.props.children}

            <UserMenuSection>
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

              <EUserMenuItem
                title     = 'Attendance'
                iconClass = 'icon-calendar'
                link      = {`${match.url}/course_attendance`}
                location  = {location}
                renderIf  = {userStore.user.higherEd}
              />

              <EUserMenuItem
                title     = 'Attendance'
                iconClass = 'icon-calendar'
                link      = {`${match.url}/attendance`}
                location  = {location}
                renderIf  = {!(userStore.user.higherEd)}
              />

              <EUserMenuItem
                title     = 'Course Attendance'
                iconClass = 'icon-sweden'
                link      = {`${match.url}/period_attendance`}
                location  = {location}
                renderIf  = {userStore.hasModules('vjs_course_attendance')}
              />

              <EUserMenuItem
                title     = 'Discipline'
                iconClass = 'icon-thermometer'
                link      = {`${match.url}/infractions`}
                location  = {location}
                renderIf  = {!(userStore.user.higherEd) && (userStore.hasModules('discipline'))}
              />

              <EUserMenuItem
                title     = 'Assessment'
                iconClass = 'icon-area-graph'
                link      = {`${match.url}/assessment_act_higher_ed`}
                location  = {location}
                renderIf  = {userStore.user.higherEd}
              />

              <EUserMenuItem
                title     = 'Assessment'
                iconClass = 'icon-area-graph'
                link      = {`${match.url}/assessment`}
                location  = {location}
                renderIf  = {!(userStore.user.higherEd)}
              />

              <EUserMenuItem
                title     = 'Grades'
                iconClass = 'icon-check'
                link      = {`${match.url}/grades`}
                location  = {location}
                renderIf  = {!(userStore.user.higherEd)}
              />

              <UserMenuItem
                title     = 'Engagement'
                iconClass = 'icon-swap'
                link      = {`${match.url}/engagement`}
                location  = {location}
              />

              <EUserMenuItem
                title     = 'Student Surveys'
                iconClass = 'icon-help-with-circle'
                link      = {`${match.url}/student_surveys`}
                location  = {location}
                renderIf  = {userStore.user.higherEd}
              />

              <UserMenuItem
                title     = 'Notes'
                iconClass = 'icon-pencil'
                link      = {`${match.url}/notes`}
                location  = {location}
              />

              <UserMenuItem
                title     = 'Attachments'
                iconClass = 'icon-attachment'
                link      = {`${match.url}/attachments`}
                location  = {location}
              />
            </UserMenuSection>
          </Card>

          <EFinancialAid student={student} renderIf={userStore.hasModules('vjs_financials')} />
        </Col>

        {/* Root Container */}
        <Col xl='10' lg='9' md='9' sm='9'>
          <CloseBtn 
            embedded={this.props.embedded}
            handlePrint={this.printCard}
            handleClose={this.closeCard}
          />

          <Switch location={location}>
            <Redirect exact from={`${match.url}`} to={`${match.url}/overview`} />

            <Route
              path   = {`${match.url}/overview`}
              render = {() =>
                <Overview
                  student  = {student}
                  overview = {overview}
                  higherEd = {userStore.user.higherEd}
                />
              }
            />

            <Route
              path   = {`${match.url}/contacts`}
              render = {() => <Contacts student={student} /> }
            />

            <Route
              path   = {`${match.url}/course_attendance`}
              render = {() => <CourseAttendance student={student}/> }
            />

            <Route
              path   = {`${match.url}/attendance`}
              render = {() => <Attendance student={student}/> }
            />

            <Route
              path   = {`${match.url}/period_attendance`}
              render = {() => <PeriodAttendance student={student}/> }
            />

            <Route
              path   = {`${match.url}/infractions`}
              render = {() => <Infractions student={student}/> }
            />

            <Route
              path   = {`${match.url}/assessment_act_higher_ed`}
              render = {() => <Assessment student={student}/> }
            />

            <Route
              path   = {`${match.url}/grades`}
              render = {() => <Grades student={student}/> }
            />

            {/* <Route */}
            {/*   path   = {`${match.url}/assessment/maap`} */}
            {/*   render = {() => <MAAP student={student}/> } */}
            {/* /> */}

            <Route
              path   = {`${match.url}/assessment`}
              render = {() => <Assessments student={student}/> }
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

            <Route
              path   = {`${match.url}/attachments`}
              render = {() => <Attachments student={student} /> }
            />

            <Route render={() => <div>404</div>} />
          </Switch>
        </Col>
      </Row>
    )
  }
}
