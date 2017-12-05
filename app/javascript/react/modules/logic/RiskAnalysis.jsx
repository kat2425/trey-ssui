import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class RiskAnalysis extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  setTeacherFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params: {
        ...this.state.params,
        teacher_id: [ jrsValue ]
      },

      selected: {
        ...this.state.selected,
        teacher_id: val
      }
    })
  }

  setTermFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params: {
        ...this.state.params,
        term: [ jrsValue ]
      },

      selected: {
        ...this.state.selected,
        term: val
      }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Risk Analysis'>
          <VJSICSelect
            id            = 'user_teachers'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/user_teachers'
            selectedValue = {this.state.selected.teacher_id}
            handleChange  = {::this.setTeacherFilter}
            placeholder   = 'Instructor'
            width         = {275}
          />

          <VJSICSelect
            id            = 'user_course_terms'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/user_course_terms'
            selectedValue = {this.state.selected.term}
            handleChange  = {::this.setTermFilter}
            placeholder   = 'Term'
            width         = {150}
          />
        </ModuleHeader>


        {/* <div className='row'> */}
        {/*   <VJSChart */}
        {/*     id         = 'financials-demographics-breakdown' */}
        {/*     reportPath = '/public/VJS/ss_ui/financials/breakdown_by_demographics' */}
        {/*     title      = 'Demographics Breakdown' */}
        {/*     className  = 'col-md-12' */}
        {/*   /> */}
        {/* </div> */}

        <div className='row'>
          <VJSChart
            id          = 'risk-student-detail'
            reportPath  = '/public/VJS/ss_ui/risk_analysis/student_detail'
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
