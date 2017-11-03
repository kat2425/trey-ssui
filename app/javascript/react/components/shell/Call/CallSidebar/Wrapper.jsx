import styled from 'styled-components'
import { ifProp } from 'styled-tools'

const NAV_HEIGHT = 57
const ACTION_BAR_HEIGHT = 50
const OFFSET_HEIGHT = `${NAV_HEIGHT + ACTION_BAR_HEIGHT}px`

const Wrapper = styled.div.attrs({className: 'col-md-3 p-0'})`
  height: calc(100vh - ${OFFSET_HEIGHT});
  position: fixed;
  min-width: 365px;

  background-color: rgb(232, 232, 232);
  border-left: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: rgba(0, 0, 0, 0.25) 0px -1px 2px 0px, rgba(0, 0, 0, 0.176) 0px -1px 6px;

  top: ${NAV_HEIGHT}px;
  right: -100%;

  z-index: 1029;

  transition: right 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  will-change: right;

  ${ifProp('show', `
    right: 0;
  `)}
`

export default Wrapper

