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
    console.log(group.parentGroup)
    return (
      <Select
        labelInValue
        style        = {{flex: 1}}
        placeholder  = 'Please select group'
        defaultValue = {{key: group.parentGroup}}
        onChange     = {group.handleOnParentGroupChange}
        showSearch
      >
        {groupStore.userGroups.map(group => 
          <Option key={group.id}>{group.groupName}</Option>
        )}
      </Select>
    )}
}
