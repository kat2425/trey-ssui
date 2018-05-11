import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'

const Wrapper = styled.div.attrs({
  className: 'd-flex flex-row align-items-center justify-content-between'
})`
  padding: 20px 18px;
  background-color: #fff;
  flex-wrap: wrap;
`

Header.propTypes = {
  title:      PropTypes.node.isRequired,
  titleRight: PropTypes.func
}

export default function Header({ title, titleRight }) {
  return (
    <Wrapper>
      <h5 className='m-0'>{title}</h5>
      {titleRight && titleRight()}
    </Wrapper>
  )
}
