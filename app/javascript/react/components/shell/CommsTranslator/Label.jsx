import React        from 'react'
import { observer } from 'mobx-react'
import PropTypes    from 'prop-types'
import styled       from 'styled-components'


Label.propTypes = {
  onClick:      PropTypes.func.isRequired,
  languageName: PropTypes.string.isRequired
}

function Label({onClick, languageName}){
  return (
    <Wrapper onClick={onClick}>
      Translate from <span className='ml-1'>{languageName}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;

  &:hover{
   opacity: 0.8;
  }
`

export default observer(Label)
