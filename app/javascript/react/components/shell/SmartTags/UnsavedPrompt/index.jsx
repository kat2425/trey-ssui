import React      from 'react'
import {observer} from 'mobx-react'
import { Prompt } from 'react-router-dom'

function UnsavedPrompt({tagStore}){
  const { selectedTag } = tagStore

  return (
    <Prompt
      when    = {selectedTag.isModified}
      message = 'You have unsaved information, are you sure you want to leave this page?'
    />
  )
}

export default observer(UnsavedPrompt)
