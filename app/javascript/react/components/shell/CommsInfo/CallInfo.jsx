import React      from 'react'
import {observer} from 'mobx-react'
import Transcript from 'ui/shell/Transcript'
import Player     from 'ui/shell/Player'
import CallNotes  from 'ui/shell/Call/CallNotes'

const CallInfo = ({comm}) => {
  return (
    <div className='d-flex flex-column'>
      <Player src={comm.preview}/>
      <Transcript 
        isLoading          = {comm.isFetchingTranscript}
        transcript         = {comm.transcript}
        onTranslate        = {comm.handleOnTranslate}
        onTranslating      = {comm.handleOnTranslating}
        originalTranscript = {comm.originalTranscript}
      />
      <CallNotes notes={comm.notes} />
    </div>
  )
}

export default observer(CallInfo)
