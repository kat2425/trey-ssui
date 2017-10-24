import styled from 'styled-components'

const Wrapper = styled.div.attrs({className: 'p-2'})`
 display: flex;
 flex: 1;
 flex-flow: column nowrap;
 background-color: rgb(245, 245, 245);
 border-top: 1px solid rgba(255,255,255,0.75);
 border-bottom: 1px solid rgba(255,255,255,0.75);
 box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
`

export default Wrapper
