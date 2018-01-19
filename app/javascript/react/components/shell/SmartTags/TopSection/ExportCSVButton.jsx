import React               from 'react'
import { observer }        from 'mobx-react'
import { Button, Tooltip } from 'antd'

function ExportCSVButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag || selectedTag.isNew) return null

  return (
    <Tooltip title='Export CSV'>
      <Button
        loading   = {tagStore.isFetchingTagCSV}
        icon      = 'download'
        type      = 'primary'
        ghost
        className = 'mr-2'
        onClick   = {() => tagStore.fetchTagCSV(selectedTag)}
      >
        Export CSV
      </Button>
    </Tooltip>
  )
}

export default observer(ExportCSVButton)
