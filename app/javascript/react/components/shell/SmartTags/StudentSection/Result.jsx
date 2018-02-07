import React from 'react'

function Result({results, total}){
  return (
    <p className="text-muted">{`Page ${results} of ${total}`}</p>
  )
}

export default Result
