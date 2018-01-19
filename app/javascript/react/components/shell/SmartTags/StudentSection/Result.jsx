import React from 'react'

function Result({results, total}){
  return (
    <p className="text-muted">{`shown ${results} of ${total}`}</p>
  )
}

export default Result
