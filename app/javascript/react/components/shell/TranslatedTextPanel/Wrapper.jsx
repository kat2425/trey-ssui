import styled   from 'styled-components'
import { prop } from 'styled-tools'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  transition: all 0.3s ease;
  border-top: 1px solid ${prop('color', '#e6ecf0')};
  margin-top: 5px;
  padding: 5px 0 5px 0;
  transition: all .3s;
`

export default Wrapper
