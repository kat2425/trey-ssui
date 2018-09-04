import _ from 'lodash'

export function getUniqueContacts(_contact){
  const contactsWithValidEmails  = _contact.refs.filter(c => c.email)
  const contactsWithValidPhones  = _contact.refs.filter(c => c.phone)
  const contactsWithUniqueEmails = _.uniqBy(contactsWithValidEmails, 'email')
  const contactsWithUniquePhones = _.uniqBy(contactsWithValidPhones, 'phone')
  const contact                  = _.head(_contact.refs.filter(c => c.id))

  return {
    contactsWithUniqueEmails,
    contactsWithUniquePhones,
    contact
  }
}
