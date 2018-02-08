import React        from 'react'
import { observer } from 'mobx-react'
import { Button }   from 'reactstrap'
import { Tooltip }  from 'antd'

function CloneButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null

  return (
    <Tooltip title='Clone Tag'>
      <Button
        className = 'pl-2 mr-2'
        onClick   = {() => tagStore.cloneTag(selectedTag)}
      >
        <span className='icon icon-documents text-muted' style={{marginRight: '4px'}}/>
        Clone
      </Button>
    </Tooltip>
  )
}

export default observer(CloneButton)