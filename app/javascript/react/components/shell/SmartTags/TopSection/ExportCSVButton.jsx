import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

function ExportCSVButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag || selectedTag.isNew) return null

  return (
    <SSButton
      onClick = {() => tagStore.fetchTagCSV(selectedTag)}
      className = 'pl-2 mr-2'
      iconClass = 'icon icon-download text-muted'
    >
      Export CSV
    </SSButton>
  )
}

export default observer(ExportCSVButton)
