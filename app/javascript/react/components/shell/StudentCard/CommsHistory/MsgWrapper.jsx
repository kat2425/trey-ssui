import React             from 'react'
import {Card, CardBlock} from 'reactstrap'

const MsgWrapper = ({children}) => (
  <Card className='mt-5'>
    <CardBlock>
      <p className='text-center m-0'>{children}</p>
    </CardBlock>
  </Card>
)

export default MsgWrapper
