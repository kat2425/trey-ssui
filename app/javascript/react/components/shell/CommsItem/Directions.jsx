import React      from 'react'
import styled     from 'styled-components'
import {ifProp}   from 'styled-tools'
import RightArrow from 'react-icons/lib/fa/long-arrow-right'
import LeftArrow  from 'react-icons/lib/fa/long-arrow-left'
import {ellipsis} from 'polished'


export const Incoming = ({userName, contactName, secondary}) => (
  <Wrapper secondary={secondary}>
    <Name>{userName}</Name>
    <LeftIcon />
    <Name bg>{contactName}</Name>
  </Wrapper>
)

export const Outgoing = ({userName, contactName, secondary}) => (
  <Wrapper secondary={secondary}>
    <Name>{contactName}</Name>
    <RightIcon />
    <Name bg>{userName}</Name>
  </Wrapper>
)

const Wrapper   = styled.div`
  display: flex;
  align-items: center;
  color: black;
  ${ifProp('secondary', `
    color: red;
  `)}
`
const getArrow  = Icon => styled(Icon)`
  margin: 0 10px;
`

const LeftIcon  = getArrow(LeftArrow)

const RightIcon = getArrow(RightArrow)

const Name      = styled.span`
  ${ellipsis('150px')}
  text-align: left;
  padding: 6px;
  ${ifProp('bg', `
    background-color: #f2f2f2;
    border-radius: 10px;
  `)}
`
