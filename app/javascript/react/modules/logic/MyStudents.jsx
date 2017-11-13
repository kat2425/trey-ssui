import React, { Component} from 'react'
import PropTypes           from 'prop-types'

import ModuleHeader        from 'ui/shell/ModuleHeader'
import VJSChart            from 'ui/vjs/VJSChart'
import VJSICSelect         from 'ui/vjs/VJSICSelect'

import fireEvent           from 'helpers/FireEvent'

export default class MyStudents extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)

    // this.state = {
    //   teacherParams:   {},
    //   teacherSelected: {},
    //   courseParams:    {},
    //   courseSelected:  {}
    // }
    this.state = { params: {}, selected: {} }
  }

  setCourseFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params: {
        ...this.state.params,
        course_id: [ jrsValue ]
      },

      selected: {
        ...this.state.selected,
        course_id: val
      }
    })
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

  courseOptionRenderer = ({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, options, selectValue, style, valueArray }) => {
    if (option.label !== '---') {
      const _label = option.label.split(' | ').map(l => l.trim())

      return (
        <div
          className    = 'm-1'
          key          = {key}
          onClick      = {() => selectValue(option)}
          onMouseEnter = {() => focusOption(option)}
          style        = {style}
        >
          <div>
            {_label[2]}
          </div>

          <div className='text-muted' style={{marginTop: '-8px'}}>
            <small>
              <strong>Period: </strong>
              {_label[0]}
              <strong>, Term: </strong>
              {_label[1]}
            </small>
          </div>
        </div>
      )
    } else {
      return (
        <div
          className    = 'm-1'
          key          = {key}
          onClick      = {() => selectValue(option)}
          onMouseEnter = {() => focusOption(option)}
          style        = {style}
        >
          <span>---</span>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <ModuleHeader title='My Students'>
          {/* <VJSICSelect */}
          {/*   id             = 'user_courses' */}
          {/*   inputPath      = '/public/VJS/ss_ui/shared/input_controls/user_courses' */}
          {/*   selectedValue  = {this.state.selected.course_id} */}
          {/*   handleChange   = {::this.setCourseFilter} */}
          {/*   optionRenderer = {this.courseOptionRenderer} */}
          {/*   placeholder    = 'Course' */}
          {/*   width          = {325} */}
          {/* /> */}

          <VJSICSelect
            id            = 'user_teachers'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/user_teachers'
            selectedValue = {this.state.selected.teacher_id}
            handleChange  = {::this.setTeacherFilter}
            placeholder   = 'Instructor'
            width         = {250}
          />
        </ModuleHeader>

        <div className='row'>
          <VJSChart
            id          = 'my-students-detail'
            reportPath  = '/public/VJS/ss_ui/students/my_students_detail'
            scale       = 'container'
            title       = 'Details'
            className   = 'col-md-7'
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

          <VJSChart
            id         = 'recent-activity'
            reportPath = '/public/VJS/ss_ui/channel/recent_activity'
            scale      = 'container'
            title      = 'Recent Activity'
            className  = 'col-md-5'
            isTable    = {true}
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
