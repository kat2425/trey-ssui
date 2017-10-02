import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'

import Header     from './Header'
import ScrollView from './ScrollView'
import Wrapper    from './Wrapper'
import SubHeader  from './SubHeader'
import Transcript from './Transcript'
import Player     from 'ui/shell/Player'

CommsInfo.propTypes = {
  store: PropTypes.object.isRequired,
  show:  PropTypes.bool.isRequired
}
function CommsInfo({store, show}) {
  const {selectedComm} = store

  if(!show) return null
  
  if(!selectedComm) return (
    <Wrapper>
      <p className='text-muted text-align-center'>No communication selected</p>
    </Wrapper>
  )

  const { isCall, preview } = selectedComm

  return (
    <Wrapper show={show}>
      <Header comm={selectedComm}/>
      <ScrollView>
        <SubHeader comm={selectedComm} />
        {isCall && <Transcript comm={selectedComm} />}
        {isCall && <Player src={preview} />}
      </ScrollView>
    </Wrapper>
  )
}

export default observer(CommsInfo)
