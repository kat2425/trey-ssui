export const CONTACT_TYPE = {
  PHONE: 'phone',
  EMAIL: 'email'
}

export const BUTTON_LABEL = {
  CALL:  'Call',
  TEXT:  'Text',
  EMAIL: 'Email'
}

export const getButtonConfig = (contactsWithUniquePhones, contactsWithUniqueEmails) => {
  return [{
    label:            BUTTON_LABEL.CALL,
    size:             'lg',
    iconClass:        'icon icon-phone',
    className:        'rounded-circle',
    color:            'success',
    style:            {padding: '5px 8px'},
    keyForValue:      CONTACT_TYPE.PHONE,
    iconNameForValue: 'phone',
    contacts:         contactsWithUniquePhones,
    hasContacts:      contactsWithUniquePhones.length > 1,
    onClick:          (contact) => { contact.initiateCall() }
  },{
    label:            BUTTON_LABEL.TEXT,
    size:             'lg',
    iconClass:        'icon icon-chat',
    className:        'rounded-circle',
    color:            'primary',
    style:            {padding: '5px 8px'},
    keyForValue:      CONTACT_TYPE.PHONE,
    iconNameForValue: 'phone',
    contacts:         contactsWithUniquePhones,
    hasContacts:      contactsWithUniquePhones.length > 1,
    onClick:          (contact) => { contact.initiateText() }
  },{
    label:            BUTTON_LABEL.EMAIL,
    size:             'lg',
    iconClass:        'icon icon-mail',
    className:        'rounded-circle',
    color:            'info',
    style:            {padding: '5px 8px'},
    keyForValue:      CONTACT_TYPE.EMAIL,
    iconNameForValue: 'mail',
    contacts:         contactsWithUniqueEmails,
    hasContacts:      contactsWithUniqueEmails.length > 1,
    onClick:          (contact) => { contact.initiateEmail() }
  }]
}

export const isDisabled = ({contact, contactType, label}) => {
  switch(contactType + label){
  case CONTACT_TYPE.PHONE + BUTTON_LABEL.CALL:
    return contact.stopped
  case CONTACT_TYPE.PHONE + BUTTON_LABEL.TEXT:
    return contact.isFetchingNumCapability || contact.isTextingDisabled
  default:
    return false
  }
}
