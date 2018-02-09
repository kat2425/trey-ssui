import styled         from 'styled-components'
import {ifProp, prop} from 'styled-tools'

const Wrapper = styled.div`
 display: flex;
 flex: 1;
 align-items: center;
 padding: 5px 8px; 
 margin: 10px 0;
 background: ${prop('background','#f3f3f3')};
 border: 1px solid rgba(0, 0, 0, 0.125);
 border-radius: 4px;

 ${ifProp('disabled', `
  background: #f3f3f3;
  cursor: default;
  pointer-events: none;
  opacity: 0.65;
`)}
`

export default Wrapper
