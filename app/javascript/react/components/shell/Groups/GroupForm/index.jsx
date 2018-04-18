import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import { observer }         from 'mobx-react'
import Wrapper              from './Wrapper'
import EditTitle            from './EditTitle'
import EditDescription      from './EditDescription'
import { Row, Col }         from 'antd'
import ActionBar            from '../ActionBar'
import TypeSelector         from './TypeSelector'
import MemberSearchInput    from './MemberSearchInput'
import MemberAside          from './MemberAside'
import ScopeSelector        from './ScopeSelector'
import GroupSelector        from './GroupSelector'

@observer
export default class GroupForm extends Component {
  static propTypes = {
    group: PropTypes.object,
    store: PropTypes.object.isRequired
  }

  render() {
    const {store, group} = this.props

    if(!store || !group) return null

    return (
      <Row gutter={5} className='mt-4 ml-2' type='flex'>
        <Col xs={24} sm={24} md={15} xxl={16}>
          <Wrapper className='p-4'>
            <EditTitle
              className='mb-4'
              type="text"
              onChange={store.editTitleOnChange}
              value={store.selectedGroup.groupName}
            />
            <EditDescription 
              placeholder='Enter a description...'
              className='mb-4'
              onChange={store.editDescriptionOnChange}
              value={store.selectedGroup.description}
            />
            <TypeSelector group={store.selectedGroup} />
            <MemberSearchInput className='mt-2' group={group} />
            <div className='d-flex align-items-center mt-4'>
              <ScopeSelector group={group} />
              <GroupSelector group={group} />
            </div>
            <div className='mt-4'>
              <ActionBar store={store} group={group} />
            </div>
          </Wrapper>
        </Col>
        <Col xs={24} sm={24} md={9} ld={4} xxl={8}>
          <MemberAside store={store} group={group} />
        </Col>
      </Row>
    )
  }
}
