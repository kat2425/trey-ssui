import React          from 'react'
import Wrapper        from './Wrapper'
import LoadingSpinner from 'ui/shell/LoadingSpinner'

export default function Spinner({color}){
  return (
    <Wrapper color={color}>
      <LoadingSpinner center className='p-1'/>
    </Wrapper>
  )
}
