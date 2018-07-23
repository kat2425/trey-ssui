import React, { Component } from 'react'
import {
  Radio
}                           from 'antd'
import uuid                 from 'uuid'
import { capitalize }       from 'lodash/fp'
import { STATUS }           from 'stores/ParentValidationsStore'
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
          value={store.status}
          onChange={store.handleFilterChange}
        >
          {
            Object.values(STATUS).map(val => (
              <Radio.Button key={uuid()} value={val}>{capitalize(val)}</Radio.Button>
            ))
          }
        </Radio.Group>
      </div>
    )
  }
}

export default FilterButtons
