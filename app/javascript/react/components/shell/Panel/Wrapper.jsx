import styled     from 'styled-components'
import { ifProp } from 'styled-tools'

const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin-bottom: 20px;

  ${ifProp('noBorder', `
    border: none;
  `)}
`

export default Wrapper
