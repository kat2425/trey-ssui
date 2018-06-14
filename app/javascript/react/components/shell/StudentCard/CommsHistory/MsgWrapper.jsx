import React             from 'react'
import {Card, CardBody}  from 'reactstrap'

const MsgWrapper = ({children}) => (
  <Card className='mt-5'>
    <CardBody>
      <p className='text-center p-3 m-0'>{children}</p>
    </CardBody>
  </Card>
)

export default MsgWrapper
