import React                            from 'react'
import { observer, inject }             from 'mobx-react'
import { Radio }                        from 'antd'
import { MdViewHeadline, MdViewModule } from 'react-icons/lib/md'
import { VIEWS }                        from 'stores/ContactStore'
import uuid                             from 'uuid'
import { capitalize }                   from 'lodash'

const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

const buttons = [
  {
    label: `${capitalize(VIEWS.GRID)} View`,
    value: VIEWS.GRID,
    icon:  <MdViewModule  size={20}/>
  },{
    label: `${capitalize(VIEWS.TABLE)} View`,
    value: VIEWS.TABLE,
    icon:  <MdViewHeadline size={20} />
  }
]

const ViewSelector = ({ contactStore }) => (
  <RadioGroup
    onChange     = {contactStore.handleOnChangeView}
    defaultValue = {contactStore.selectedView}
  >
    {buttons.map(({label, value, icon}) => (
      <RadioButton key={uuid()} value={value}>
        {icon} {label}
      </RadioButton>
    ))}
  </RadioGroup>
)

export default inject('contactStore')(observer(ViewSelector))
