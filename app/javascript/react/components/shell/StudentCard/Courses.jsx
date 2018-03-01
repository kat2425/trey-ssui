import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { observer }         from 'mobx-react'

import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'
import renderIf             from 'ui/hoc/renderIf'

const EVJSICSelect = renderIf(VJSICSelect)

@observer
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

  setInactive(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params: {
        ...this.state.params,
        deleted_at: [ jrsValue ]
      },

      selected: {
        ...this.state.selected,
        deleted_at: val
      }
    })
  }

  render() {
    const coursePath = (this.props.higherEd) ? '' : '_k12'

    return (
      <VJSChart
        id         = 'sc-student-courses'
        reportPath = {`/public/VJS/ss_ui/courses/student_card${coursePath}`}
        scale      = 'container'
        title      = 'Details'
        isTable    = {true}
        ignorePagination = {true}
        params     = {{
          ...this.state.params,
          student_id: [ this.props.student.id ]
        }}
      >
        <EVJSICSelect
          id            = 'show_deleted'
          inputPath     = '/public/VJS/ss_ui/courses/show_deleted'
          selectedValue = {this.state.selected.deleted_at}
          handleChange  = {::this.setInactive}
          placeholder   = 'Inactives?'
          width         = {100}
          renderIf      = {this.props.higherEd}
        />

        <EVJSICSelect
          id            = 'student_course_terms'
          inputPath     = '/public/VJS/ss_ui/courses/student_course_terms'
          selectedValue = {this.state.selected.term}
          handleChange  = {::this.setCourseTerm}
          placeholder   = 'Course Term'
          width         = {250}
          renderIf      = {this.props.higherEd}
        />
      </VJSChart>
    )
  }
}
