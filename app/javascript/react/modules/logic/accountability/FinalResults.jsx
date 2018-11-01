import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import {
  Button, ButtonGroup
} from 'reactstrap'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'

const EButtonGroup = renderIf(ButtonGroup)

export default class FinalResults extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {}, pgBtn: 1, stBtn: 1, tdBtn: 1 }
  }

  setTestFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, test_type: [ jrsValue ] },
      selected: { ...this.state.selected, test_type: val }
    })
  }

  setSchoolFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_filter: [ jrsValue ] },
      selected: { ...this.state.selected, school_filter: val }
    })
  }

  setSchoolYear(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_year: [ jrsValue ] },
      selected: { ...this.state.selected, school_year: val }
    })
  }

  getReportPath = (reportPath) => {
    const _schoolYear = this.state.selected.school_year || { value: '2018' }

    if (_schoolYear.value === '2018') {
      return reportPath.replace(/final/, 'final/2018')
    } else {
      return reportPath
    }
  }

  getTotalsPath = () => {
    if (this.state.selected.school_filter) {
      return this.getReportPath('/public/VJS/ss_ui/accountability/final/school_totals')
    } else {
      return this.getReportPath('/public/VJS/ss_ui/accountability/final/district_totals')
    }
  }

  getDetailPath = () => {
    if (this.state.stBtn === 1) {
      if (this.state.pgBtn === 1) {
        return this.getReportPath('/public/VJS/ss_ui/accountability/final/prof_detail')
      } else {
        return this.getReportPath('/public/VJS/ss_ui/accountability/final/growth_detail')
      }
    } else {
      if (this.state.tdBtn === 1) {
        return this.getReportPath('/public/VJS/ss_ui/accountability/final/teacher_stats')
      } else {
        return this.getReportPath('/public/VJS/ss_ui/accountability/final/teacher_students')
      }
    }
  }

  getDetailTitle = () => {
    if (this.state.stBtn === 1) {
      if (this.state.pgBtn === 1) {
        return 'Proficiency Detail'
      } else {
        return 'Growth Detail'
      }
    } else {
      return 'Teacher Detail'
    }
  }

  setPGButton = (val) => {
    this.setState({ pgBtn: val })
  }

  setSTButton = (val) => {
    this.setState({ stBtn: val })
  }

  setTDButton = (val) => {
    this.setState({ tdBtn: val })
  }

  renderBanner = () => {
    const _schoolYear = this.state.selected.school_year || { value: "2018" }

    if (_schoolYear.value === '2018') {
      return (
        <div>
          <div className='alert alert-warning'>
            <ul>
              <li>
                <span className='icon icon-info-with-circle mr-2'/>
                The results displayed are the current data from MDE recently released in Sharepoint pending state board approval. If approved, these results will become Final, if changes are made, we will update them accordingly.</li>
            </ul>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Current Results'>
          <VJSICSelect
            id            = 'test_filter'
            inputPath     = '/public/VJS/ss_ui/accountability/final/test_filter'
            selectedValue = {this.state.selected.test_type}
            handleChange  = {::this.setTestFilter}
            placeholder   = 'Test Type'
            width         = {150}
          />

          <VJSICSelect
            id            = 'school_filter'
            inputPath     = '/public/VJS/ss_ui/accountability/final/school_filter'
            selectedValue = {this.state.selected.school_filter}
            handleChange  = {::this.setSchoolFilter}
            placeholder   = 'School'
            setDefault    = {!userStore.user.isDistrictLevel}
            clearable     = {userStore.user.isDistrictLevel}
            width         = {250}
          />

          <VJSICSelect
            id            = 'aa_school_years'
            inputPath     = '/public/VJS/ss_ui/accountability/final/aa_school_years'
            selectedValue = {this.state.selected.school_year}
            handleChange  = {::this.setSchoolYear}
            placeholder   = 'Year'
            setDefault    = {true}
            width         = {150}
          />
        </ModuleHeader>

        { this.renderBanner() }

        <div className='row p-0 m-0'>
          <div className='col-md-4 p-0 m-0'>
            <VJSChart
              id          = 'aa-totals'
              reportPath  = {this.getTotalsPath()}
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
              reportPath  = {this.getReportPath('/public/VJS/ss_ui/accountability/final/prof_graph')}
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
              reportPath  = {this.getReportPath('/public/VJS/ss_ui/accountability/final/growth_graph')}
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
            reportPath  = {this.getDetailPath()}
            title       = {this.getDetailTitle()}
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
          >
            {/* teacher/student toggle */}
            <ButtonGroup className='mr-2'>
              <Button
                onClick = {() => this.setSTButton(1)}
                active  = {this.state.stBtn === 1}
              >
                Student View
              </Button>
              <Button
                onClick = {() => this.setSTButton(2)}
                active  = {this.state.stBtn === 2}
              >
                Teacher View
              </Button>
            </ButtonGroup>

            <EButtonGroup renderIf={ this.state.stBtn !== 1}>
              <Button
                onClick = {() => this.setTDButton(1)}
                active  = {this.state.tdBtn === 1}
              >
                Teachers
              </Button>
              <Button
                onClick = {() => this.setTDButton(2)}
                active  = {this.state.tdBtn === 2}
              >
                Teachers + Students
              </Button>
            </EButtonGroup>

            {/* prof/growth toggle */}
            <EButtonGroup renderIf={ this.state.stBtn === 1}>
              <Button
                onClick = {() => this.setPGButton(1)}
                active  = {this.state.pgBtn === 1}
              >
                Proficiency
              </Button>
              <Button
                onClick = {() => this.setPGButton(2)}
                active  = {this.state.pgBtn === 2}
              >
                Growth
              </Button>
            </EButtonGroup>
          </VJSChart>
        </div>
      </div>
    )
  }
}

