import React        from 'react'
import { observer } from 'mobx-react'
import Table        from 'ui/shell/AntdTable'
import styled       from 'styled-components'


const FlagNotes = ({contact}) => {
  const columns = [
    {
      title:  'Note',
      key:    'note',
      width:  '50%',
      render: ({ id, note }) => (
        <Note key={id}> {note} </Note>
      )
    },
    {
      title:     'Created At',
      dataIndex: 'createdDate',
      key:       'createdDate'
    },
    {
      title:     'Creator',
      dataIndex: 'creator',
      key:       'creator'
    }
  ]

  return (
    <Table
      dataSource = {contact.dataSource}
      columns    = {columns}
      pagination = {false}
      size       = 'middle'
    />
  )
}

const Note = styled.div`
  word-break: normal;
  max-height: 200px;
  overflow: auto;
`

export default observer(FlagNotes)
