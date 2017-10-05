import React            from 'react'

import StudentCardStore from 'stores/StudentCard'
import NoteStore        from 'stores/NoteStore'
import StudentCard      from 'ui/shell/StudentCard/StudentCard'

const StudentCardController = () => (
  <StudentCard store={StudentCardStore} noteStore={NoteStore} />
)

export default StudentCardController
