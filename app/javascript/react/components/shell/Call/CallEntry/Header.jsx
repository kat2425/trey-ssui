import React     from 'react'
import styled    from 'styled-components'
import {ifProp}  from 'styled-tools'
import PropTypes from 'prop-types'

Header.propTypes = {
  call: PropTypes.shape({
    userName:     PropTypes.string.isRequired,
    contactName:  PropTypes.string.isRequired,
    isMissedCall: PropTypes.bool.isRequired,
    isIncoming:   PropTypes.bool.isRequired
  }).isRequired
}


function Header({call}){
  const {userName, contactName, isMissedCall, isIncoming} = call

  return (
    <Wrapper secondary={isMissedCall}>
      {isIncoming ? <Name>{userName}</Name> : <Name bg> {contactName} </Name>}
      <span className={`pr-2 pl-2 text-muted icon ${getDirectionIcon(isIncoming)}`} />
      {isIncoming ? <Name bg> {contactName} </Name> : <Name>{userName} </Name> }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  color: black;
  ${ifProp('secondary', `
    color: red;
  `)}
`

const getDirectionIcon = incoming => 
  incoming ? 'icon-arrow-long-left' : 'icon-arrow-long-right'

const Name = styled.span`
  display: inline-block;
  padding: 6px;

  ${ifProp('bg', `
    background-color: #f2f2f2;
    border-radius: 10px;
  `)}
`

export default Header
