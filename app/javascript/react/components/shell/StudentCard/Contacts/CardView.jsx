import React                from 'react'
import { inject, observer } from 'mobx-react'
import ContactCard          from './ContactCard'
import uuid                 from 'uuid'
import styled               from 'styled-components'

const CardView = ({ contactStore, userStore }) => (
  <CardWrapper>
    {contactStore.groupedContacts.map(c => (
      <ContactCard key={uuid()} contact={c} userStore={userStore} />
    ))}
  </CardWrapper>
)

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  grid-gap: 2rem;
`

export default inject('contactStore')(observer(CardView))
