import React                         from 'react'
import styled                        from 'styled-components'
import PaperClip                     from 'react-icons/lib/fa/paperclip'
import {Button, UncontrolledTooltip} from 'reactstrap'


const AttachmentButton = ({onClick, ...rest}) => (
  <Wrapper id='photoSelector' onClick={onClick} {...rest}>
    <PaperClip />
    <UncontrolledTooltip 
      placement='top' 
      target='photoSelector'
    > 
      Attach a photo 
    </UncontrolledTooltip>
  </Wrapper>
)

const Wrapper = styled(Button)`
  font-size: 1rem;
  padding: 0.3rem 0.8rem;
`

export default AttachmentButton
