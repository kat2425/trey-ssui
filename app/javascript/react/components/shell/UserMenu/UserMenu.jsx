import React                from 'react'
import { inject, observer } from 'mobx-react'

import {
  Collapse, Nav, NavItem, NavLink, Badge
} from 'reactstrap'

import UserMenuSection from './UserMenuSection'
import UserMenuItem    from './UserMenuItem'
import userStore       from 'stores/UserStore'
import renderIf        from 'ui/hoc/renderIf'

const EUserMenuItem    = renderIf(UserMenuItem)
const EUserMenuSection = renderIf(UserMenuSection)

const UserMenu = () => {
  const _riskItemLabel = userStore.user.higherEd ? 'Risk Analysis' : 'At-Risk'

  return (
    <div className='col-md-2 hidden-xs-down hidden-sm-down bg-faded sidebar'>
      <UserMenuSection title='Core Data'>
        <EUserMenuItem title='My Students' iconClass='icon-users' link='/r/my_students' active />

        <EUserMenuItem
          title     = 'Attendance'
          iconClass = 'icon-calendar'
          link      = '/r/attendance'
          renderIf  = {userStore.hasModules('attendance')}
        />

        <EUserMenuItem
          title     = 'Discipline'
          iconClass = 'icon-thermometer'
          link      = '/r/infractions'
          renderIf  = {userStore.hasModules('discipline')}
        />

        {/* <EUserMenuItem title='Assessment' iconClass='icon-bar-graph' link='/r/assessment/tvaas' /> */}
        <EUserMenuItem
          title     = 'Assessment'
          iconClass = 'icon-area-graph'
          link      = '/r/assessment'
          renderIf  = {userStore.hasModules('assessment')}
        />

        <EUserMenuItem
          title     = 'Financials'
          iconClass = 'icon-credit'
          link      = '/r/financials'
          renderIf  = {userStore.hasModules('vjs_financials')}
        />
      </UserMenuSection>

      <EUserMenuSection title='Accountability' renderIf={userStore.hasModules('vjs_aa_2017')} >
        {/* <EUserMenuItem */}
        {/*   title     = 'Final Results' */}
        {/*   iconClass = 'icon-eye' */}
        {/* /> */}

        <EUserMenuItem
          title     = 'Lowest Performing'
          iconClass = 'icon-ruler'
          link      = '/r/accountability/lps'
        />
      </EUserMenuSection>


      <UserMenuSection title='Communication'>
        {/* <EUserMenuItem title='Inbox' iconClass='icon-inbox' link='/r/channel/inbox' /> */}
        <EUserMenuItem title='Engagement' iconClass='icon-power-plug' link='/r/channel/engagement' />
        {/* <EUserMenuItem title='Call History' iconClass='icon-phone' link='/r/channel/history' /> */}
      </UserMenuSection>

      <UserMenuSection title='Utilities'>
        <EUserMenuItem
          title     = 'Searchlight'
          iconClass = 'icon-flashlight'
          link      = '/r/bullseye'
          renderIf  = {userStore.hasModules('bullseye')}
        />
      </UserMenuSection>

      <UserMenuSection title='Insights'>
        <EUserMenuItem title={_riskItemLabel} iconClass='icon-traffic-cone' link='/r/risk_analysis' />
        {/* <EUserMenuItem title='Reporting' iconClass='icon-funnel' link='/r/dumb' /> */}
      </UserMenuSection>
    </div>
  )
}

export default UserMenu
