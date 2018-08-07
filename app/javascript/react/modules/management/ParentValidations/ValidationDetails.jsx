import React        from 'react'
import { observer } from 'mobx-react'
import Table        from 'ui/shell/AntdTable'
import getColumns   from './getValidationColumns'


const ValidationDetails = ({parentUser}) => {
  return (
    <Table
      dataSource = {parentUser.dataSource}
      columns    = {getColumns()}
      pagination = {false}
      size       = 'middle'
    />
  )
}

export default observer(ValidationDetails)
