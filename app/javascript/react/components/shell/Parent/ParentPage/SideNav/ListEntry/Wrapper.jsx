import styled     from 'styled-components'
import { ifProp } from 'styled-tools'

const Wrapper = styled.div.attrs({ className: 'p-3' })`
 width: 100%;
 display: flex;
 flex-direction: row;
 align-items: center;
 border-bottom: 1px solid rgba(0, 0, 0, 0.125);
 cursor: pointer;

 ${ifProp('active', `
  background-color: rgb(247, 252, 255);
  color: #3f9fcf;
 `)}

 &:hover {
  background-color: rgb(247, 252, 255);
  color: #3f9fcf;
 }
`

export default Wrapper
