/* eslint-disable max-len */
import React, { Component } from 'react'
import { observer }         from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'
import EmptyMessage         from 'ui/shell/EmptyMessage'

import {
  Button, ButtonGroup
} from 'reactstrap'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'
import { 
  VJS_AA_2017,
  VJS_AA_SNEAK_PEEK
} from 'helpers/UserModules'

const EButtonGroup = renderIf(ButtonGroup)

@observer
export default class SneakPeek extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {}, pgBtn: 1, stBtn: 1 }
  }

  setTestFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    console.log(val)

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

  getPathRoot = () => {
    if (userStore.user.districtCode === '9999') {
      return 'demo'
    } else {
      return 'sneak_peek'
    }
  }

  getTotalsPath = () => {
    if (this.state.selected.school_filter) {
      return `/public/VJS/ss_ui/accountability/${this.getPathRoot()}/school_totals`
    } else {
      return `/public/VJS/ss_ui/accountability/${this.getPathRoot()}/district_totals`
    }
  }

  getDetailPath = () => {
    if (this.state.pgBtn === 1) {
      return `/public/VJS/ss_ui/accountability/${this.getPathRoot()}/prof_detail`
    } else {
      return `/public/VJS/ss_ui/accountability/${this.getPathRoot()}/growth_detail`
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
              reportPath  = '/public/VJS/ss_ui/accountability/sneak_peek/file_status'
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
        <ModuleHeader title='Sneak Peek'>
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
        </ModuleHeader>

        <div className='alert alert-warning'>
          <h5>Please Note:</h5>
          <ul>
            <li>
              This module is displaying assessment data recently released from the testing center under contract with MDE. In an effort to let you know where you stand according to the MDE Accountability Model, we have provided this module as a “Sneak Peek”.</li>
            <li>
              These Results WILL change as we are provided more data from MDE. A full description of this module, how it functions and further detail about the Accountability Model can be found <strong><a href="http://help.schoolstatus.com/ms-accountability/2018-accountability-guides/sneak-peek-accountability-module" target="_blank">here</a></strong>.
            </li>
          </ul>
        </div>

        { userStore.user.districtCode === '9999' ? null : this.renderFileStatus() }

        <div className='row'>
          <div className='col-md-4'>
            <VJSChart
              id          = 'aa-total-score'
              reportPath  = {this.getTotalsPath()}
              title       = 'Score'
              className   = 'col-md-12 p-0 m-0'
              params      = {this.state.params}
            />
          </div>

          <div className='col-md-4'>
            <VJSChart
              id          = 'aa-prof-totals'
              reportPath  = '/public/VJS/ss_ui/accountability/sneak_peek/prof_table'
              title       = 'Proficiency'
              className   = 'col-md-12 p-0 m-0'
              params      = {this.state.params}
              linkOptions = {{
                events: {
                  click: (ev, link) => {
                    const testType   = link.parameters._test_type
                    /*
                     * const detailPath = `/public/VJS/ss_ui/accountability/${this.getPathRoot()}/` + link.parameters._detail_type
                     */

                    this.setTestFilter({ value: testType })
                  }
                }
              }}
            />
          </div>

          <div className='col-md-4'>
            <VJSChart
              id          = 'aa-growth-totals'
              reportPath  = {`/public/VJS/ss_ui/accountability/${this.getPathRoot()}/growth_table`}
              title       = 'Growth'
              className   = 'col-md-12 p-0 m-0'
              params      = {this.state.params}
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
    if (!userStore.user.isTeacher &&
        ((userStore.hasModules(VJS_AA_2017) && userStore.user.isDistrictLevel) ||
          (userStore.hasModules(VJS_AA_SNEAK_PEEK)))) {
      return this.renderModule()
    } else {
      return this.renderNoAccess()
    }
  }
}
