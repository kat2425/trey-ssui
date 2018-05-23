import React                from 'react'
import { Table }            from 'reactstrap'
import uuid                 from 'uuid'
import { inject, observer } from 'mobx-react'

import THead                from './THead'
import TRow                 from './TRow'

const TableView = ({ contactStore }) => (
  <Table>
    <THead headers={['Name', 'Relationship', 'Phone', 'Email']} />
    <tbody>
      {contactStore.groupedContacts.map(c => (
        <TRow key={uuid()} contact={c} />
      ))}
    </tbody>
  </Table>
)

export default inject('contactStore')(observer(TableView))
