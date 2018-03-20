import React                 from 'react'
import { observer }          from 'mobx-react'

import styled                from 'styled-components'
import { ifProp }            from 'styled-tools'
import { ellipsis }          from 'polished'
import { FaLock }            from 'react-icons/lib/fa'
import {
  Button,
  Tooltip
} from 'antd'

function Title({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null

  return (
    <div className = 'd-flex flex-row align-items-center' >
      <H5 isNew={selectedTag.isNew} title={selectedTag.name}>{selectedTag.name}</H5>
      {showOptions(tagStore)}
    </div>  
  )
}

function showOptions(tagStore) {
  const { selectedTag } = tagStore
  
  return (
    selectedTag.modifiable 
      ? (
        <Tooltip title='Edit List'>
          <Button
            onClick  = {() => tagStore.editTag(selectedTag)}
            icon     = "edit"
            style    = {{border: 0, background: 'transparent'}}
            disabled = {!selectedTag.modifiable}
          />
        </Tooltip>  
      )
      : (
        <Tooltip title='You cannot modify this list'>
          <FaLock className='ml-2' style={{fontSize: 18}} />
        </Tooltip>
      )
  )
}

const H5 = styled.h5`
  ${ellipsis('100%')}
  ${ifProp('isNew', `
    color: #777;
    font-style: italic;
  `)}
`

export default observer(Title)
