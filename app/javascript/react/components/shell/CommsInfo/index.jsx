import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'

import Header     from './Header'
import ScrollView from './ScrollView'
import Wrapper    from './Wrapper'
import SubHeader  from './SubHeader'
import CallInfo   from './CallInfo'
import SmsInfo    from './SmsInfo/'
import EmailInfo  from './EmailInfo/'

CommsInfo.propTypes = {
  store: PropTypes.object.isRequired,
  show:  PropTypes.bool.isRequired
}
function CommsInfo({store, show}) {
  const {selectedComm} = store
  const {isCall, isSms, isEmail, isVoicemail} = selectedComm

  if(!show) return null
  
  return (
    <Wrapper show={show}>
      <Header comm={selectedComm}/>
      <ScrollView>
        <SubHeader comm={selectedComm} />
        {(isCall || isVoicemail)  && <CallInfo comm={selectedComm} />}
        {isEmail && <EmailInfo store={store} comm={selectedComm} />}
        {isSms   && <SmsInfo store={store} comm={selectedComm} />}
      </ScrollView>
    </Wrapper>
  )
}

export default observer(CommsInfo)
