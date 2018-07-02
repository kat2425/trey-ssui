import React           from 'react'
import ModuleHeader    from 'ui/shell/ModuleHeader'
import ParentForm      from './ParentForm'
import styled          from 'styled-components'
import parentStore     from 'stores/ParentManagementStore'
import { observer }    from 'mobx-react'


const ParentView = () => {
  return (
    <Wrapper>
      <ModuleHeader title='Parent Management' />
      <Content>
        <ParentForm store={parentStore} />
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
 margin: 0px -7.5px 0 -7.5px;
`

const Content = styled.div`
  border-top: 1px solid rgba(0,0,0,0.125);
  min-height: calc(100vh - 108px);
  background-color: #fff;
`

export default observer(ParentView)
