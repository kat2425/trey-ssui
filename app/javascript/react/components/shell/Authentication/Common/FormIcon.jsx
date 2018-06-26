import { Icon }    from 'antd'
import styled      from 'styled-components'
import { ifProp }  from 'styled-tools'

const FormIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
  ${ifProp('isError', `
    color: tomato;
  `)}
`

export default FormIcon
