import React    from 'react'
import styled   from 'styled-components'
import { omit } from 'lodash/fp'

const omitStyled = (element, omitProps) => {
  return styled(props => React.createElement(element, {...omit(omitProps, props)}))
}

export default omitStyled
