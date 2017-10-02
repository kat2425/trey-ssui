import React          from 'react'
import LoadingSpinner from 'ui/shell/LoadingSpinner'

const Loader = ({isLoading}) => {
  if(!isLoading) return null
  return <LoadingSpinner className='d-flex justify-content-center'/>
}

export default Loader
