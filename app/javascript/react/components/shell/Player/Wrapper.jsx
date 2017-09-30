import styled         from 'styled-components'
import {ifProp, prop} from 'styled-tools'

const Wrapper = styled.div`
 display: flex;
 flex: 1;
 align-items: center;
 padding: 5px 8px; 
 background: ${prop('background','#f3f3f3')};

 ${ifProp('disabled', `
  background: #f3f3f3;
  cursor: default;
  pointer-events: none;
  opacity: 0.65;
`)}
`

export default Wrapper
