import styled from 'styled-components'

const Content = styled.div`
  display: block;
  position: relative;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  max-height: calc(100vh - 300px);
  &::after{
    content: '';
    display: block;
    height: 80px;
    width: 100%;
  }
`

export default Content
