import React                 from 'react'
import { observer }          from 'mobx-react'

import styled                from 'styled-components'
import { ifProp }            from 'styled-tools'
import { ellipsis }          from 'polished'
import { FaLock }            from 'react-icons/lib/fa'
import { FaInfo }            from 'react-icons/lib/fa'
import DateFormat            from 'helpers/DateFormat'
import {
  Button,
  Tooltip,
  Popover
} from 'antd'

function Title({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null

  return (
    <div className='d-flex flex-row align-items-center'>
      <Popover content={getTagInfo(tagStore)}>
        <div 
          className = 'mr-2' 
          style     = {icStyle}
        >
          <FaInfo style={{ fontSize: 12 }} />
        </div>
      </Popover>
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

function getTagInfo(tagStore) {
  const { createdAt, createdBy } = tagStore.selectedTag

  return (
    <div>
      <p>
        <strong>Created by: </strong> 
        {createdBy.full_name}
      </p>
      <p>
        <strong>Created at: </strong> 
        {DateFormat.shortDate(createdAt)}
      </p>
    </div>
  )
}

const H5 = styled.h5`
  ${ellipsis('100%')}
  ${ifProp('isNew', `
    color: #777;
    font-style: italic;
  `)}
`

const icStyle = {
  backgroundColor: '#DCDCDC',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
  width:           16,
  height:          16,
  borderRadius:    8
}

export default observer(Title)
