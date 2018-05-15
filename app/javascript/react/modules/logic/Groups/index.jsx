import React, { Component } from 'react'
import { observer }         from 'mobx-react'
import renderIf             from 'render-if'

import groupStore           from 'stores/GroupStore'

import GroupView            from 'ui/shell/Groups/GroupView'
import GroupForm            from 'ui/shell/Groups/GroupForm'

import Wrapper              from './Wrapper'
import Content              from './Content'
import SideNav              from './SideNav'

import { 
  Row,
  Col
} from 'antd'

@observer
export default class Groups extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { selectedGroup } = groupStore
    const {
      renderIfSelectedGroup,
      renderIfNoSelectedGroup,
      renderIfNew
    } = getRenderFunctions(groupStore)

    return (
      <Wrapper>
        <Row type='flex'>
          <Col style={{ background: '#fff' }} xs={24} sm={24} md={6} lg={5}>
            <SideNav groupStore={groupStore} />
          </Col>

          <Content xs={24} sm={24} md={18} lg={19}>
            { renderIfNoSelectedGroup(<p className='mt-5 text-muted text-center'>No Group Selected</p>) }
            <Col className='px-2 mx-2'>
              { renderIfSelectedGroup(
                <GroupView store={groupStore} group={ selectedGroup } />
              )}
              { renderIfNew(    
                <GroupForm store={groupStore} group={ selectedGroup } />
              )}
            </Col>
          </Content>
        </Row>
      </Wrapper>
    )
  }
}

const getRenderFunctions = (groupStore) => {
  const { selectedGroup } = groupStore
  
  const renderIfSelectedGroup   = renderIf(selectedGroup && !selectedGroup.isNew)
  const renderIfNew             = renderIf(selectedGroup && (selectedGroup.isNew))
  const renderIfNoSelectedGroup = renderIf(!selectedGroup)

  return {
    renderIfNew,
    renderIfSelectedGroup,
    renderIfNoSelectedGroup
  }
}
