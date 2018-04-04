import styled           from 'styled-components'
import { ifProp, prop } from 'styled-tools'
import { ellipsis }     from 'polished'

export const Text = styled.span`
  ${props => props.ew && ellipsis(props.ew)};
  font-size: ${prop('fontSize', 'inherit')};
  ${ifProp('link', `
    cursor: pointer;
    &:hover { 
     text-decoration: underline;
    }
  `)}
`

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`
export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  align-items: ${prop('alignItems', 'center')};
`
export const FlexItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  justify-content: ${prop('justifyContent', 'start')};
`

export const Col = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  flex: ${prop('flex', '0')};
  margin-left: ${ifProp('right', 'auto')};
  margin-right: ${ifProp('left', 'auto')};
`

