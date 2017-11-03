import styled     from 'styled-components'
import { prop }   from 'styled-tools'
import { Select } from 'antd'

const StyledSelect = styled(Select)`
  min-width: 100px;
  & .ant-select-selection {
    color: ${prop('color', '#657786')};
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid ${prop('color', '#dae1e7')};
    border-radius: 0;
    &:hover,
    &:focus,
    &:active {
      border-bottom: 1px solid ${prop('color', '#dae1e7')};
      box-shadow: none;
    }
  }
  & .ant-select-arrow {
    color: ${prop('color', '#657786')};
  }
`

export default StyledSelect
