import React, {Component} from 'react'

import StudentCardStore   from 'stores/StudentCard'
import NoteStore          from 'stores/NoteStore'
import uiStore            from 'stores/UiStore'
import StudentCard        from 'ui/shell/StudentCard/StudentCard'

export default class StudentCardController extends Component {
  componentDidMount(){
    uiStore.setIsStudentCardOpen(true)
    this.fetchStudentInfo(this.props.match.params.studentId)
  }
  componentWillReceiveProps({match}){
    this.fetchStudentInfo(match.params.studentId)
  }

  componentWillUnmount(){
    uiStore.setIsStudentCardOpen(false)
  }

  fetchStudentInfo = (studentId) => {
    StudentCardStore.fetchStudent(studentId)
    NoteStore.fetchStudentNotes(studentId)
    NoteStore.fetchGroups()
    NoteStore.fetchNoteTags()
  }

  render() {
    return <StudentCard store={StudentCardStore} noteStore={NoteStore} />
  }
}
