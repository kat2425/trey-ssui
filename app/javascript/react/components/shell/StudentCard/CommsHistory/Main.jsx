import React from 'react'

const Main = ({children}) => (
  <div className='row' style={divStyle}>
    {children}
  </div>
)

const divStyle = {
  height: 'inherit'
}

export default Main
