import styled   from 'styled-components'
import SSButton from 'ui/shell/SSButton'

const SSFab = styled(SSButton)`
  width: 54px;
  height: 54px;
  border: 0px;
  border-radius: 50%;
  box-shadow: 0 6px 10px 0 #666;
  transition: all 0.1s ease-in-out;
  outline: 0 !important;

  font-size: 35px;
  color: white;
  text-align: center;
  line-height: 27px;

  position: fixed;
  right: 25px;
  bottom: 75px;
  :hover {
     box-shadow: 0 6px 14px 0 #666;
     transform: scale(1.05);
   }
`

export default SSFab
