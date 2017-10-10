import React      from 'react'
import {observer} from 'mobx-react'
import _          from 'lodash'
import uuid       from 'uuid'

import Wrapper    from './Wrapper'
import SMS        from './SMS'


const SmsInfo = ({store}) => {
  return (
    <Wrapper>
      {
        _.map(store.orderedSms,(msgs, date) => (
          <SMSList key={uuid()} date={date} list={msgs}/>
        ))
      }
    </Wrapper>
  )
}

const SMSList = ({date, list}) => (
  <div key={uuid()}>
    <p className='text-center text-muted'>{date}</p>
    {list.map(comm => <SMS key={comm.id} comm={comm} />)}
  </div>
)

export default observer(SmsInfo)
