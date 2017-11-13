import React      from 'react'
import {observer} from 'mobx-react'
import Transcript from 'ui/shell/Transcript'
import Player     from 'ui/shell/Player'

const CallInfo = ({comm}) => {
  const {preview, transcript, isLoading} = comm

  return (
    <div className='d-flex flex-column'>
      <Transcript isLoading={isLoading} transcript={transcript}/>
      <Player src={preview}/>
    </div>
  )
}

export default observer(CallInfo)
