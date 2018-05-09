import styled       from 'styled-components'
import { ellipsis } from 'polished'

const Preview = styled.p`
  ${ellipsis('100%')}
  font-size: 12px;
` 

export default Preview