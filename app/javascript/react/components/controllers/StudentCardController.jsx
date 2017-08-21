import React, { Component} from 'react'

import StudentCardStore    from 'stores/StudentCard'
import StudentCard         from 'ui/shell/StudentCard/StudentCard'

export default class StudentCardController extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {match} = this.props
    const studentId = match.params.studentId

    StudentCardStore.fetchStudent(studentId)
  }

  render() {
    return (
      <StudentCard store={StudentCardStore}/>
    )
  }
}
