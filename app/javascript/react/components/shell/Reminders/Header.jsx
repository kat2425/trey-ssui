import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'

const Wrapper = styled.div.attrs({
  className: 'd-flex flex-row align-items-center justify-content-start p-0 pl-4 pr-3' 
})`
  height: 65px;
  background-color: rgb(245, 245, 245);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`

Header.propTypes = {
  title:   PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}
export default function Header({ title, onClose }) {
  return (
    <Wrapper>
      <span className='icon icon-clock text-muted mr-3 h4 m-0' />
      <h4 className='m-0'>{title}</h4>
      <span className='icon icon-cross text-muted ml-auto h5 m-0 btn-link' onClick={onClose}/>
    </Wrapper>
  )
}

