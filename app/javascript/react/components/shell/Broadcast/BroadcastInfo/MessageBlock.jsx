import React        from 'react'
import styled       from 'styled-components'
import PropTypes    from 'prop-types'


MessageBlock.propTypes = {
  broadcast: PropTypes.object.isRequired
}

const BroadcastBody = styled.div.attrs({className: 'p-2 my-2'})`
  overflow: auto;
  color: #fff;
  background-color: #3f9fcf;
  border-bottom-left-radius: 9px !important;
  border-bottom-right-radius: 0 !important;
  position: relative;
  padding: 10px 15px;
  border-radius: 9px;
  border-bottom-left-radius: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.125);
  word-wrap: break-word;
`

function MessageBlock({ broadcast }) {
  return(
    <div className='mb-4'>
      <div className='font-weight-bold mb-2'>
        Message:
      </div>
      <BroadcastBody>
        {broadcast.body}
      </BroadcastBody>
      <small className='d-block text-right'>sent {broadcast.timeAgo}</small>
    </div>
  )
}

export default MessageBlock
