import styled    from 'styled-components'
import { ifProp} from 'styled-tools'

const Title = styled.a`
  ${ifProp('isNew', `
    font-style: italic;
  `)}
  &:hover {
    color: #3f9fcf;
  }
`

export default Title
