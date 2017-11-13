import styled     from 'styled-components'
import { ifProp } from 'styled-tools'

const Wrapper = styled.div.attrs({
  className: 'px-0'
})`

  background-color: rgb(232, 232, 232);
  border-left: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: rgba(0, 0, 0, 0.25) 0px -1px 2px 0px, rgba(0, 0, 0, 0.176) 0px -1px 6px;

  ${ifProp('show', `
    right: 0;
  `)}
`

export default Wrapper
