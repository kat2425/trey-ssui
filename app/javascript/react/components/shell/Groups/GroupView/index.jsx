import React        from 'react'
import { observer } from 'mobx-react'
import Panel        from 'ui/shell/Panel'
import MemberList   from '../MemberList'
import { Input }    from 'antd'
import ActionBar    from '../ActionBar'
import renderIf     from 'render-if'
import GroupForm    from '../GroupForm'
import GroupInfo    from '../GroupInfo'

function GroupView({ group, store }){
  return (
    <div>
      {renderIf(group.isEditing) (
        <GroupForm store={store} group={group} />
      )}

      {renderIf(!group.isEditing) (
        <Panel
          className    = 'mt-2'
          title        = {showGroupTitle(group)}
          contentStyle = {{ minHeight: 'auto' }}
          titleRight   = {() => (
            <div className='d-flex justify-content-end'>
              <div className='mr-4' style={{maxWidth: 200}}>
                <Input.Search
                  size        = 'medium'
                  placeholder = 'Find a member...'
                  onChange    = {store.handleSearchOnChange}
                />
              </div>
              <ActionBar className='mb-0' group={group} />
            </div>
          )} 
        >
          <MemberList group={group} store={store} />
        </Panel>
      )}
    </div>
  )
}

function showGroupTitle(group) {
  return (
    <div className='d-flex align-items-center'>
      <span className='mr-2'><GroupInfo group={group} /></span>
      {`${ group.groupName } Members`}
    </div>
  )
}

export default observer(GroupView)
