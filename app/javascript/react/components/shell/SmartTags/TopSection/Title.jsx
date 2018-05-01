import React              from 'react'
import { observer }       from 'mobx-react'

import styled             from 'styled-components'
import { ifProp }         from 'styled-tools'
import { ellipsis }       from 'polished'
import { FaLock, FaInfo } from 'react-icons/lib/fa'
import DateFormat         from 'helpers/DateFormat'
import { get, isEmpty }   from 'lodash'
import uuid               from 'uuid'
import omitStyled         from 'helpers/omitStyled'
import {
  Row,
  Col as _Col,
  Tooltip,
  Popover,
  Tag
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
  const { createdAt, updatedAt, createdBy, groupNames } = tagStore.selectedTag
  const fullName = get(createdBy, 'full_name')

  return (
    <div>
      {fullName &&
        <Row type='flex'>
          <Label>Created by: </Label>
          <Col nowrap>{createdBy.full_name}</Col>
        </Row>
      }
      {createdAt &&
        <Row type='flex' className='mt-1'>
          <Label>Created at: </Label>
          <Col nowrap>{DateFormat.shortDate(createdAt)}</Col>
        </Row>
      }
      {updatedAt &&
        <Row type='flex' className='mt-1'>
          <Label>Updated at: </Label>
          <Col nowrap>{DateFormat.shortDate(updatedAt)}</Col>
        </Row>
      }
      {!isEmpty(groupNames) &&
        <Row type='flex' className='mt-2'>
          <Label>Groups: </Label>
          <Col>{renderGroups(groupNames)}</Col>
        </Row>
      }
    </div>
  )
}

function renderGroups(groupNames){
  return groupNames.map(g => 
    <Tag 
      className='mb-1 text-truncate' 
      title={g} 
      key={uuid()}
    >
      {g}
    </Tag>
  )
}

const Label = styled.div`
  width: 80px;
  text-align: right;
  font-weight: bold;
  white-space: nowrap;
`

const Col = omitStyled(_Col, ['nowrap'])`
  margin-left: 10px;
  display: inline-flex;
  flex-flow: column wrap;
  align-content: flex-start;
  ${ifProp('nowrap', `
    white-space: nowrap;
  `)}
`

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
