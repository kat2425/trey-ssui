import React               from 'react'
import { observer }        from 'mobx-react'
import { Button, Tooltip } from 'antd'

function ExportCSVButton({tagStore}){
  return (
    <Tooltip title='Export CSV'>
      <Button
        icon='download'
        type='primary'
        ghost
        className='mr-2'
        onClick={() => tagStore.fetchTagCSV(tagStore.selectedTag)}
      >
        Export CSV
      </Button>
    </Tooltip>
  )
}

export default observer(ExportCSVButton)
