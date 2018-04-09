import React                from 'react'

import UserMenuSection      from './UserMenuSection'
import UserMenuItem         from './UserMenuItem'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'

const EUserMenuItem    = renderIf(UserMenuItem)
const EUserMenuSection = renderIf(UserMenuSection)

const UserMenu = () => {
  const _riskItemLabel    = userStore.user.higherEd ? 'At Risk' : 'At Risk'
  const _chanHistoryLabel = userStore.user.hasChannel ? 'History' : 'Call History'

  return (
    <div className='col-md-2 hidden-xs-down hidden-sm-down bg-faded sidebar pt-0'>
      <UserMenuSection title='Core Data'>
        <EUserMenuItem
          title     = 'My Schools'
          iconClass = 'icon-blackboard'
          link      = '/r/my_schools'
          renderIf  = {!userStore.user.isTeacher && !userStore.user.higherEd}
        />

        <EUserMenuItem title='My Students' iconClass='icon-users' link='/r/my_students' />

        <EUserMenuItem
          title     = 'Attendance'
          iconClass = 'icon-calendar'
          link      = '/r/attendance'
          renderIf  = {userStore.hasModules('attendance')}
        />

        <EUserMenuItem
          title     = 'Teacher Attendance'
          iconClass = 'icon-ticket'
          link      = '/r/teacher_attendance'
          renderIf  = {userStore.hasModules('vjs_teacher_attendance')}
        />

        <EUserMenuItem
          title     = 'Discipline'
          iconClass = 'icon-thermometer'
          link      = '/r/infractions'
          renderIf  = {userStore.hasModules('discipline')}
        />

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

      <EUserMenuSection
        title    = 'Accountability'
        renderIf = {userStore.hasModules('vjs_aa_2017','vjs_lps')}
      >
        <EUserMenuItem
          title     = 'Final Results'
          iconClass = 'icon-eye'
          link      = '/r/accountability/final_results'
          renderIf  = {userStore.hasModules('vjs_aa_2017')}
        />

        <EUserMenuItem
          title     = 'Lowest Performing'
          iconClass = 'icon-ruler'
          link      = '/r/accountability/lps'
          renderIf  = {userStore.hasModules('vjs_lps')}
        />
      </EUserMenuSection>


      <UserMenuSection title='Communication'>
        {/* <EUserMenuItem title='Inbox' iconClass='icon-inbox' link='/r/channel/inbox' /> */}
        <EUserMenuItem title='Engagement' iconClass='icon-power-plug' link='/r/channel/engagement' />
        <EUserMenuItem title={_chanHistoryLabel} iconClass='icon-phone' link='/r/channel/history' />
      </UserMenuSection>

      <EUserMenuSection
        title    = 'Utilities'
        renderIf = {userStore.hasModules('bullseye','reporting','feedbak')}
      >
        <EUserMenuItem
          title     = 'Searchlight'
          iconClass = 'icon-flashlight'
          link      = '/r/searchlight'
          renderIf  = {userStore.hasModules('bullseye')}
        />

        <EUserMenuItem
          title     = 'Feedbak'
          iconClass = 'icon-retweet'
          link      = '/r/feedbak'
          renderIf  = {userStore.hasModules('feedbak')}
        />

        <EUserMenuItem
          title     = 'Reporting'
          iconClass = 'icon-unread'
          link      = '/r/reporting/adhoc'
          renderIf  = {userStore.hasModules('reporting')}
        />
      </EUserMenuSection>

      <UserMenuSection title='Insights'>
        <EUserMenuItem
          title     = {_riskItemLabel}
          iconClass = 'icon-traffic-cone'
          link      = '/r/risk_analysis'
        />

        <EUserMenuItem
          title     = 'Growth Cusp'
          iconClass = 'icon-magnet'
          link      = '/r/growth_cusp'
          renderIf  = {userStore.hasModules('vjs_growth_cusp')}
        />

        <EUserMenuItem
          title     = 'AIMSWeb/iReady'
          iconClass = 'icon-light-bulb'
          link      = '/r/aimsweb_iready'
          renderIf  = {userStore.hasModules('vjs_aw_ir')}
        />
      </UserMenuSection>

      <EUserMenuSection
        title    = 'Management'
        renderIf = {userStore.hasModules('useradmin')}
      >
        <EUserMenuItem
          title     = 'User Management'
          iconClass = 'icon-man'
          link      = '/legacy/useradmin'
          renderIf  = {userStore.hasModules('useradmin')}
          noRoute
        />
      </EUserMenuSection>
    </div>
  )
}

export default UserMenu
