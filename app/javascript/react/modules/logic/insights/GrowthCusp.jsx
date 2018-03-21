import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'
import userStore            from 'stores/UserStore'

import fireEvent            from 'helpers/FireEvent'

export default class GrowthCusp extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  setTestType(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, test_type: [ jrsValue ] },
      selected: { ...this.state.selected, test_type: val }
    })
  }

  setSchoolFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_id: [ jrsValue ] },
      selected: { ...this.state.selected, school_id: val }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Growth Cusp'>
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

        <div className='row'>
          <VJSChart
            id          = 'growthcusp-student-detail'
            reportPath  = '/public/VJS/ss_ui/data_science/growth_cusp/student_detail'
            params      = {this.state.params}
            title       = 'Student Detail'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID
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
