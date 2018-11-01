import React          from 'react'
import _              from 'lodash'
import { observer }   from 'mobx-react'

import Header         from './Header'
import Aside          from './Aside'
import Content        from './Content'
import Search         from './Search'
import List           from './List'

const SideNav = ({store}) => {
  return (
    <Aside>
      <Header title='Students'/>
      <Search store={store}/>
      <Content>
        {_.isEmpty(store.filteredStudents) ? (
          <p className='mt-5 text-center text-muted'>No saved students</p>
        ) : (
          <List store={store} />
        )}
      </Content>
    </Aside>
  )
}

export default observer(SideNav)