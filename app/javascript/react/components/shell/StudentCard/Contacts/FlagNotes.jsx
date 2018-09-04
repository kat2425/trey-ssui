import React        from 'react'
import { observer } from 'mobx-react'
import Table        from 'ui/shell/AntdTable'


const FlagNotes = ({contact}) => {
  const columns = [{
    title:     'Note',
    dataIndex: 'note',
    key:       'note',
    width:     '50%'
  },{
    title:     'Created At',
    dataIndex: 'createdDate',
    key:       'createdDate',
  },{
    title:     'Creator',
    dataIndex: 'creator',
    key:       'creator',
  }]

  return (
    <Table 
      dataSource = {contact.dataSource}
      columns    = {columns}
      pagination = {false}
      size       = 'middle'
    />
  )
}

export default observer(FlagNotes)
