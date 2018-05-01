import React           from 'react'
import { observer }    from 'mobx-react'
import _               from 'lodash'
import SubmoduleHeader from 'ui/shell/SubmoduleHeader'

import {
  ButtonGroup, Button, Card, Table,
  UncontrolledTooltip
} from 'reactstrap'

import fireEvent       from 'helpers/FireEvent'

const faveIconStyle = (primary) => {
  return {
    fontSize:      18,
    verticalAlign: 'middle',
    opacity:       (primary ? '0.7' : '0.25'),
    lineHeight:    '1px'
  }
}

const ContactFaveIcon = ({primary, id, handleClick}) => {
  const _icon = primary ? 'icon-star' : 'icon-star-outlined'

  return (
    <span
      onClick   = {() => handleClick(id, !primary)}
      className = {`text-muted mr-2 icon ${_icon}`}
      style     = {faveIconStyle(primary)}
    />
  )
}

const ContactNumber = ({phone, stopped}) => {
  const _stopped_label = {
    textDecoration: (stopped ? 'line-through' : 'inherit'),
    color:          (stopped ? '#d24f4c' : 'inherit' )
  }

  const _stopped_icon = {
    display: (stopped ? 'inline-block' : 'none'),
  }

  return (
    <span style={_stopped_label}>
      <span style={_stopped_icon} className='icon icon-circle-with-cross mr-2'/>
      {phone}
    </span>
  )
}

const ContactEntry = observer(({contact, store, student, handleFave}) => {
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
            <div key={ref.id} id={`id-${ref.id}`} className='mb-1'>
              <ContactFaveIcon handleClick={handleFave} id={ref.id} primary={ref.primary}/>

              <ButtonGroup className='mr-2'>
                <Button
                  onClick = {() => {
                    store.setShowCallDialog(true)
                    store.contact   = ref
                    store.studentId = student.id
                  }}
                  size    = 'sm'
                  color   = 'success'
                  disabled = {(ref.stopped)}
                >
                  <span className='icon icon-phone'/>
                </Button>

                <Button
                  size     = 'sm'
                  color    = 'primary'
                  disabled = {(ref.number_type !== 'mobile') || (ref.stopped)}
                  onClick  = {() => fireEvent('toggleSidebar', {contact: ref})}
                >
                  <span className='icon icon-chat' />
                </Button>
              </ButtonGroup>

              <ContactNumber phone={ref.phone} stopped={ref.stopped}/>
              <UncontrolledTooltip
                placement = 'top'
                target    = {`id-${ref.id}`}
                hidden    = {!ref.stopped}
              >
                This number has requested no communication via SchoolStatus
              </UncontrolledTooltip>
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
            if (ref.email) {
              return (
                <div key={ref.id} className='mb-1'>
                  <Button
                    size      = 'sm'
                    color     = 'info'
                    className = 'mr-2'
                    onClick   = {() => {
                      fireEvent('showMailer', {
                        type: 'individual',
                        id:   ref.id,
                        name: ref.name
                      })
                    }}
                  >
                    <span className='icon icon-mail' />
                  </Button>
                  {ref.email}
                </div>
              )
            }
          }),
          'email'
        )}
      </td>
    </tr>
  )
})

const Contacts = ({contacts, store, student, handleContactFave, handleSendEmail}) => {
  return (
    <div>
      <SubmoduleHeader title='Contacts' />

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
            { contacts.map(c => 
              <ContactEntry
                store           = {store}
                student         = {student}
                key             = {c.name}
                contact         = {c}
                handleFave      = {handleContactFave}
                handleSendEmail = {handleSendEmail}
              />
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

Contacts.defaultProps = {}

Contacts.propTypes = {}

export default observer(Contacts)
