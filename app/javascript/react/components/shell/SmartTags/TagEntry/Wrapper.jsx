import styled     from 'styled-components'
import { ifProp } from 'styled-tools'
import { darken } from 'polished'

const Wrapper = styled.div.attrs({ className: 'py-3 px-2' })`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
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

 ${ifProp('isModified', `
  background-color: #fff1f0;

  &:hover {
   background-color: ${darken(0.01, '#fff1f0')};
  }
 `)}
`

export default Wrapper
