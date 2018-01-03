import React      from 'react'
import Pre        from './Pre'
import ReactJson  from 'react-json-pretty'
import {observer} from 'mobx-react'

const QueryView = ({tag}) => (
  <div className='my-4'> 
    <h5>Human String Format</h5>
    <Pre>
      <ReactJson json={tag.humanStringFormat}/>
    </Pre>

    <h5 className='mt-4'>Builder Format </h5>
    <Pre>
      <ReactJson json={tag.queryFormat}/>
    </Pre>

    <h5 className='mt-4'>Tree Format</h5>
    <Pre>
      <ReactJson json={tag.treeFormat}/>
    </Pre>
  </div>
)

export default observer(QueryView)
