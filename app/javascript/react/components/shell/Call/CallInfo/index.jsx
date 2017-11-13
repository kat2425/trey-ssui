import React          from 'react'
import PropTypes      from 'prop-types'
import {observer}     from 'mobx-react'

import Header         from './Header'
import ScrollView     from './ScrollView'
import Wrapper        from './Wrapper'
import SubHeader      from './SubHeader'
import Transcript     from 'ui/shell/Transcript'
import Player         from 'ui/shell/Player'

CallInfo.propTypes = {
  store:    PropTypes.object.isRequired,
  show:     PropTypes.bool.isRequired,
  onGoBack: PropTypes.func.isRequired
}

function CallInfo({store, show, onGoBack}) {
  if(!show) return null

  const {selectedCall} = store
  const {isLoading, transcript = []} = selectedCall

  return (
    <Wrapper show={show}>
      <Header onGoBack={onGoBack} call={selectedCall}/>
      <ScrollView>
        <SubHeader call={selectedCall} />
        <Transcript isLoading={isLoading} transcript={transcript} />
        <Player src={selectedCall.recordingPath} />
      </ScrollView>
    </Wrapper>
  )
}

export default observer(CallInfo)
