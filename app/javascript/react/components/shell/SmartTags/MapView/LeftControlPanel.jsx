import React         from 'react'
import styled        from 'styled-components'
import {observer}    from 'mobx-react'
import {Button, Row} from 'antd'
import mapStore      from 'stores/MapStore'
import renderIf      from 'render-if'


function LeftControlPanel() {
  const renderIfFetching = renderIf(mapStore.isFetching)
  const renderTotal      = renderIf(!mapStore.isFetching)

  return (
    <Wrapper>
      <Row type="flex" align="middle" justify="center">
        {renderIfFetching(<Button icon='loading'>Fetching Students</Button>)}
        {renderTotal(<Results><b>{mapStore.totalStudents}</b>&nbsp;Students</Results>)}
      </Row>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px 10px;
  background: transparent;
  font-size: 13px;
  outline: none;
`

const Results = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9;  
  white-space: nowrap;
  padding: 0 15px;
  border-radius: 4px;
  height: 32px;
  background-color: #fff;
  font-size: 14px;
`

export default observer(LeftControlPanel)
