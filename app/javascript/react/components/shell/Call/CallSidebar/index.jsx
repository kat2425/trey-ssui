import React            from 'react'
import PropTypes        from 'prop-types'
import {observer}       from 'mobx-react'
import uuid             from 'uuid'

import Header           from './Header'
import ScrollView       from './ScrollView'
import CallEntry        from '../CallEntry'
import Wrapper          from './Wrapper'

import LoadingSpinner   from 'ui/shell/LoadingSpinner'
import VisibilitySensor from 'react-visibility-sensor'

CallSidebar.propTypes = {
  store:   PropTypes.object.isRequired,
  show:    PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

function CallSidebar({store, show, onClose}) {
  const {descCalls, isLoading, loadMore} = store

  if(!show) return null
  return (
    <Wrapper show={show}>
      <Header title='Recent Calls'  onClose={onClose}/>
      <ScrollView>
        {descCalls.map(call => <CallEntry key={uuid()} call={call} />)}
        {isLoading && <LoadingSpinner className='d-flex flex-row justify-content-center' />}
        <VisibilitySensor onChange={loadMore}>
          <div className='invisible p-1'>invisible</div>
        </VisibilitySensor>
      </ScrollView>
    </Wrapper>
  )
}

export default observer(CallSidebar)
