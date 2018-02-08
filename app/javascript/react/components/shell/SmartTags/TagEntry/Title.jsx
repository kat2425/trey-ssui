import styled    from 'styled-components'
import { ifProp} from 'styled-tools'
import { ellipsis } from 'polished'

const Title = styled.a`
  ${ellipsis('100%')}
  width: 100%;
  ${ifProp('isNew', `
    font-style: italic;
  `)}
  &:hover {
    color: #3f9fcf;
  }
`

export default Title
