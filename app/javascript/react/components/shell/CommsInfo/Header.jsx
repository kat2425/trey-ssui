import React       from 'react'
import PropTypes   from 'prop-types'
import styled      from 'styled-components'
import ChevronLeft from 'react-icons/lib/md/chevron-left'

export default function Header({ comm }) {
  const {contact} = comm

  return (
    <Wrapper>
      <div className='d-flex flex-column ml-auto align-items-end'>
        <h4>{contact.name}</h4>
        <h5 className='font-weight-normal m-0 text-capitalize'>{contact.relationship}</h5>
        <p className='text-muted m-0'>{contact.phone}</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({
  className: 'd-flex flex-row align-items-center justify-content-start pr-3' 
})`
  background-color: transparent;
`

const MdChevronLeft = styled(ChevronLeft).attrs({className: 'm-0 h3'})`
  cursor: pointer;
`
