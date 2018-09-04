import React        from 'react'
import styled       from 'styled-components'
import PropTypes    from 'prop-types'

ContactList.propTypes = {
  broadcast: PropTypes.object.isRequired
}

function ContactList({ broadcast }){
  return(
    <div>
      { broadcast.contacts.map(( contact ) => {
        return (
          <Wrapper key={contact.id}>
            <div>
              { contact.name }
            </div>
            <Relationship>
              {`${contact.student.full_name}'s ${contact.relationship || 'Contact'}`}
            </Relationship>
          </Wrapper>
        )
      })}
    </div>
  )
}

function ContactBlock({ broadcast }){
  return(
    <div className='mb-4'>
      <div className='font-weight-bold mb-2'>
        Received By:
      </div>
      <ContactList broadcast={broadcast} />
    </div>
  )
}

const Wrapper = styled.div.attrs({className: 'py-1'})`
  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`

const Relationship = styled.small`
  padding:          2px;
  margin-left:      auto;
`

export default ContactBlock
