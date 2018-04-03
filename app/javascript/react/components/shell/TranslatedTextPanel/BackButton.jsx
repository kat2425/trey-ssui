import styled     from 'styled-components'
import { Button } from 'reactstrap'

const BackButton =  styled(Button).attrs({className: 'p-0 mr-2'})`
  margin-top: -1px;
  font-size: 12px;
  color: inherit;

  &: hover {
    color: inherit;
    opacity: 0.6;
  }
`

export default BackButton
