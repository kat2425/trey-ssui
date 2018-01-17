import React, { Component } from 'react'
import PropTypes            from 'prop-types'

import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

export default class Courses extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  setCourseTerm(val) {
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
      <VJSChart
        id         = 'sc-student-courses'
        reportPath = '/public/VJS/ss_ui/courses/student_card'
        scale      = 'container'
        title      = 'Schedule'
        isTable    = {true}
        ignorePagination = {true}
        params     = {{
          ...this.state.params,
          student_id: [ this.props.student.id ]
        }}
      >
        <VJSICSelect
          id            = 'student_course_terms'
          inputPath     = '/public/VJS/ss_ui/courses/student_course_terms'
          selectedValue = {this.state.selected.term}
          handleChange  = {::this.setCourseTerm}
          placeholder   = 'Course Term'
          width         = {250}
        />
      </VJSChart>
    )
  }
}
