import React           from 'react'

import UserMenuSection from './UserMenuSection'
import UserMenuItem    from './UserMenuItem'
import userStore       from 'stores/UserStore'
import renderIf        from 'ui/hoc/renderIf'
const EUserMenuItem    = renderIf(UserMenuItem)
const EUserMenuSection = renderIf(UserMenuSection)

const UserMenu = () => {
  const {
    ASSESSMENT,
    ATTENDANCE,
    AT_RISK,
    BULLSEYE,
    CONTACT_FLAGGING,
    DISCIPLINE,
    FEEDBAK,
    MY_STUDENTS,
    PARENT_MANAGEMENT,
    REPORTING,
    STUDENT_GROUPS,
    STUDENT_GROUP_ADMIN,
    USERADMIN,
    USER_GROUP_ADMIN,
    VJS_AA_2017,
    VJS_AW_IR,
    VJS_COURSE_ATTENDANCE,
    VJS_FINANCIALS,
    VJS_GROWTH_CUSP,
    VJS_JCJC_BINARY,
    VJS_LPS,
    VJS_TEACHER_ATTENDANCE,
    VOICE_ADMIN,
  } = window.SS_MODULES

  const _riskItemLabel    = userStore.user.higherEd ? 'Retention Risk' : 'At Risk'

  return (
    <div className='col-md-2 hidden-xs-down hidden-sm-down bg-faded sidebar pt-0'>
      <UserMenuSection title = 'Core Data'>
        <EUserMenuItem
          title     = 'My Schools'
          iconClass = 'icon-blackboard'
          link      = '/r/my_schools'
          renderIf  = {
            (!(userStore.hasHiddenModule('my_schools')) ||
              (!userStore.user.isTeacher &&
                !userStore.user.higherEd &&
                !userStore.hasHiddenModule('my_schools')))
          }
        />

        <EUserMenuItem
          title     = 'My Students'
          iconClass = 'icon-users'
          link      = '/r/my_students'
          renderIf  = {!(userStore.hasHiddenModule(MY_STUDENTS))}
        />

        <EUserMenuItem
          title     = 'Attendance'
          iconClass = 'icon-calendar'
          link      = '/r/attendance'
          renderIf  = {userStore.hasModules(ATTENDANCE)}
        />

        <EUserMenuItem
          title     = 'Course Attendance'
          iconClass = 'icon-sweden'
          link      = '/r/course_attendance'
          renderIf  = {userStore.hasModules(VJS_COURSE_ATTENDANCE)}
        />

        <EUserMenuItem
          title     = 'Teacher Attendance'
          iconClass = 'icon-ticket'
          link      = '/r/teacher_attendance'
          renderIf  = {userStore.hasModules(VJS_TEACHER_ATTENDANCE)}
        />

        <EUserMenuItem
          title     = 'Discipline'
          iconClass = 'icon-thermometer'
          link      = '/r/infractions'
          renderIf  = {userStore.hasModules(DISCIPLINE)}
        />

        <EUserMenuItem
          title     = 'Assessment'
          iconClass = 'icon-area-graph'
          link      = '/r/assessment'
          renderIf  = {userStore.hasModules(ASSESSMENT)}
        />

        <EUserMenuItem
          title     = 'Financials'
          iconClass = 'icon-credit'
          link      = '/r/financials'
          renderIf  = {userStore.hasModules(VJS_FINANCIALS)}
        />
      </UserMenuSection>

      <EUserMenuSection
        title    = 'Accountability'
        renderIf = {userStore.hasModules(VJS_AA_2017,VJS_LPS)}
      >
        {/* <EUserMenuItem */}
        {/*   title     = 'Sneak Peek' */}
        {/*   iconClass = 'icon-calculator' */}
        {/*   link      = '/r/accountability/sneak_peek' */}
        {/*   badge     = 'NEW' */}
        {/*   renderIf  = { */}
        {/*     !userStore.user.isTeacher && */}
        {/*     ((userStore.hasModules('vjs_aa_2017') && userStore.user.isDistrictLevel) || */}
        {/*       (userStore.hasModules('vjs_aa_sneak_peek'))) */}
        {/*   } */}
        {/*   noRoute */}
        {/* /> */}

        {/* <EUserMenuItem */}
        {/*   title     = 'Prelim Results' */}
        {/*   iconClass = 'icon-calculator' */}
        {/*   link      = '/r/accountability/prelim_results' */}
        {/*   badge     = 'NEW (2018)' */}
        {/*   renderIf  = {(!userStore.user.isTeacher && userStore.hasModules(VJS_AA_2017))} */}
        {/*   noRoute */}
        {/* /> */}

        <EUserMenuItem
          title     = 'Sneak Peek'
          iconClass = 'icon-eye'
          link      = '/r/accountability/sneak_peek'
          renderIf  = {(
            !userStore.user.isTeacher &&
              userStore.hasModules(VJS_AA_2017) &&
              userStore.user.isDemoUser
          )}
          noRoute
        />

        <EUserMenuItem
          title     = 'Current Results'
          iconClass = 'icon-eye'
          link      = '/r/accountability/final_results'
          badge     = 'UPDATED'
          renderIf  = {(
            !userStore.user.isTeacher &&
              userStore.hasModules(VJS_AA_2017) &&
              !userStore.user.isDemoUser
          )}
          noRoute
        />

        <EUserMenuItem
          title     = 'Lowest Performing'
          iconClass = 'icon-ruler'
          link      = '/r/accountability/lps'
          renderIf  = {userStore.hasModules(VJS_LPS)}
          noRoute
        />
      </EUserMenuSection>


      <UserMenuSection title='Communication'>
        {/* <EUserMenuItem title='Inbox' iconClass='icon-inbox' link='/r/channel/inbox' /> */}
        <EUserMenuItem title='Engagement' iconClass='icon-power-plug' link='/r/channel/engagement' />
        <EUserMenuItem title='History' iconClass='icon-phone' link='/r/channel/history' />
      </UserMenuSection>

      <EUserMenuSection
        title    = 'Utilities'
        renderIf = {userStore.hasModules(BULLSEYE,REPORTING,FEEDBAK)}
      >
        <EUserMenuItem
          title     = 'Searchlight'
          iconClass = 'icon-flashlight'
          link      = '/r/searchlight'
          renderIf  = {userStore.hasModules(BULLSEYE)}
        />

        <EUserMenuItem
          title     = 'Feedbak'
          iconClass = 'icon-retweet'
          link      = '/r/feedbak'
          renderIf  = {userStore.hasModules(FEEDBAK)}
          noRoute
        />

        <EUserMenuItem
          title     = 'Groups'
          iconClass = 'icon-slideshare'
          link      = '/r/groups'
          renderIf  = {userStore.hasModules(USER_GROUP_ADMIN, STUDENT_GROUP_ADMIN, STUDENT_GROUPS)}
        />

        <EUserMenuItem
          title     = 'Reporting'
          iconClass = 'icon-unread'
          link      = '/r/reporting/adhoc'
          renderIf  = {userStore.hasModules(REPORTING)}
        />
      </EUserMenuSection>

      <EUserMenuSection
        title    = 'Insights'
        renderIf  = {!(userStore.hasHiddenModule('at_risk'))}
      >
        <EUserMenuItem
          title     = {_riskItemLabel}
          iconClass = 'icon-traffic-cone'
          link      = '/r/risk_analysis'
          renderIf  = {!(userStore.hasHiddenModule(AT_RISK))}
        />

        <EUserMenuItem
          title     = 'Performance Risk'
          iconClass = 'icon-light-bulb'
          link      = '/r/jcjc_binary'
          renderIf  = {userStore.hasModules(VJS_JCJC_BINARY)}
        />

        <EUserMenuItem
          title     = 'Growth Cusp (2017)'
          iconClass = 'icon-magnet'
          link      = '/r/growth_cusp'
          renderIf  = {userStore.hasModules(VJS_GROWTH_CUSP)}
        />

        <EUserMenuItem
          title     = 'AIMSWeb/iReady'
          iconClass = 'icon-light-bulb'
          link      = '/r/aimsweb_iready'
          renderIf  = {userStore.hasModules(VJS_AW_IR)}
        />
      </EUserMenuSection>

      <EUserMenuSection
        title    = 'Management'
        renderIf = {userStore.hasModules(USERADMIN, VOICE_ADMIN, CONTACT_FLAGGING) || userStore.user.isSpoc}
      >
        <EUserMenuItem
          title     = 'User Management'
          iconClass = 'icon-man'
          link      = '/cj/users'
          renderIf  = {userStore.hasModules(USERADMIN)}
          noRoute
        />
        <EUserMenuItem
          title     = 'Voice Admin'
          iconClass = 'icon-sound'
          link      = '/utilities/voice_admin'
          renderIf  = {userStore.user.isSpoc}
          noRoute
        />
        <EUserMenuItem
          title     = 'Flagged Contacts'
          iconClass = 'icon-remove-user'
          link      = '/r/flagged_contacts'
          renderIf  = {
            userStore.hasModules(CONTACT_FLAGGING) &&
            userStore.isBetaTester
          }
        />
        <EUserMenuItem
          title     = 'Parent Access Management'
          iconClass = 'icon-add-user'
          link      = '/r/parent_access_management'
          renderIf  = {
            userStore.hasModules(PARENT_MANAGEMENT) &&
            userStore.isBetaTester
          }
        />
      </EUserMenuSection>
    </div>
  )
}

export default UserMenu
