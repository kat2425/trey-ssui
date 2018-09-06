import React                 from 'react'
import { observer }          from 'mobx-react'
import ContactAvatar         from 'ui/shell/ContactAvatar'
import uuid                  from 'uuid'
import _                     from 'lodash'
import renderIf              from 'ui/hoc/renderIf'

import PhoneInfo             from './PhoneInfo'
import EmailInfo             from './EmailInfo'
import CommunicationButtons  from './CommunicationButtons/'
import { getUniqueContacts } from './helpers'
import Placeholder           from './Placeholder'

import { 
  Card, 
  CardHeader, 
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap'

const ECommunicationButtons = renderIf(CommunicationButtons)

const ContactCard = ({contact, userStore, ...rest}) => {
  const { contactsWithUniqueEmails, contactsWithUniquePhones } = getUniqueContacts(contact)

  return (
    <Card {...rest}>
      <CardHeader 
        tag       = 'div'
        className = 'd-flex flex-column align-items-center mb-4'
      >
        <ContactAvatar id={contact.refs[0].id} size={95}/>
        <CardTitle className='mt-3 mb-1'>{contact.name}</CardTitle>
        <Relationship contact={contact} />
        <ECommunicationButtons 
          contactsWithUniqueEmails = {contactsWithUniqueEmails}
          contactsWithUniquePhones = {contactsWithUniquePhones}
          renderIf                 = {!userStore.isParent}
        />
      </CardHeader>
      <CardBody className='px-3'>
        <CardItem title='Phone'>
          { _.isEmpty(contactsWithUniquePhones) 
            ? <DefaultPlaceholder icon='phone' />
            : <PhoneInfo key={uuid()} contacts={contactsWithUniquePhones} userStore={userStore}/>
          }
        </CardItem>
        <CardItem title='Email' className='mb-0'>
          { _.isEmpty(contactsWithUniqueEmails)             
            ? <DefaultPlaceholder icon='mail' />
            : <EmailInfo key={uuid()} contacts={contactsWithUniqueEmails} />
          }
        </CardItem>
      </CardBody>
    </Card>
  )
}

const CardItem = ({title, children, className = ''}) => (
  <div className={`mb-4 ${className}`}>
    <CardSubtitle className='mb-2'>{title}</CardSubtitle>
    {children}
  </div>
)

const Relationship = ({contact, withIcon}) => (
  <div className='d-flex align-items-center'>
    {withIcon && <span className='icon icon-users mr-2' />} 
    {contact.relationship 
      ? contact.relationship
      : <span className='invisible'>invisible</span>
    }
  </div>
)

const DefaultPlaceholder = ({icon}) => (
  <div className='d-flex align-items-center'>
    <span className={`icon icon-${icon} mr-2`} /> 
    <span><Placeholder /></span>
  </div>
)

export default observer(ContactCard)
