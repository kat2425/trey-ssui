import styled     from 'styled-components'
import { ifProp } from 'styled-tools'

/* eslint max-len: 0 */

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(-7deg,#3a5877,#192734,#16232f,#192734);
  background-size: 400% 400%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(https://d28h61i1564zn0.cloudfront.net/bg-tile-trans.svg) repeat;
    background-size: 650px 650px;
    opacity: 0.075;
  }

  ${ifProp('noNav', `margin-top: -49px;`)}
`

export default Wrapper
