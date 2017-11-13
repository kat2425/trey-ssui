import React         from 'react'
import { storiesOf } from '@storybook/react'

import Timer         from '../Timer'
import Progress      from '../Progress'
import PlayButton    from '../PlayButton'
import VolumeBar     from '../VolumeBar'
import Slider        from '../Slider'
import Player        from '../'


const stories = storiesOf('Player', module)

stories.add('Player', () => 
  <div className='m-4'>
    <Player src='http://www.nihilus.net/soundtracks/Static%20Memories.mp3'/>
  </div>
)
stories.add('Timer', () => 
  <div className='m-4'>
    <Timer 
      currentTime = {0}
      duration    = {23}
      disable     = {false}
    />
  </div>
)
stories.add('Progress', () => 
  <div className='m-4'>
    <Progress 
      value = {25}
      max   = {100}
      color = '#48f'
      size  = '0.3rem'
    />
  </div>
)

stories.add('Slider', () => 
  <div className='m-4'>
    <Slider defaultValue={40}/>
  </div>
)

stories.add('PlayButton.playing', () => 
  <div className='m-4'>
    <PlayButton 
      playing={false}
    />
  </div>
)
stories.add('PlayButton.pausing', () => 
  <div className='m-4'>
    <PlayButton 
      playing={true}
    />
  </div>
)
stories.add('VolumeBar', () => 
  <div className='m-4'>
    <VolumeBar  />
  </div>
)
stories.add('VolumeBar.mute', () => 
  <div className='m-4'>
    <VolumeBar mute={true}/>
  </div>
)
