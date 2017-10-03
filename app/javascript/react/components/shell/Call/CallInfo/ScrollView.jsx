import styled from 'styled-components'

const ScrollView = styled.div.attrs({className: 'p-3'})`
  background-color: white;
  overflow: auto;
  max-height: calc(100% - 103px);
  height: 100%;
`

export default ScrollView
