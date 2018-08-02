import React           from 'react'
import styled, { css } from 'styled-components'
import { switchProp }  from 'styled-tools'
import PropTypes       from 'prop-types'


ContentWrapper.propTypes = {
  children: PropTypes.node,
  size:     PropTypes.oneOf(['sm', 'lg']),
}


function ContentWrapper({children, size = 'sm'}){
  return (
    <Section>
      <div className='d-flex justify-content-center'>
        <img className='mb-4' src='https://secure.schoolstatus.com/images/ss-logo.svg?1478188768' />
      </div>
      <Wrapper size={size}>
        {children}
      </Wrapper>
    </Section>
  )
}

const Section = styled.section`
  width: 100%;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 1;
`
const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  z-index: 1;
  ${switchProp('size', {
    sm: css`
      width: 400px;
      padding: 40px 1.5rem 20px 1.5rem;
      justify-content: center;
    `,
    lg: css`
      width: 70%;
      min-height: 70vh;
      height: 100%;
      padding: 2rem;
    `
  })}

  overflow: hidden;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 10px 40px 5px rgba(0,0,0,0.5);

`

export default ContentWrapper
