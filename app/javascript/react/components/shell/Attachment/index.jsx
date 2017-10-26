import React       from 'react'
import PropTypes   from 'prop-types'

import Wrapper     from './Wrapper'
import Image       from './Image'
import ClearButton from './ClearButton'

Attachment.propTypes = {
  onClear: PropTypes.func.isRequired,
  src:     PropTypes.string.isRequired
}
export default function Attachment({ onClear, src }) {
  return (
    <Wrapper>
      <ClearButton onClick={onClear} />
      <Image src={src} />
    </Wrapper>
  )
}

