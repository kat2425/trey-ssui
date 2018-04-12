import React                 from 'react'
import { observer }          from 'mobx-react'

import styled                from 'styled-components'
import { ifProp }            from 'styled-tools'
import { ellipsis }          from 'polished'
import { FaLock, FaInfo }    from 'react-icons/lib/fa'
import DateFormat            from 'helpers/DateFormat'
import _get                  from 'lodash/get'
import {
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

  if(!selectedTag.modifiable){
    return (
      <Tooltip title='You cannot modify this list'>
        <FaLock className='ml-2' style={{fontSize: 18}} />
      </Tooltip>
    )
  }

  return null
}

function getTagInfo(tagStore) {
  const { createdAt, updatedAt, createdBy } = tagStore.selectedTag
  const fullName = _get(createdBy, 'full_name')

  return (
    <div>
      {fullName &&
        <p>
          <strong>Created by: </strong> 
          {createdBy.full_name}
        </p>
      }
      {createdAt &&
        <p>
          <strong>Created at: </strong> 
          {DateFormat.shortDate(createdAt)}
        </p>
      }
      {updatedAt &&
        <p>
          <strong>Updated at: </strong> 
          {DateFormat.shortDate(updatedAt)}
        </p>
      }
    </div>
  )
}

const H5 = styled.h5`
  ${ellipsis('100%')}
  padding-right: 5px;
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
