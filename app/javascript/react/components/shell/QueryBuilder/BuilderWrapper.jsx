import React       from 'react'
import PropTypes   from 'prop-types'
import { Builder } from 'react-awesome-query-builder'

BuilderWrapper.propTypes = {
  tree:   PropTypes.object,
  config: PropTypes.object
}
export default function BuilderWrapper(props) {
  return (
    <div className='query-builder' className='m-0'>
      <Builder {...props} />
    </div>
  )
}

