import React, { Component} from 'react'

import StudentCardStore from 'stores/StudentCard'
import StudentCard from 'ui/shell/StudentCard/StudentCard'

export default class StudentCardController extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <StudentCard store={StudentCardStore}/>
    )
  }
}
