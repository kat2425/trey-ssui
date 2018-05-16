import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { observer }         from 'mobx-react'
import groupStore           from 'stores/GroupStore'
import { isEmpty }          from 'lodash'

import {
  Spin,
  Select,
  Icon
} from 'antd'

const Option = Select.Option
const antIcon = <Icon type='loading' spin style={{fontSize: 24}}/>

@observer
export default class GroupSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  handleOnChange = groupIds => {
    const groups = isEmpty(groupIds) ? [] : groupIds.map((g) => g.key)

    this.props.onChange(groups)
  }

  getDefaultGroups = () => {
    return this.props.attachment.groups.map((g) => {
      return { key: g.id, label: g.group_name || g.label }
    })
  }

  render(){
    return (
      <Spin indicator={antIcon} spinning={groupStore.isLoading}>
        <Select
          labelInValue
          style        = {{width: '100%'}}
          mode         = 'multiple'
          placeholder  = 'Please select groups'
          defaultValue = {this.getDefaultGroups()}
          onChange     = {this.handleOnChange}
          showSearch
        >
          {groupStore.orderedGroups.map(group => 
            <Option key={group.id} value={group.id}>{group.groupName}</Option>
          )}
        </Select>
      </Spin>
    )}
}

