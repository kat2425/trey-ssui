import React                        from 'react'
import { ContentWrapper, Wrapper }  from 'ui/shell/Authentication/Common'
import ExplainerText                from './ExplainerText'

const Error = () => {
  return (
    <Wrapper>
      <ContentWrapper size='lg'>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ flex: 1 }}>
          <ExplainerText>Oops! Looks like you followed an invalid link.</ExplainerText>
          <ExplainerText>
            If you've already submitted your verification codes, you can 
            click <a href='/login'>here</a> to login or reset your password.
          </ExplainerText>
        </div>
      </ContentWrapper>
    </Wrapper>
  )
}

export default Error