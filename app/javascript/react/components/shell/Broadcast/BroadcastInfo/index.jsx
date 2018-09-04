import React          from 'react'
import {observer}     from 'mobx-react'

import Header         from './Header'
import Wrapper        from './Wrapper'
import ScrollView     from './ScrollView'
import MessageBlock   from './MessageBlock'
import RecipientBlock from './RecipientBlock'
import ContactBlock   from './ContactBlock'

function BroadcastInfo({store, show, onGoBack}) {
  if(!show) return null

  const { selectedBroadcast } = store

  return (
    <Wrapper show={show}>
      <Header onGoBack={onGoBack} broadcast={selectedBroadcast}/>
      <ScrollView>
        <MessageBlock broadcast={selectedBroadcast} />
        <RecipientBlock broadcast={selectedBroadcast} />
        <ContactBlock broadcast={selectedBroadcast} />
      </ScrollView>
    </Wrapper>
  )
}

export default observer(BroadcastInfo)
