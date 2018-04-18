import styled from 'styled-components'

const Content = styled.div`
  display: block;
  position: relative;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  &::after{
    content: '';
    display: block;
    height: 80px;
    width: 100%;
  }
`

export default Content