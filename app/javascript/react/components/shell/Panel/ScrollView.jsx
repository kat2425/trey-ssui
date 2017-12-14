import styled from 'styled-components'

const ScrollView = styled.div.attrs({className: 'p-2'})`
  min-height: 300px;
  max-height: calc(100vh - 120px);
  height: 100%;

  background-color: white;
  overflow: auto;
`

export default ScrollView
