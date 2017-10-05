import React      from 'react'
import {observer} from 'mobx-react'
import Transcript from './Transcript'
import Player     from 'ui/shell/Player'

const CallInfo = ({comm}) => {
  const {isCall, preview} = comm

  if(!isCall) return null

  return (
    <div className='d-flex flex-column'>
      <Transcript comm={comm}/>
      <Player src={preview}/>
    </div>
  )
}

export default observer(CallInfo)
