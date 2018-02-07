import React from 'react'

const ResultsHeader = ({title, results, total}) => (
  <div className='d-flex flex-row align-items-center justify-content-between mb-2'>
    <h4 className='mb-3'>{title}</h4>
    {!!total && <p className='text-muted'>{results} of {total} results</p>}
  </div>
)

export default ResultsHeader
