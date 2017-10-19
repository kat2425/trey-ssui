import React           from 'react'
import { storiesOf }   from '@storybook/react'

import {test_data}     from 'ui/shell/Call'
import FormattedScript from '../'


const stories = storiesOf('FormattedScript', module)

const transcriptArray = [
  {
    speaker: 'Speaker 1',
    speech: 'Hello'
  },
  {
    speaker: 'Speaker 2',
    speech: 'World'
  }
]

stories.add('default', () => 
  <div className='m-3'>
    <FormattedScript 
      speech  = {transcriptArray[0].speech}
      speaker = {transcriptArray[0].speaker}
    />
  </div>
)
stories.add('multiple', () => 
  <div className='m-3'>
    {
      transcriptArray.map(({speech, speaker}) => <FormattedScript speech={speech} speaker={speaker}/>)
    }
  </div>
)
