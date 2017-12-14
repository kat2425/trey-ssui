import React from 'react'

import {
  Collapse, Nav, NavItem, NavLink, Badge
} from 'reactstrap'

import UserMenuSection from './UserMenuSection'
import UserMenuItem    from './UserMenuItem'

const UserMenu = () => {
  return (
    <div className='col-md-2 hidden-xs-down hidden-sm-down bg-faded sidebar'>
      <UserMenuSection title='Core Data'>
        <UserMenuItem title='My Students' iconClass='icon-users' link='/r/my_students' active/>
        {/* <UserMenuItem title='Attendance' iconClass='icon-calendar' link='/r/attendance' /> */}
        {/* <UserMenuItem title='Discipline' iconClass='icon-thermometer' link='/r/infractions' active/> */}
        {/* <UserMenuItem title='Assessment' iconClass='icon-bar-graph' link='/r/assessment/tvaas' /> */}
        <UserMenuItem title='Financials' iconClass='icon-credit' link='/r/financials' />
      </UserMenuSection>

      {/* <UserMenuSection title='Accountability'> */}
      {/*   <UserMenuItem title='Sneak Peek' iconClass='icon-eye' /> */}
      {/*   <UserMenuItem title='FAY' iconClass='icon-ruler' /> */}
      {/* </UserMenuSection> */}

      <UserMenuSection title='Channel'>
        {/* <UserMenuItem title='Inbox' iconClass='icon-inbox' link='/r/channel/inbox' /> */}
        {/* <UserMenuItem title='Communications' iconClass='icon-chat' link='/r/channel/history' /> */}
        <UserMenuItem title='Engagement' iconClass='icon-power-plug' link='/r/channel/engagement' />
      </UserMenuSection>

      <UserMenuSection title='Utilities'>
        <UserMenuItem title='Bullseye' iconClass='icon-hair-cross' link='/r/bullseye' />
      </UserMenuSection>

      <UserMenuSection title='Insights'>
        <UserMenuItem title='Risk Analysis' iconClass='icon-traffic-cone' link='/r/risk_analysis' />
        {/* <UserMenuItem title='Reporting' iconClass='icon-funnel' link='/r/dumb' /> */}
      </UserMenuSection>
    </div>
  )
}

export default UserMenu
