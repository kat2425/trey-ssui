import styled            from 'styled-components'
import { ListGroupItem } from 'reactstrap'

const Wrapper = styled(ListGroupItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:hover{
    background-color:  rgba(0, 0, 0, 0.08);
  }
`

export default Wrapper

