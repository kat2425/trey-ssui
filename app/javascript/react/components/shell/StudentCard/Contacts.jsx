import React     from 'react'
import PropTypes from 'prop-types'
import _         from 'lodash'
import {
  ButtonGroup, Button, Card, Table, Alert
} from 'reactstrap'

import fireEvent       from 'helpers/FireEvent'


const ContactEntry = ({contact, store, student}) => {
  return (
    <tr key={`${contact.name}_${contact.relationship}`}>
      <td>
        {contact.name}
      </td>
      <td>
        {contact.relationship}
      </td>

      <td>
        {/* TODO: extract to function */}
        {contact.refs.map(ref => {
          return (
            <div key={ref.id} className='mb-1'>
              <ButtonGroup className='mr-2'>
                <Button onClick={() => {store.selectCallOption(true); store.contact = contact; store.studentId = student.id}} size='sm' color='success'>
                  <span className='icon icon-phone'/>
                </Button>

                <Button
                  size     = 'sm'
                  color    = 'primary'
                  disabled = {ref.number_type !== 'mobile'}
                  onClick  = {() => fireEvent('toggleSidebar', {contact: ref})}
                >
                  <span className='icon icon-chat' />
                </Button>
              </ButtonGroup>

              {ref.phone}
              <br />
            </div>
          )
        })}
      </td>

      <td>
        {/* TODO: extract to function */}
        {/* NOTE: should we uniq the email addy's in the store? */}
        {_.uniqBy(
          contact.refs.map((ref) => {
            return (
              <div key={ref.id} className='mb-1'>
                <Button size='sm' color='info' className='mr-2' disabled>
                  <span className='icon icon-mail' />
                </Button>
                {ref.email}
              </div>
            )
          }),
          'email'
        )}
      </td>
    </tr>
  )
}

const Contacts = ({contacts, store, student}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>Contacts</h4>

      <Card>
        <Table>
          <thead>
            <tr>
              <td>
                <strong>Name</strong>
              </td>
              <td>
                <strong>Relationship</strong>
              </td>
              <td>
                <strong>Phone</strong>
              </td>
              <td>
                <strong>Email</strong>
              </td>
            </tr>
          </thead>

          <tbody>
            { contacts.map(c => <ContactEntry store={store} student={student} key={c.name} contact={c}/>) }
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

Contacts.defaultProps = {}

Contacts.propTypes = {}

export default Contacts
