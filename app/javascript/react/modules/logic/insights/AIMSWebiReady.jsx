import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'
import userStore            from 'stores/UserStore'

import fireEvent            from 'helpers/FireEvent'

export default class AIMSWebiReady extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  setAIMSGOM(val) {
    console.log('aimsgom', val)
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, aimsweb_gom: [ jrsValue ] },
      selected: { ...this.state.selected, aimsweb_gom: val }
    })
  }

  setReadySubject(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, iready_subjects: [ jrsValue ] },
      selected: { ...this.state.selected, iready_subjects: val }
    })
  }

  setSchoolFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_filter: [ jrsValue ] },
      selected: { ...this.state.selected, school_filter: val }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='AIMSWeb and iReady Analysis'>
          <VJSICSelect
            id            = 'school_filter'
            inputPath     = {`${userStore.user.jasper.orgPath}/gibson_iraw_student_list`}
            selectedValue = {this.state.selected.school_filter}
            handleChange  = {::this.setSchoolFilter}
            placeholder   = 'School'
            setDefault    = {!userStore.user.isDistrictLevel}
            clearable     = {userStore.user.isDistrictLevel}
            width         = {300}
          />

          <VJSICSelect
            id            = 'iready_subjects'
            inputPath     = {`${userStore.user.jasper.orgPath}/gibson_iraw_student_list`}
            selectedValue = {this.state.selected.iready_subjects}
            handleChange  = {::this.setReadySubject}
            placeholder   = 'iReady Subject'
            width         = {150}
          />

          <VJSICSelect
            id            = 'aimsweb_gom'
            inputPath     = {`${userStore.user.jasper.orgPath}/gibson_iraw_student_list`}
            selectedValue = {this.state.selected.aimsweb_gom}
            handleChange  = {::this.setAIMSGOM}
            placeholder   = 'AIMSWeb GOM'
            width         = {150}
          />
        </ModuleHeader>

        <div className='row'>
          <VJSChart
            id          = 'aw-ir-student-detail'
            reportPath  = '/public/VJS/ss_ui/data_science/aimsweb_iready/student_detail'
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
