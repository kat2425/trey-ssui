import styled       from 'styled-components'
import { ifProp}    from 'styled-tools'
import { ellipsis } from 'polished'

const Title = styled.a`
  ${ellipsis('100%')}
  flex: 1;
  width: 100%;
  font-weight:bold;
  ${ifProp('isNew', `
    font-style: italic;
    flex: 2;
  `)}
  &:hover {
    color: #3f9fcf;
  }
`

export default Title
