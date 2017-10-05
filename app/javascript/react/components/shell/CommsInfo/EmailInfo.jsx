import React      from 'react'
import {observer} from 'mobx-react'
import styled     from 'styled-components'
import {prop}     from 'styled-tools'
import renderHTML from 'react-render-html'
import { Card }   from 'reactstrap'

const EmailInfo = ({comm}) => {
  const {isEmail, email, isLoading} = comm

  if(!isEmail) return null

  if(isLoading) return (
    <Wrapper bg='#f3f3f3'>
      <p className='text-center m-0 p-3 text-muted'>Loading ...</p>
    </Wrapper>
  )

  if(!email) return (
    <Wrapper bg='#f3f3f3'>
      <p className='text-center m-0 p-3 text-muted'> Empty email </p>
    </Wrapper>
  )
  return (
    <Wrapper>
      <Subject>{email.subject}</Subject>
      <p>{renderHTML(email.body)}</p>
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  background-color: ${prop('bg', '#fff')};
  padding: 15px;
`

const Subject = styled.p.attrs({className: 'text-muted'})`
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  padding-bottom: 15px;
`

export default observer(EmailInfo)
