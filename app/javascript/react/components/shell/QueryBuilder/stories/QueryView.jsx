import React     from 'react'
import Pre       from './Pre'
import ReactJson from 'react-json-pretty'

const QueryView = ({tree, builderFormat}) => (
  <div className='my-4'> 
    <h5>Builder Format </h5>
    <Pre>
      <ReactJson json={builderFormat}/>
    </Pre>

    <h5 className='mt-4'>Tree Format</h5>
    <Pre>
      <ReactJson json={tree}/>
    </Pre>
  </div>
)

export default QueryView
