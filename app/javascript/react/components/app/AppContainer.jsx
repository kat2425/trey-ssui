import React                 from 'react'
import { Switch, Route, withRouter, Redirect }     from 'react-router-dom'

import Attendance            from 'modules/logic/Attendance'
import Infractions           from 'modules/logic/Infractions'
import Financials            from 'modules/logic/Financials'
import MyStudents            from 'modules/logic/MyStudents'

import ChannelHistory        from 'modules/channel/History'
import ChannelEngagement     from 'modules/channel/Engagement'

import TVAASController       from 'ui/controllers/TVAASController'
import SMSController         from 'ui/controllers/SMSController'

import StudentCardController from 'ui/controllers/StudentCardController'

import DumbContainer         from 'ui/shell/DumbContainer'

const AppContainer = ({match}) => {
  return (
    <div className='col-md-10 offset-md-2 mb-5'>
      <Switch>
        <Redirect exact from='/r/' to='/r/my_students' />

        {/* Logic */}
        <Route path='/r/my_students' component={MyStudents} />
        <Route path='/r/attendance' component={Attendance} />
        <Route path='/r/infractions' component={Infractions} />
        <Route path='/r/assessment/tvaas' component={TVAASController} />
        <Route path='/r/financials' component={Financials} />

        {/* Channel */}
        <Route path='/r/channel/inbox' component={SMSController} />
        <Route path='/r/channel/history' component={ChannelHistory} />
        <Route path='/r/channel/engagement' component={ChannelEngagement} />

        {/* Misc */}
        <Route path='/r/dumb' component={DumbContainer} />
        <Route render={() => <DumbContainer>404 :(</DumbContainer>} />
      </Switch>
      <Route path='*/students/:studentId' component={StudentCardController} />
    </div>
  )
}

export default withRouter(AppContainer)
