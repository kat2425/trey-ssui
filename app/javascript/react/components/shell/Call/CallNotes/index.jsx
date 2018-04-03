import React         from 'react'
import { observer }  from  'mobx-react'
import Wrapper       from './Wrapper'
import { Card }      from 'reactstrap' 
import uuid          from 'uuid'

const CallNotes = ({ notes }) => {
  return (
    <Wrapper>
      <p className='mb-1 font-weight-bold'>Notes: </p>
      {notes && notes.length > 0
        ? notes.map((note) => {
          return (
            <Card key={uuid()} className='mb-2'>
              <div className='p-3'>
                <p>{note.body}</p>
              </div>
            </Card>
          )
        })
        : <p style={{color: 'darkgray'}}>No notes for this call yet.</p>}
    </Wrapper>
  )
}

export default observer(CallNotes)
