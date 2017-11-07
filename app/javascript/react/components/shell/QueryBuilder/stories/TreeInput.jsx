import React from 'react'

const TreeInput = ({onChange, value, error}) => (
  <div className="form-group">
    <h5 className='mb-2'> Tree Input (under works).</h5> 
    <p className='mb-2'>Update <code>/QueryBuilder/stories/tree.js</code> instead.</p>
    <textarea className="form-control" rows="5" onChange={onChange} value={value}/>
    {error && <p className='text-danger'>{error}</p>}
  </div>
)

export default TreeInput
