import React       from 'react'
import styled      from 'styled-components'
import {ifProp}    from 'styled-tools'
import ChevronLeft from 'react-icons/lib/md/chevron-left'

export default function Header({ comm }) {
  const {contact, userName, isCall} = comm

  return (
    <Wrapper>
      {!isCall && <User name={userName} />}
      {!isCall && <span className='text-muted mr-3 icon icon-swap' style={{fontSize: 16}}/>}
      <Contact contact={contact} />
    </Wrapper>
  )
}

const Name  = styled.h4`
  padding: 8px;
  ${ifProp('bg', `
    background-color: #eaeaea;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    margin:0;
  `)}
`

const User = ({name}) => (
  <div className='d-inline-flex mr-auto'>
    <Name>{name}</Name>
  </div>
)

const Contact = ({contact}) => (
  <div className='d-flex flex-column ml-auto align-items-end'>
    <Name bg>{contact.name}</Name>
    <h5 className='font-weight-normal mt-1 text-capitalize'>{contact.relationship}</h5>
    <p className='text-muted m-0'>{contact.phone}</p>
  </div>
)

const Wrapper = styled.div.attrs({
  className: 'd-flex flex-row align-items-center justify-content-space-between pr-3' 
})`
  background-color: transparent;
`

const MdChevronLeft = styled(ChevronLeft).attrs({className: 'm-0 h3'})`
  cursor: pointer;
`
