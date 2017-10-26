import styled    from 'styled-components'
import Clear     from 'react-icons/lib/md/clear'

const ClearButton = styled(Clear).attrs({className: 'm-0'})`
  color: #fff;
  padding:1px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  top: -5px;
  right: -5px;
`

export default ClearButton
