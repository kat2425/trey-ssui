/* eslint-disable max-len */
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

export default class PrelimResults extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {}, pgBtn: 1, stBtn: 1 }
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

  getTotalsPath = () => {
    if (this.state.selected.school_filter) {
      return '/public/VJS/ss_ui/accountability/prelim/school_totals'
    } else {
      return '/public/VJS/ss_ui/accountability/prelim/district_totals'
    }
  }

  getDetailPath = () => {
    if (this.state.stBtn === 1) {
      if (this.state.pgBtn === 1) {
        return '/public/VJS/ss_ui/accountability/prelim/prof_detail'
      } else {
        return '/public/VJS/ss_ui/accountability/prelim/growth_detail'
      }
    } else {
      return '/public/VJS/ss_ui/accountability/prelim/teacher_stats'
    }
  }

  setPGButton = (val) => {
    this.setState({ pgBtn: val })
  }

  setSTButton = (val) => {
    this.setState({ stBtn: val })
  }

  renderNoAccess() {
    return (
      <div>
        <EmptyMessage title='Unauthorized' icon='circle-with-cross'>
          Your account does not have access to this area
        </EmptyMessage>
      </div>
    )
  }

  renderFileStatus() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <VJSChart
              id          = 'aa-file-status'
              reportPath  = '/public/VJS/ss_ui/accountability/prelim/file_status'
              title       = 'File Status'
              className   = 'col-md-12 p-0 m-0'
              isTable     = {true}
            />
          </div>
        </div>

        <div className='alert alert-warning'>
          <ul>
            <li>
              If your totals seem off, you may be missing data.  If any of the above boxes are red, we have a problem.  Please go <strong><a href="https://secure.schoolstatus.com/onboarding/accountability" target="_blank">here</a></strong> to make sure your Questar and MDE credentials are up-to-date.
            </li>
          </ul>
        </div>
      </div>
    )
  }

  renderModule() {
    return (
      <div>
        <ModuleHeader title='Preliminary Results'>
          <VJSICSelect
            id            = 'test_filter'
            inputPath     = '/public/VJS/ss_ui/accountability/prelim/test_filter'
            selectedValue = {this.state.selected.test_type}
            handleChange  = {::this.setTestFilter}
            placeholder   = 'Test Type'
            width         = {150}
          />

          <VJSICSelect
            id            = 'school_filter'
            inputPath     = '/public/VJS/ss_ui/accountability/prelim/school_filter'
            selectedValue = {this.state.selected.school_filter}
            handleChange  = {::this.setSchoolFilter}
            placeholder   = 'School'
            setDefault    = {!userStore.user.isDistrictLevel}
            clearable     = {userStore.user.isDistrictLevel}
            width         = {250}
          />
        </ModuleHeader>

        <div className='alert alert-warning'>
          <h5>Please Note:</h5>
          <ul>
            <li style={{ marginBottom: '10px'}}>
              <strong>*&nbsp;</strong>Lowest Performing Student (LPS) denominators at the school level do not match between the MDE provided Impact file and SLAIF. More significant variances appear to occur with 600-level schools. This does not appear to be the case in the overall denominators.
            </li>
            <li style={{ marginBottom: '10px'}}>
              <strong>*&nbsp;</strong>While Alternate Assessment Growth has been included in calculations from the SLAIF data, there are cases where no previous score was provided. As we understand it, the MDE used a bridge to at least find the correct Proficiency band to determine that Growth was met. In these limited cases there is no way for us to verify those growth values.
            </li>
            <li>
              <strong>*&nbsp;</strong>If the MDE releases an updated SLAIF to correct these discrepancies, at that time, we will reload the data to update the calculations.
            </li>
          </ul>
        </div>

        { this.renderFileStatus() }

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
              reportPath  = '/public/VJS/ss_ui/accountability/prelim/prof_graph'
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
              reportPath  = '/public/VJS/ss_ui/accountability/prelim/growth_graph'
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
          >
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

  render() {
    const { VJS_AA_2017 } = window.SS_MODULES

    if (!userStore.user.isTeacher && userStore.hasModules(VJS_AA_2017)) {
      return this.renderModule()
    } else {
      return this.renderNoAccess()
    }
  }
}
