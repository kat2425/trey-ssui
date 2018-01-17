import React       from 'react'
import PropTypes   from 'prop-types'
import styled      from 'styled-components'
import ChevronLeft from 'react-icons/lib/md/chevron-left'
import ContactLink from 'ui/shell/ContactLink'

Header.propTypes = {
  onGoBack: PropTypes.func.isRequired
}
export default function Header({ onGoBack, call }) {
  const {contact, studentId} = call

  return (
    <Wrapper>
      <MdChevronLeft onClick={onGoBack} />
      <div className='d-flex flex-column ml-auto align-items-end'>
        <ContactLink tag='h4' name={contact.name} studentId={studentId} />
        <h5 className='font-weight-normal m-0 text-capitalize'>{contact.relationship}</h5>
        <p className='text-muted m-0'>{contact.phone}</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({
  className: 'd-flex flex-row align-items-center justify-content-start p-0 pl-4 pr-3' 
})`
  height: 103px; /* must also change ./ScrollView.jsx */
  background-color: rgb(245, 245, 245);
  border-top: 1px solid rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px;
`

const MdChevronLeft = styled(ChevronLeft).attrs({className: 'm-0 h3'})`
  cursor: pointer;
`
