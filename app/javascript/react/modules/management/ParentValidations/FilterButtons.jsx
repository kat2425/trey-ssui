import React, { Component } from 'react'
import { isEmpty }          from 'lodash/fp'
import {
  Radio
}                           from 'antd'
import uuid                 from 'uuid'
import { capitalize }       from 'lodash/fp'
import { STATUS }           from 'stores/ParentValidationsStore'
import { observer }         from 'mobx-react'

@observer
class FilterButtons extends Component {
  handleChange = ({target}) => {
    const { store } = this.props

    store.setStatus(STATUS[target.value.toUpperCase()])
    if (isEmpty(store.filter)) {
      store.fetchParentValidations()
    } else {
      store.handleContactSearch(store.filter)
    }
  }

  render() {
    const { store } = this.props

    return (
      <div
        className='d-flex justify-content-center align-items-center mb-4'
      >
        <Radio.Group
          value={store.status}
          onChange={this.handleChange}
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
