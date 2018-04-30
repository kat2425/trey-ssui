import React      from 'react'
import {observer} from 'mobx-react'
import { Select } from 'antd'

function TagSelector({ store, note }){
  return (
    <Select
      labelInValue
      className    = 'mb-3'
      onChange     = {(e) => note.handleSelectTag(e)}
      defaultValue = {note.defaultTags}
      mode         = 'multiple'
      style        = {{ width: '100%' }}
      placeholder  = 'Select tags...'
    >
      {
        store.tags.map((tag) => { 
          return <Select.Option key={tag.id} value={tag.id}>{tag.name}</Select.Option> 
        })
      }
    </Select>
  )
}

export default observer(TagSelector)
