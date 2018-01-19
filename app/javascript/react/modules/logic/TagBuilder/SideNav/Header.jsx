import React     from 'react'
import PropTypes from 'prop-types'

import styled    from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  background-color: rgb(255,255,255);
  border-bottom: 1px solid rgba(0,0,0,0.125);
  height: 65px;
`

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default function Header({title, children}){
  return (
    <Wrapper>
      <h4 className='m-0'>{title}</h4>
      {children}
    </Wrapper>
  )
}

