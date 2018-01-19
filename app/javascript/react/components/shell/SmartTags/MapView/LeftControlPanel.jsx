import React                from 'react'
import styled               from 'styled-components'
import { observer }         from 'mobx-react'
import tagStore             from 'stores/TagStore'

import { Button, Row, Col } from 'antd'

function LeftControlPanel(){
  const { selectedTag } = tagStore

  if(!selectedTag) return null

  const results = selectedTag.studentsCoordinates.length
  const total   = selectedTag.pagination.total
  const show    = results > 0 && results < total

  if(!show) return null

  return (
    <Wrapper>
      <Row type='flex' align='middle'>
        <Col>
          <p className='text-muted' >{`Shown ${results} of ${total} Students`}</p>
        </Col>
        <Col>
          <Button 
            className = 'ml-2'
            type      = 'primary'
            loading   = {selectedTag.isFetchingStudents}
            onClick   = {selectedTag.pagination.loadMore}
          >
            Load More
          </Button>
        </Col>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    margin: 20px 10px;
    padding: 12px 14px;
    background:rgba(255,255,255,.85);
    font-size: 13px;
    outline: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
`

export default observer(LeftControlPanel)
