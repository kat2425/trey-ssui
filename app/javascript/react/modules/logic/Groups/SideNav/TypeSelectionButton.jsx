import React                   from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { observer }            from 'mobx-react'

function TypeSelectionButton({groupStore}) {
  return (
    <ButtonGroup style={{marginRight: '5px'}}>
      <Button 
        outline
        color='primary' 
        value='' 
        onClick={groupStore.handleGroupTypeFilter} 
        active={groupStore.groupTypeFilter === ''}
      >All</Button>

      <Button 
        outline
        color='primary' 
        value='user' 
        onClick={groupStore.handleGroupTypeFilter} 
        active={groupStore.groupTypeFilter === 'user'}
      >User</Button>

      <Button 
        outline
        color='primary' 
        value='student' 
        onClick={groupStore.handleGroupTypeFilter} 
        active={groupStore.groupTypeFilter === 'student'}
      >Student</Button>
    </ButtonGroup>
  )
}

export default observer(TypeSelectionButton)
