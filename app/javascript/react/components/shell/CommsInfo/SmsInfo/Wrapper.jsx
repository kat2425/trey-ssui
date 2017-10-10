import styled             from 'styled-components'
import {prop}             from 'styled-tools'

const Wrapper = styled.ul.attrs({className: 'media-list media-list-conversation c-w-md'})`
  background-color: ${prop('bg', '#f3f3f3')};
  border: 1px solid rbgba(0,0,0,0.125);
`

export default Wrapper
