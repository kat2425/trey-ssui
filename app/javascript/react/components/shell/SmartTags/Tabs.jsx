import React                 from 'react'
import PropTypes             from 'prop-types'
import { observer }          from 'mobx-react'
import { TABS }              from 'stores/models/Tag'
import _                     from 'lodash'
import { Row, Radio, Badge } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

Tabs.propTypes = {
  tag: PropTypes.object
}

function Tabs({tag}) {
  if(!tag) return null

  return (
    <Row type='flex' justify='center' className='mb-3'>
      <RadioGroup 
        value    = {tag.activeTab}
        onChange = {(e) => {tag.setActiveTab(e.target.value)}}
      >
        <RadioButton value={TABS.QUERY_BUILDER}>Query Builder</RadioButton>
        <RadioButton value={TABS.STUDENTS}> {getStudentLabel(tag)} </RadioButton>
        <RadioButton value={TABS.MAP}>Map</RadioButton>
      </RadioGroup>
    </Row>
  )
}

const getStudentLabel = (tag) => 
  <span>Students {!_.isEmpty(tag.students) && <Badge count={tag.pagination.total} />}</span>

export default observer(Tabs)
