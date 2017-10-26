import styled from 'styled-components'

const Input = styled.div.attrs({className: 'form-control', contentEditable: true})`
  width: 100%;
  min-height: 33px;
  max-height: 300px;
  overflow: auto;
  padding: 7px 10px;
  word-wrap: break-word;
`

export default Input
