import React                 from 'react'
import styled                from 'styled-components'
import {ifProp}              from 'styled-tools'
import {UncontrolledTooltip} from 'reactstrap'

const Counter = ({counter, isOverLimit}) => (
  <Wrapper id='counter' sec={isOverLimit}>
    { counter }
    { isOverLimit && (
      <UncontrolledTooltip placement='top' target='counter'>
        Your message will be broken down into chunks before being sent to the recipient's phone.      
      </UncontrolledTooltip>
    )}
  </Wrapper>
)

const Wrapper = styled.span`
  font-size: 12px;
  color: black;
  display: inline-block;
  margin-left: auto;
  margin-right: 5px;
  padding:5px;

  ${ifProp('sec', `
    color: red;
  `)}
`

export default Counter
