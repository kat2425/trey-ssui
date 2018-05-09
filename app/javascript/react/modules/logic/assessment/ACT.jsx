import React, { Component } from 'react'

import {
  Button, ButtonGroup
} from 'reactstrap'

import VJSChart    from 'ui/vjs/VJSChart'
import VJSICSelect from 'ui/vjs/VJSICSelect'

import fireEvent   from 'helpers/FireEvent'
import renderIf    from 'ui/hoc/renderIf'

const EVJSICSelect = renderIf(VJSICSelect)

export default class ACT extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {}, detailBtn: 1 }
  }

  setYearFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_year: [ jrsValue ] },
      selected: { ...this.state.selected, school_year: val }
    })
  }

  getDetailPath = () => {
    if (this.state.detailBtn === 1) {
      return '/public/VJS/ss_ui/assessment/act/student_detail'
    } else {
      return '/public/VJS/ss_ui/assessment/act/max_student_detail'
    }
  }

  setDetailButton = (val) => {
    this.setState({ detailBtn: val })
  }

  render() {
    return (
      <div>

        <div className='row'>
          <VJSChart
            id          = 'act-student-detail'
            reportPath  = {this.getDetailPath()}
            params      = {this.state.params}
            title       = 'ACT'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'assessment/act'
                    })
                  }
                }
              }
            }}
          >
            <ButtonGroup>
              <Button
                onClick = {() => this.setDetailButton(1)}
                active  = {this.state.detailBtn === 1}
              >
                All Tests
              </Button>
              <Button
                onClick = {() => this.setDetailButton(2)}
                active  = {this.state.detailBtn === 2}
              >
                Only Max Scores
              </Button>
            </ButtonGroup>

            <EVJSICSelect
              id            = 'school_year'
              inputPath     = '/public/VJS/ss_ui/shared/input_controls/district_dataset_years/report'
              selectedValue = {this.state.selected.school_year}
              handleChange  = {::this.setYearFilter}
              clearable     = {false}
              setDefault    = {true}
              placeholder   = 'Year'
              width         = {100}
              params        = {{ dataset: ['act_raws'] }}
              renderIf      = {this.state.detailBtn === 1}
            />
          </VJSChart>
        </div>
      </div>
    )
  }
}
