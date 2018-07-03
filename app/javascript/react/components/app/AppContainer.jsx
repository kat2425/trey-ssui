import React from 'react'

import {
  Switch, Route, withRouter, Redirect
} from 'react-router-dom'

import styled                from 'styled-components'

import UserMenu              from 'ui/shell/UserMenu/UserMenu'

import Attendance            from 'modules/logic/Attendance'
import CourseAttendance      from 'modules/logic/CourseAttendance'
import TeacherAttendance     from 'modules/logic/TeacherAttendance'
import Infractions           from 'modules/logic/Infractions'
import Financials            from 'modules/logic/Financials'
import MyStudents            from 'modules/logic/MyStudents'
import MySchools             from 'modules/logic/Dashboard/MySchools'
import RiskAnalysis          from 'modules/logic/RiskAnalysis'
import TagBuilder            from 'modules/logic/TagBuilder/'
import Groups                from 'modules/logic/Groups'
import SeatingChart          from 'ui/shell/SeatingChart'

import CallHistory           from 'modules/channel/History'
import ChannelEngagement     from 'modules/channel/Engagement'

// Assessment
import Assessments           from 'modules/logic/assessment/Assessment'

// Insights/DataScience
import GrowthCusp            from 'modules/logic/insights/GrowthCusp'
import AIMSWebiReady         from 'modules/logic/insights/AIMSWebiReady'
import JCJCBinary            from 'modules/logic/insights/JCJCBinary'

import SneakPeek             from 'modules/logic/accountability/SneakPeek'
import FinalResults          from 'modules/logic/accountability/FinalResults'
import LPS                   from 'modules/logic/accountability/LPS'

import SMSController         from 'ui/controllers/SMSController'

import UserSettings          from 'modules/UserSettings'
import EmptyMessage          from 'ui/shell/EmptyMessage'
import userStore             from 'stores/UserStore'

const HeightRestrictedDiv = styled.div.attrs({ className: 'col-md-10 offset-md-2' })`
  height: calc(100vh - 108px) !important;
  margin-top: -13px;
  overflow-y: auto;
`


const AppContainer = ({ match }) => {
  const defaultRoute = (userStore.user.isTeacher || userStore.user.higherEd)
    ? '/r/my_students'
    : '/r/my_schools'

  return (
    <HeightRestrictedDiv>
      <UserMenu />
      <Switch>
        <Redirect exact from='/r/' to={defaultRoute} />

        {/* Logic */}
        <Route path='/r/my_schools' component={MySchools} />
        <Route path='/r/my_students' component={MyStudents} />
        <Route path='/r/attendance' component={Attendance} />
        <Route path='/r/course_attendance' component={CourseAttendance} />
        <Route path='/r/teacher_attendance' component={TeacherAttendance} />
        <Route path='/r/infractions' component={Infractions} />

        <Route path='/r/assessment' component={Assessments} />

        <Route path='/r/financials' component={Financials} />
        <Route path='/r/seating_chart/:course_id' component={SeatingChart} />
        <Route path='/r/risk_analysis' component={RiskAnalysis} />
        <Route path='/r/searchlight' component={TagBuilder} />

        <Route path='/r/groups' component={Groups} />

        <Route path='/r/accountability/sneak_peek' component={SneakPeek} />
        <Route path='/r/accountability/final_results' component={FinalResults} />
        <Route path='/r/accountability/lps' component={LPS} />

        {/* Channel */}
        <Route path='/r/channel/inbox' component={SMSController} />
        <Route path='/r/channel/history' component={CallHistory} />
        <Route path='/r/channel/engagement' component={ChannelEngagement} />

        {/* Insights */}
        <Route path='/r/growth_cusp' component={GrowthCusp} />
        <Route path='/r/aimsweb_iready' component={AIMSWebiReady} />
        <Route path='/r/jcjc_binary' component={JCJCBinary} />

        {/* Misc */}
        <Route path='/r/user_settings' component={UserSettings} />

        <Route render={() => {
          return (
            <EmptyMessage title="Oops!  Something's Missing..." icon='tools'>
              It looks like you've come across a feature that's not quite ready, yet.  Bear with us
              as we wrap up the last pieces of SchoolStatus 3.  Thank you for beta-testing!
            </EmptyMessage>
          )
        }}
        />
      </Switch>

    </HeightRestrictedDiv>
  )
}

export default withRouter(AppContainer)
