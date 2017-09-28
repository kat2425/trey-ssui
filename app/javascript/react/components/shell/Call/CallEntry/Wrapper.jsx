import styled from 'styled-components'

const Wrapper = styled.div.attrs({ className: 'p-3 pl-3' })`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 border-bottom: 1px solid rgba(0, 0, 0, 0.125);
 cursor: pointer;
 &:hover {
  background-color:  rgba(0, 0, 0, 0.08);
 }
`

export default Wrapper
