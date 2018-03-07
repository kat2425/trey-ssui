import React        from 'react'
import { observer } from 'mobx-react'
import { Button }   from 'reactstrap'
import { Tooltip }  from 'antd'

function ExportCSVButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag || selectedTag.isNew) return null

  return (
    <Button
      onClick = {() => tagStore.fetchTagCSV(selectedTag)}
      className = 'pl-2 mr-2'
    >
      <span className='icon icon-download text-muted' style={{marginRight: '4px'}}/>
      Export CSV
    </Button>
  )
}

export default observer(ExportCSVButton)
