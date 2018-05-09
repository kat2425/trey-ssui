import React                 from 'react'
import PropTypes             from 'prop-types'
import { observer }          from 'mobx-react'
import { GROUPS }            from 'stores/GroupStore'
import _                     from 'lodash'
import { Row, Radio, Badge } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

Tabs.propTypes = {
  group: PropTypes.object
}

function Tabs({store}) {
  return (
    <Row type='flex' justify='center' className='mb-3'>
      <RadioGroup 
        value    = {store.activeTab}
        onChange = {store.changeGroupFilter}
      >
        <RadioButton value={GROUPS.ALL}>All</RadioButton>
        <RadioButton value={GROUPS.STUDENT}>Students</RadioButton>
        <RadioButton value={GROUPS.USER}>Users</RadioButton>
      </RadioGroup>
    </Row>
  )
}

const getStudentLabel = (tag) => 
  <span>Students {!_.isEmpty(tag.students) && <Badge count={tag.pagination.total} />}</span>

export default observer(Tabs)
