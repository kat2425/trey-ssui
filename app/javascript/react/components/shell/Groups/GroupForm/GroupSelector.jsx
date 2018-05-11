import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { observer }         from 'mobx-react'
import groupStore           from 'stores/GroupStore'

import {
  Select
} from 'antd'

const Option = Select.Option

@observer
export default class GroupSelector extends Component {
  static propTypes = {
    group:    PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render(){
    const {group} = this.props

    if(!group.isSelectingParentGroup) return null

    return (
      <Select
        labelInValue
        style        = {{flex: 1}}
        placeholder  = 'Select a group'
        defaultValue = {group.parentGroup ? {key: group.parentGroup.key || group.parentGroup} : undefined}
        onChange     = {group.handleOnParentGroupChange}
      >
        {groupStore.userGroups.map(group => 
          <Option value={group.id}>{group.groupName}</Option>
        )}
      </Select>
    )}
}
