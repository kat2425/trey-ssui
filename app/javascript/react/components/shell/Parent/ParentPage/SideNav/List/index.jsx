import React          from 'react'
import PropTypes      from 'prop-types'
import {observer}     from 'mobx-react'

import ListEntry      from '../ListEntry'
import Wrapper        from './Wrapper'
import ScrollView     from './ScrollView'
import { List }       from 'antd'

StudentList.propTypes = {
  store: PropTypes.object.isRequired
}

function StudentList({store}) {
  return (
    <Wrapper>
      <ScrollView>
        <List
          style      = {{borderTop: '1px solid rgba(0,0,0,0.125)'}}
          itemLayout = 'horizontal'
          dataSource = {store.filteredStudents}
          renderItem = {student => <ListEntry student={student} />}
        />
      </ScrollView>
    </Wrapper>
  )
}

export default observer(StudentList)
