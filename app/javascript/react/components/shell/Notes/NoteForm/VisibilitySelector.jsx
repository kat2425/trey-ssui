import React      from 'react'
import {observer} from 'mobx-react'
import {Select}   from 'antd'

const VisibilitySelector = ({note}) => {
  return (
    <Select
      style={{ width: 235 }}
      defaultValue={note.defaultVisibility}
      onChange={(e) => note.handleVisibilitySelect(e)}
    >
      <Select.Option key='1' value="Just Me">Just Me</Select.Option>
      <Select.Option key='2' value="Everyone">Everyone</Select.Option>
      <Select.Option key='3' value="Groups">Groups</Select.Option>
    </Select>
  )
}

export default observer(VisibilitySelector)