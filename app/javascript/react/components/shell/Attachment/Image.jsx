import styled from 'styled-components'
import {prop} from 'styled-tools'

const Image = styled.img`
  height: ${prop('size', '80px')};
  width: ${prop('size', '80px')};
  padding: 5px;
`

export default Image
