import React from 'react'

import {
  Switch, Route, withRouter, Redirect
} from 'react-router-dom'

import UserMenu                from 'ui/shell/UserMenu/UserMenu'

import Attendance            from 'modules/logic/Attendance'
import Infractions           from 'modules/logic/Infractions'
import Financials            from 'modules/logic/Financials'
import MyStudents            from 'modules/logic/MyStudents'
import RiskAnalysis          from 'modules/logic/RiskAnalysis'
import TagBuilder            from 'modules/logic/TagBuilder/'

import CallHistory           from 'modules/channel/History'
import ChannelEngagement     from 'modules/channel/Engagement'

// Assessment
import Assessments           from 'modules/logic/assessment/Assessment'

import FinalResults          from 'modules/logic/accountability/FinalResults'
import LPS                   from 'modules/logic/accountability/LPS'

import SMSController         from 'ui/controllers/SMSController'

import StudentCardController from 'ui/controllers/StudentCardController'

import UserSettings          from 'modules/UserSettings'
import EmptyMessage          from 'ui/shell/EmptyMessage'

const AppContainer = ({match}) => {
  return (
    <div className='col-md-10 offset-md-2 mb-5' style={{overflowY: 'scroll'}}>
      <UserMenu />
      <Switch>
        <Redirect exact from='/r/' to='/r/my_students' />

        {/* Logic */}
        <Route path='/r/my_students' component={MyStudents} />
        <Route path='/r/attendance' component={Attendance} />
        <Route path='/r/infractions' component={Infractions} />

        <Route path='/r/assessment' component={Assessments} />

        <Route path='/r/financials' component={Financials} />
        <Route path='/r/risk_analysis' component={RiskAnalysis} />
        <Route path='/r/searchlight' component={TagBuilder} />

        <Route path='/r/accountability/final_results' component={FinalResults} />
        <Route path='/r/accountability/lps' component={LPS} />

        {/* Channel */}
        <Route path='/r/channel/inbox' component={SMSController} />
        <Route path='/r/channel/history' component={CallHistory} />
        <Route path='/r/channel/engagement' component={ChannelEngagement} />

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

      <Route path='*/students/:studentId' component={StudentCardController} />
    </div>
  )
}

export default withRouter(AppContainer)
