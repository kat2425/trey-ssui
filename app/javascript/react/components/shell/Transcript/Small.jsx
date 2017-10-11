import styled   from 'styled-components'
import {ifProp} from 'styled-tools'

const Small = styled.small`
  display: block;
  white-space: normal;

  ${ifProp('nowrap', `
    white-space: nowrap;
  `)}
`

export default Small
