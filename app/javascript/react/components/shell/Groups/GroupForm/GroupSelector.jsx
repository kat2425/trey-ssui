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
    onChange: PropTypes.func
  }

  render(){
    const {group} = this.props

    if(!group.isSelectingParentGroup) return null

    return (
      <Select
        labelInValue
        style        = {{flex: 1, marginRight: 15, marginTop: 15, width: '100%'}}
        placeholder  = 'Select a group'
        defaultValue = {getDefaultValue(group.parentGroupID)}
        onChange     = {group.handleOnParentGroupChange}
      >
        {groupStore.userGroups.map(group => 
          <Option key={group.id} value={group.id}>{group.groupName}</Option>
        )}
      </Select>
    )}
}

function getDefaultValue(parentGroupID) {
  if(!parentGroupID) return undefined

  return {key: parentGroupID.key || parentGroupID}
}
