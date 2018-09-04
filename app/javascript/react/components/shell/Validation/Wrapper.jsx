import styled from 'styled-components'

/* eslint max-len: 0 */

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(-7deg, #6187ad, #557798, #506f8e, #4e6d8c, #3a5877, #192734, #16232f, #192734, #3a5877, #4e6d8c, #506f8e, #557798, #6187ad);
  background-size: 400% 400%;
  margin-top: -49px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(https://d28h61i1564zn0.cloudfront.net/bg-tile-trans.svg) repeat;
    background-size: contain;
    opacity: 0.2;
  }
`

export default Wrapper