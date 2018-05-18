import React        from 'react'
import { Select }   from 'antd'
import { observer } from 'mobx-react'
import { FaInfo }   from 'react-icons/lib/fa'

const {Option, OptGroup} = Select

const ScopeSelector = ({group}) => {
  if(!group.groupType) return null

  return renderSelect(group)
}

function showPlaceholder(group) {
  if(group.groupType === 'student') {
    return 'Who needs access to this student group?'
  } else {
    return 'Who needs access to this user group?'
  }
}

function renderSelect(group) {
  if(group.groupType === 'student') {
    return (
      <Select
        value={group.selectedScope ? group.selectedScope : undefined}
        style={{ flex: 0.5, marginRight: 15, width: '100%' }}
        placeholder={showPlaceholder(group)}
        optionFilterProp="children"
        onChange={group.handleScopeOnChange}
      >
        <OptGroup label='Select An Option'>
          <Option value="owner-and-members">Just Me</Option>
          <Option value="group">Select User Groups</Option>
        </OptGroup>
      </Select>  
    )
  }

  return (
    <div className='d-flex align-items-center'>
      <div 
        className = 'mr-2' 
        style     = {icStyle}
      >
        <FaInfo style={icStyle}  style={{fontSize: 8}} />
      </div>
      <p className='text-muted small'>User groups can be viewed and managed by their members.</p>
    </div>
  )
}

const icStyle = {
  backgroundColor: '#DCDCDC',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
  width:           16,
  height:          16,
  borderRadius:    8
}

export default observer(ScopeSelector)
