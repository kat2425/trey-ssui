import React                from 'react'
import { Table }            from 'reactstrap'
import uuid                 from 'uuid'
import { inject, observer } from 'mobx-react'

import THead                from './THead'
import TRow                 from './TRow'

const TableView = ({ contactStore, userStore }) => (
  <Table>
    <THead headers={['Name', 'Relationship', 'Phone', 'Email']} />
    <tbody>
      {contactStore.groupedContacts.map(c => (
        <TRow key={uuid()} contact={c} userStore={userStore} />
      ))}
    </tbody>
  </Table>
)

export default inject('contactStore')(observer(TableView))
