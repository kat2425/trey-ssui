import React    from 'react'
import styled   from 'styled-components'
import {ifProp} from 'styled-tools'

const Wrapper = styled.span`
  border-radius: 50%;
  margin-left: -30px;
  min-width: 28px;
  height: 28px;
  line-height: 29px;
  vertical-align: top;
  font-size: 14px;
  display: inline-block;
  text-align: center;
  color: #fff;

  ${ifProp('sms', `
    background-color: #a5d1e7;
  `)}

  ${ifProp('call', `
    background-color: #b4d28d;
  `)}

  ${ifProp('email', `
    background-color: #ceb7d6  
  `)}

  ${ifProp('voicemail', `
    background-color: #a2a9fa  
  `)}
`

export const SmsIcon = () => (
  <Wrapper sms>
    <span className='icon icon-chat' />
  </Wrapper>
)

export const CallIcon = () => (
  <Wrapper call>
    <span className='icon icon-phone' />
  </Wrapper>
)

export const EmailIcon = () => (
  <Wrapper email>
    <span className='icon icon-mail' />
  </Wrapper>
)

export const VoicemailIcon = () => (
  <Wrapper voicemail>
    <span className='icon icon-voicemail' />
  </Wrapper>
)



