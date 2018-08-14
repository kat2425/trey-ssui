import React, { Component } from 'react'
import { observer }         from 'mobx'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'
import MassEmail            from 'ui/shell/MassEmail/MassEmail'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'
import _                    from 'lodash'

const EMassEmail   = renderIf(MassEmail)
const EVJSICSelect = renderIf(VJSICSelect)

export default class JCJCBinary extends Component {
  constructor(props) {
    super(props)
    const _currentYear = userStore.user.currentSchoolYear.toString()

    this.state = {
      params: {
        school_year: [_currentYear ]
      },
      selected: {
        school_year: { selected: true, label: _currentYear , value: _currentYear }
      }
    }
  }

  setPeriodFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, class_period: [ jrsValue ] },
      selected: { ...this.state.selected, class_period: val }
    })
  }

  setCourseFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, course_id: [ jrsValue ] },
      selected: { ...this.state.selected, course_id: val }
    })
  }

  setTeacherFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, teacher_id: [ jrsValue ] },
      selected: { ...this.state.selected, teacher_id: val }
    })
  }

  setTermFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, term: [ jrsValue ] },
      selected: { ...this.state.selected, term: val }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Performance Risk'>
          <EVJSICSelect
            id            = 'course_id'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/cascade_courses/report'
            selectedValue = {this.state.selected.course_id}
            handleChange  = {::this.setCourseFilter}
            params        = {this.state.params}
            placeholder   = 'Course'
            width         = {220}
            renderIf      = {!!this.state.selected.term && !!this.state.selected.teacher_id}
          />

          <EVJSICSelect
            id            = 'term'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/cascade_courses/report'
            selectedValue = {this.state.selected.term}
            handleChange  = {::this.setTermFilter}
            params        = {this.state.params}
            placeholder   = 'Term'
            width         = {100}
            renderIf      = {!!this.state.selected.teacher_id}
          />

          <EVJSICSelect
            id            = 'teacher_id'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/cascade_courses/report'
            selectedValue = {this.state.selected.teacher_id}
            handleChange  = {::this.setTeacherFilter}
            params        = {this.state.params}
            placeholder   = 'Teacher'
            width         = {200}
          />
        </ModuleHeader>

        <div className='row'>
          <VJSChart
            id          = 'risk-student-detail'
            reportPath  = '/public/VJS/ss_ui/data_science/jcjc_binary/student_detail'
            params      = {this.state.params}
            title       = 'Student Detail'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', { student: studentID })
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
