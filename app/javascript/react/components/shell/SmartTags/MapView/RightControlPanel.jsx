import React        from 'react'
import styled       from 'styled-components'
import { observer } from 'mobx-react'
import tagStore     from 'stores/TagStore'
import { Button }   from 'antd'

function RightControlPanel(){
  return (
    <Wrapper>
      <Button 
        icon    = 'shrink'
        type    = 'primary'
        onClick = {tagStore.toggleMap}
      >
        Toggle Map
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px 10px;
    background: transparent;
    font-size: 13px;
    line-height: 2;
    color: #6b6b76;
    text-transform: uppercase;
    outline: none;
  /*box-shadow: 0 2px 4px rgba(0,0,0,0.3);*/
`

export default observer(RightControlPanel)
