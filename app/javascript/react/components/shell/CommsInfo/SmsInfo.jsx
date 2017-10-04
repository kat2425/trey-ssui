import React      from 'react'
import {observer} from 'mobx-react'
import styled     from 'styled-components'
import {prop}     from 'styled-tools'


const SmsInfo = ({comm}) => {
  const {isSms, isLoading, sms, isIncoming} = comm

  if(!isSms) return null
  if(isLoading) return <Loader />

  return <SMS isIncoming={isIncoming}>{sms.body}</SMS>
}

const SMS = ({isIncoming, children}) => (
  <Wrapper>
    <li className={`media ${getIncomingClass(isIncoming)}`}>
      <div className='media-body'>
        <div className='media-body-text'>
          {children}
        </div>
      </div>
    </li>
  </Wrapper>
)

const Loader = () => (
  <Wrapper>
    <p className='p-2 text-center'>Loading ...</p>
  </Wrapper>
)

const getIncomingClass = isIncoming => isIncoming ? 'mr-5 m-2 ml-0' : 'media-current-user ml-5 m-2 mr-0'


const Wrapper = styled.ul.attrs({className: 'media-list media-list-conversation c-w-md'})`
  background-color: ${prop('bg', '#f3f3f3')};
  border: 1px solid rbgba(0,0,0,0.125);
`

export default observer(SmsInfo)
