import styled       from 'styled-components'
import { ellipsis } from 'polished'

const Title = styled.a`
  ${ellipsis('100%')}
  width: 100%;
  margin-left: 10px;
  &:hover {
    color: #3f9fcf;
  }
`

export default Title
