import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'

export default class Engagement extends Component {
  constructor(props) {
    super(props)

    this.state = {
      params:   {}, selected: {}
    }
  }

  setSchoolFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_id: [ jrsValue ] },
      selected: { ...this.state.selected, school_id: val }
    })
  }

  render() {
    const studentDetailPath = (userStore.user.higherEd) ? '' : '_k12'

    return (
      <div>
        <ModuleHeader title='Engagement'>
          <VJSICSelect
            id            = 'user_schools'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/user_schools'
            selectedValue = {this.state.selected.school_id}
            handleChange  = {::this.setSchoolFilter}
            placeholder   = 'School'
            setDefault    = {!userStore.user.isDistrictLevel}
            clearable     = {userStore.user.isDistrictLevel}
            width         = {300}
          />
        </ModuleHeader>

        <div className='row mb-3'>
          <VJSChart
            id         = 'engagement-stats-over-year'
            reportPath = '/public/VJS/ss_ui/channel/engagement_by_date'
            scale      = 'container'
            title      = 'Totals Over Year'
            className  = 'col-md-7'
            fullHeight  = {true}
            params      = {this.state.params}
          />

          <VJSChart
            id         = 'channel-history'
            reportPath = '/public/VJS/ss_ui/channel/contact_hourly_concentration'
            scale      = 'container'
            title      = 'Hourly Contact Concentration'
            className  = 'col-md-5'
            fullHeight  = {true}
            params      = {this.state.params}
          />
        </div>

        <div className='row'>
          <VJSChart
            id         = 'engagement-user-detail'
            reportPath = '/public/VJS/ss_ui/channel/channel_engagement_user_detail'
            title      = 'User Detail'
            className  = 'col-md-6'
            isTable    = {true}
            params     = {this.state.params}
          />

          <VJSChart
            id         = 'engagement-student-detail'
            reportPath = {`/public/VJS/ss_ui/channel/channel_engagement_student_detail${studentDetailPath}`}
            title      = 'Student Detail'
            className  = 'col-md-6'
            isTable    = {true}
            params     = {this.state.params}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'engagement'
                    })
                  }
                }
              }
            }}
          />
        </div>
      </div>
    )
  }
}
