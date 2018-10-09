import React, { Component } from 'react'

import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'
import Select               from 'react-virtualized-select'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import userStore            from 'stores/UserStore'
import fireEvent            from 'helpers/FireEvent'

export default class CallHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      params:   {}, selected: {}
    }
  }

  setTypeFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, contact_type: [ jrsValue ] },
      selected: { ...this.state.selected, contact_type: val }
    })
  }

  setSchoolFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_id: [ jrsValue ] },
      selected: { ...this.state.selected, school_id: val }
    })
  }

  setYearFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_year: [ jrsValue ] },
      selected: { ...this.state.selected, school_year: val }
    })
  }

  contactTypes = () => {
    return [
      { value: 'Call',  label: 'Call'  },
      { value: 'Text',  label: 'Text'  },
      { value: 'Email', label: 'Email' }
    ]
  }

  render() {
    const { selected } = this.state
    const typeValue    = selected.contact_type && selected.contact_type.value

    return (
      <div>
        <ModuleHeader title='Engagement History'>
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

          <div style={{width: 175}} className='ml-2'>
            <Select
              name        = 'contact-type-menu'
              value       = {typeValue}
              onChange    = {::this.setTypeFilter}
              maxHeight   = {325}
              options     = {this.contactTypes()}
              clearable   = {true}
              placeholder = 'Engagement Method'
            />
          </div>

          <VJSICSelect
            id            = 'commo_years'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/commo_years'
            selectedValue = {this.state.selected.school_year}
            handleChange  = {::this.setYearFilter}
            placeholder   = 'Year'
            setDefault    = {true}
            clearable     = {false}
            width         = {150}
          />
        </ModuleHeader>

        <div className='row'>
          <VJSChart
            id             = 'call-history'
            reportPath     = '/public/VJS/ss_ui/channel/full_history'
            title          = 'Student Detail'
            className      = 'col-md-12'
            isTable        = {true}
            requiredParams = {['school_year']}
            params         = {this.state.params}
            linkOptions    = {{
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
