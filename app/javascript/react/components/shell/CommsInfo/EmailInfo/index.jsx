import React      from 'react'
import {observer} from 'mobx-react'
import _          from 'lodash'
import uuid       from 'uuid'
import Email      from './Email'

const EmailInfo = ({store}) => {
  return (
    <div>
      {
        _.map(store.orderedEmails,(emails, date) => 
          <EmailList key={uuid()} date={date} list={emails} />
        )
      }
    </div>
  )
}

const EmailList = ({date, list}) => (
  <div>
    <p className='text-center text-muted'>{date}</p>
    {list.map(c => <Email key={uuid()} date={date} comm={c} />)}
  </div>
)

export default observer(EmailInfo)
