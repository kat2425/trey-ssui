import React     from 'react'
import PropTypes from 'prop-types'

import styled    from 'styled-components'

const Wrapper = styled.div`
  padding: 20px 10px;
  background-color: rgb(245,245,245);
  border-bottom: 1px solid rgba(0,0,0,0.125);
  height: 65px;
`

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default function Header({title}){
  return (
    <Wrapper>
      <h4 className='m-0'>{title}</h4>
    </Wrapper>
  )
}

