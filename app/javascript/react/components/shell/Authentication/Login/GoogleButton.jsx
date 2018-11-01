import styled  from 'styled-components'
import GButton from 'react-google-button'

const GoogleButton = styled(GButton)`
  box-shadow: none !important;
  border-radius: 0.3rem !important;
  width: 100% !important;
  height: 40px !important;
  line-height: 38px !important;  
  border: 1px solid #d9d9d9 !important;

  &:hover { 
    border: 1px solid #59b2d9 !important;
  }

  & > div {
    width: 38px !important;
    height: 36px !important;
    
    & > svg {
      width: 38px !important;
      height: 38px !important;
    }
  }
`

export default GoogleButton
