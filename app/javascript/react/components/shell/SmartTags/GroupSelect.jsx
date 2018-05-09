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
    tag:      PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleOnChange = groupIds => {
    const groups = isEmpty(groupIds) ? [] : this.props.tag.toGroup(groupIds)

    this.props.onChange(groups)
  }

  render(){
    const tag = this.props.tag

    return (
      <Spin indicator={antIcon} spinning={groupStore.isLoading}>
        <Select
          mode         = 'multiple'
          placeholder  = 'Please select groups'
          defaultValue = {tag.groupIds}
          onChange     = {this.handleOnChange}
          showSearch
        >
          {groupStore.userGroups.map(group => 
            <Option key={group.id}>{group.groupName}</Option>
          )}
        </Select>
      </Spin>
    )}
}
