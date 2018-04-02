import React           from 'react'
import {observer}      from 'mobx-react'

import Wrapper         from './Wrapper'
import Title           from './Title'
import CloneButton     from './CloneButton'
import DeleteButton    from './DeleteButton'
import EditButton      from './EditButton'
import ExportCSVButton from './ExportCSVButton'
import { Col }         from 'antd'

function TopSection({tagStore}){
  return (
    <Wrapper type='flex' justify='space-between' align='middle'>
      <Col xs={24} sm={12}>
        <Title tagStore={tagStore} />
      </Col>
      <Col xs={24} sm={12}>
        <div className='d-flex flex-row align-items-center justify-content-end'>
          <div className='d-flex flex-row align-items-center'>
            <EditButton tagStore={tagStore} />
            <CloneButton tagStore={tagStore} />
            <DeleteButton tagStore={tagStore} />
          </div>
          <div className='ml-4 d-flex flex-row align-items-center' >
            <ExportCSVButton tagStore={tagStore} />
          </div>
        </div>
      </Col>
    </Wrapper>
  )
}

export default observer(TopSection)
