import styled   from 'styled-components'
import {ifProp} from 'styled-tools'

const bgColor = 'rgba(0, 0, 0, 0.025)'
const borderColor = 'rgba(0, 0, 0, 0.04)'

const Wrapper = styled.div.attrs({ className: 'p-3' })`
 display: flex;
 align-items: center;
 cursor: pointer;
 border-bottom: 1px solid ${borderColor};
 border-right: 1px solid ${borderColor};
 border-left: 2px solid ${borderColor};

 ${ifProp('first', `
    border-top: 1px solid ${borderColor};
    border-top-left-radius: 6px;
 `)}

 ${ifProp('active', `
    background-color:  ${bgColor};
    border-right: 0;
 `)}

 &:hover {
    background-color:  ${bgColor};
 }
`

export default Wrapper
