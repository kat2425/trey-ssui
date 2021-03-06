import React, {Component} from 'react'
import { withRouter }     from 'react-router-dom'

import studentCardStore   from 'stores/StudentCardStore'
import uiStore            from 'stores/UiStore'
import StudentCard        from 'ui/shell/StudentCard/StudentCard'

@withRouter
export default class StudentCardController extends Component {
  componentDidMount(){
    uiStore.setIsStudentCardOpen(true)
    this.fetchStudentInfo(this.props.match.params.studentId)
  }
  componentWillReceiveProps(nextProps){
    const studentId     = this.props.match.params.studentId
    const nextStudentId = nextProps.match.params.studentId

    if(studentId === nextStudentId) return

    this.fetchStudentInfo(nextStudentId)
  }

  componentWillUnmount(){
    uiStore.setIsStudentCardOpen(false)
  }

  fetchStudentInfo = (studentId) => {
    studentCardStore.fetchStudent(studentId)
  }

  render() {
    return <StudentCard store={studentCardStore} embedded={this.props.embedded}/>
  }
}
