import React                from 'react'
import { observer }         from 'mobx-react'
import { Radio }            from 'antd'
import { FILTERS }          from 'stores/ContactStore'
import userStore            from 'stores/UserStore'
import uuid                 from 'uuid'
import { capitalize }       from 'lodash'


const RadioButton          = Radio.Button
const RadioGroup           = Radio.Group

function Filter({ contactStore }) {
  return (
    <div className='d-flex justify-content-center my-3'>
      <RadioGroup
        onChange     = {contactStore.handleOnFilterChange}
        defaultValue = {FILTERS.ALL}
      >
        {Object.values(FILTERS)
          .filter(filterFlagged)
          .map(f => (
            <RadioButton key={uuid()} value={f}>
              {getIcon(f)} {capitalize(f)}
            </RadioButton>
          ))}
      </RadioGroup>
    </div>
  )
}

const getIcon = filter => {
  switch (filter) {
  case FILTERS.FLAGGED:
    return <span className='icon icon-flag' />
  case FILTERS.PRIMARY:
    return <span className='icon icon-star' />
  default:
    return null
  }
}

const filterFlagged = key => {
  const { CONTACT_FLAGGING } = window.SS_MODULES

  const show =
    userStore.hasModules(CONTACT_FLAGGING) && userStore.isBetaTester

  if (show) return true
  else return key !== FILTERS.FLAGGED
}

export default observer(Filter)
