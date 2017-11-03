import { ifProp }  from 'styled-tools'
import { FaGlobe } from 'react-icons/lib/fa'
import omitStyled  from 'helpers/omitStyled'

const GlobeIcon = omitStyled(FaGlobe, ['spin'])`
  font-size: 16px;
  ${ifProp('spin', `
    animation: spin 1s infinite linear;
  `)}
`

GlobeIcon.defaultProps = {
  spin: false
}

export default GlobeIcon
