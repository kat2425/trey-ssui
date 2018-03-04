import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class FinalResults extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  setTestFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:     { ...this.state.params, test_type: [ jrsValue ] },
      selected:   { ...this.state.selected, test_type: val }
    })
  }

  setSchoolFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:     { ...this.state.params, school_filter: [ jrsValue ] },
      selected:   { ...this.state.selected, school_filter: val }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Final Results'>
          <VJSICSelect
            id            = 'test_filter'
            inputPath     = '/public/VJS/ss_ui/accountability/test_filter'
            selectedValue = {this.state.selected.test_type}
            handleChange  = {::this.setTestFilter}
            placeholder   = 'Test Type'
            width         = {150}
          />

          <VJSICSelect
            id            = 'school_filter'
            inputPath     = '/public/VJS/ss_ui/accountability/school_filter'
            selectedValue = {this.state.selected.school_filter}
            handleChange  = {::this.setSchoolFilter}
            placeholder   = 'School'
            width         = {250}
          />
        </ModuleHeader>

        <div className='row p-0 m-0'>
          <div className='col-md-4 p-0 m-0'>
            <VJSChart
              id          = 'aa-totals'
              reportPath  = '/public/VJS/ss_ui/accountability/final/district_totals'
              title       = 'Totals'
              className   = 'col-md-12 p-0 m-0'
              params      = {this.state.params}
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

          <div className='col-md-8 pr-0'>
            <VJSChart
              id          = 'aa-prof-breakdown'
              reportPath  = '/public/VJS/ss_ui/accountability/final/prof_graph'
              title       = 'Proficiency Breakdown'
              className   = 'col-md-12 p-0 m-0'
              params      = {this.state.params}
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

            <VJSChart
              id          = 'aa-grown-breakdown'
              reportPath  = '/public/VJS/ss_ui/accountability/final/growth_graph'
              title       = 'Growth Breakdown'
              className   = 'col-md-12 p-0 m-0'
              params      = {this.state.params}
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

        <div className='row'>
          <VJSChart
            id          = 'aa-student-detail'
            reportPath  = '/public/VJS/ss_ui/accountability/final/prof_detail'
            title       = 'Student Detail'
            className   = 'col-md-12'
            isTable     = {true}
            params      = {this.state.params}
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

