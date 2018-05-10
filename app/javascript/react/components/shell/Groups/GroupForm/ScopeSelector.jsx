import React        from 'react'
import { Select }   from 'antd'
import { observer } from 'mobx-react'

const Option = Select.Option

const ScopeSelector = ({group}) => {
  if(!group.groupType) return null
  
  return (
    <Select
      value={group.selectedScope ? group.selectedScope : undefined}
      style={{ flex: 0.5, marginRight: 15 }}
      placeholder="Who can see this?"
      optionFilterProp="children"
      onChange={group.handleScopeOnChange}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      <Option value="owner-and-members">Owner & Members</Option>
      { group.groupType !== 'user' && <Option value="group">A Group</Option>}
    </Select>
  )
}

export default observer(ScopeSelector)