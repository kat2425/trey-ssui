import React        from 'react'
import {
  Radio
}                   from 'antd'
import { observer } from 'mobx-react'

const FilterButtons = ({store}) => (
  <div
    className='d-flex justify-content-center align-items-center mb-4'
  >
    <Radio.Group
      value={store.filter}
      onChange={(e) => store.setFilter(e.target.value)}
    >
      <Radio.Button value='all'>All</Radio.Button>
      <Radio.Button value='pending'>Pending</Radio.Button>
      <Radio.Button value='verified'>Approved</Radio.Button>
      <Radio.Button value='rejected'>Rejected</Radio.Button>
    </Radio.Group>
  </div>
)

export default observer(FilterButtons)
