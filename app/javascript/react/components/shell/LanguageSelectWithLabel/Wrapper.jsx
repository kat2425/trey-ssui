import styled           from 'styled-components'
import { prop, ifProp } from 'styled-tools'

const Wrapper = styled.div`
  display: inline-flex;
  transition: all 0.3s ease;
  flex-flow: row wrap;
  padding-top: 10px;
  align-items: center;
  color: ${prop('color', '#657786')};
  font-size: 14px;

  ${ifProp('disabled', `
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.65; 
  `)}
`

export default Wrapper
