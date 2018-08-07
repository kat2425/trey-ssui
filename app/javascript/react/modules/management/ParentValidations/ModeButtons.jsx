import React, { Component } from 'react'
import {
  Radio
}                           from 'antd'
import uuid                 from 'uuid'
import { capitalize }       from 'lodash/fp'
import { MODE }             from 'stores/ParentManagementStore'
import { observer }         from 'mobx-react'

@observer
class FilterButtons extends Component {
  render() {
    const { store } = this.props

    return (
      <div
        className='d-flex justify-content-center align-items-center mb-4'
      >
        <Radio.Group
          value={store.mode}
          onChange={store.handleModeChange}
        >
          {
            Object.values(MODE).map(val => (
              <Radio.Button key={uuid()} value={val}>{capitalize(val)} Parents</Radio.Button>
            ))
          }
        </Radio.Group>
      </div>
    )
  }
}

export default FilterButtons
