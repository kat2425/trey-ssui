import React        from 'react'
import { observer } from 'mobx-react'
import Panel        from 'ui/shell/Panel'
import MemberList   from '../MemberList'
import { Input }    from 'antd'
import ActionBar    from '../ActionBar'
import renderIf     from 'render-if'
import GroupForm    from '../GroupForm'

function GroupView({ group, store }){
  return (
    <div>
      {renderIf(group.isEditing) (
        <GroupForm store={store} group={group} />
      )}

      {renderIf(!group.isEditing) (
        <Panel
          className    = 'mt-2'
          title        = {`${ group.groupName } Members`}
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

export default observer(GroupView)
