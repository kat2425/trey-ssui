import React from 'react'

function Result({results, total}){
  if(!total) return null

  return (
    <p className="text-muted">{`Page ${results} of ${total}`}</p>
  )
}

export default Result
