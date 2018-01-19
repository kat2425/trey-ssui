import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'

const Wrapper = styled.div.attrs({
  className: 'd-flex flex-row align-items-center justify-content-between'
})`
  padding: 15px 10px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`

Header.propTypes = {
  title:      PropTypes.string.isRequired,
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
