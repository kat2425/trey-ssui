import React      from 'react'
import {observer} from 'mobx-react'
import Transcript from 'ui/shell/Transcript'
import Player     from 'ui/shell/Player'
import CallNotes  from 'ui/shell/Call/CallNotes'

const CallInfo = ({comm}) => {
  const {preview, transcript, isLoading, notes} = comm

  return (
    <div className='d-flex flex-column'>
      <Transcript isLoading={isLoading} transcript={transcript}/>
      <Player src={preview}/>
      <CallNotes notes={notes} />
    </div>
  )
}

export default observer(CallInfo)
