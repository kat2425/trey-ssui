import React           from 'react'
import {observer}      from 'mobx-react'

import Wrapper         from './Wrapper'
import Title           from './Title'
import CloneButton     from './CloneButton'
import DeleteButton    from './DeleteButton'
import ExportCSVButton from './ExportCSVButton'
import { Col }         from 'antd'

function TopSection({tagStore}){
  return (
    <Wrapper type='flex' justify='space-between'>
      <Col xs={24} sm={8}>
        <Title tagStore={tagStore} />
      </Col>
      <Col xs={24} sm={8}>
        <div className='d-flex flex-row align-items-center justify-content-end' >
          <ExportCSVButton tagStore={tagStore} />
          <CloneButton     tagStore={tagStore} />
          <DeleteButton    tagStore={tagStore} />
        </div>
      </Col>
    </Wrapper>
  )
}

export default observer(TopSection)
