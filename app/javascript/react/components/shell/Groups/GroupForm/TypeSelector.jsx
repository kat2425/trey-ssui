import React                    from 'react'
import { Select, Popconfirm }   from 'antd'
import { observer }             from 'mobx-react'
import userStore                from 'stores/UserStore'

const Option = Select.Option

const TypeSelector = ({group}) => {
  return (
    <Popconfirm
      onCancel   = {() => group.setUnconfirmedTypeChange(false)}
      title      = 'Changing this will remove the current members. Are you sure?'
      onConfirm  = {group.confirmTypeChange}
      okText     = 'Yes'
      cancelText = 'Cancel'
      visible    = {group.unconfirmedTypeChange}
    >
      <Select
        onSelect={(e) => group.setSelectedType(e)}
        defaultValue={group.groupType}
        value={group.groupType || undefined}
        style={{ width: '100%' }}
        placeholder="Select a group type"
        onChange={group.handleTypeOnChange}
      >
        <Option 
          disabled={!userStore.hasModules('student_group_admin')} 
          value="student"
        >
          Student
        </Option>
        <Option 
          disabled={!userStore.hasModules('user_group_admin')} 
          value="user"
        >
          User
        </Option>
      </Select>
    </Popconfirm>
  )
}

export default observer(TypeSelector)
