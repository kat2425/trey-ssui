import React, { Component } from 'react'

import StudentCardStore from 'stores/StudentCard'
import NoteStore from 'stores/NoteStore'
import StudentCard from 'ui/shell/StudentCard/StudentCard'

export default class StudentCardController extends Component {
  componentDidMount () {
    const { match } = this.props
    const studentId = match.params.studentId

    StudentCardStore.fetchStudent(studentId)

    /*Notes*/
    NoteStore.fetchStudentNotes(studentId)
    NoteStore.fetchGroups()
    NoteStore.fetchNoteTags()
  }

  render () {
    return <StudentCard store={StudentCardStore} noteStore={NoteStore} />
  }
}
