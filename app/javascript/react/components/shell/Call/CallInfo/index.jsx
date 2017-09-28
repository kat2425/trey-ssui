import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'

import Header     from './Header'
import ScrollView from './ScrollView'
import Wrapper    from './Wrapper'
import SubHeader  from './SubHeader'
import Transcript from './Transcript'
import Player     from 'ui/shell/Player'

CallInfo.propTypes = {
  store:    PropTypes.object.isRequired,
  show:     PropTypes.bool.isRequired,
  onGoBack: PropTypes.func.isRequired
}

function CallInfo({store, show, onGoBack}) {
  const {selectedCall} = store

  if(!show) return null

  return (
    <Wrapper show={show}>
      <Header onGoBack={onGoBack} call={selectedCall}/>
      <ScrollView>
        <SubHeader call={selectedCall} />
        <Transcript call={selectedCall} />
        <Player src={selectedCall.recordingPath} />
      </ScrollView>
    </Wrapper>
  )
}

export default observer(CallInfo)
