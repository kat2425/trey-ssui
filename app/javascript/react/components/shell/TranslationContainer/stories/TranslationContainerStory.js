import React                from 'react'
import { storiesOf }        from '@storybook/react'
import { action }           from '@storybook/addon-actions'
import TranslationContainer from '../'
import withTranslator       from 'ui/hoc/withTranslator'
import { STATE }            from 'stores/models/Translator'

import { 
  text,
  select,
  color,
  withKnobs
} from '@storybook/addon-knobs'

import { 
  ListGroup,
  ListGroupItem
} from 'reactstrap'

const TranslationListGroupItem = withTranslator(ListGroupItem)

const stories = storiesOf('Translation', module) // eslint-disable-line
const _text = `Lorem ipsum dolor sit amet, pellentesque massa at, et eget nibh cras. 
  Sodales tortor scelerisque pretium nec a nunc. Felis magna, ullamcorper sapien, sed quis, 
  justo in perferendis nunc ac ut pellentesque, nunc ut. Purus conubia ut fusce. 
  Suspendisse dignissim potenti curabitur, facilisi erat dignissim nisl nam. 
  Voluptas lorem ornare, mauris libero sed elit.`

stories.addDecorator(withKnobs)
stories.add('TranslationContainer', () => 
  <div className='m-2'>
    <TranslationContainer 
      color           = {color('color', '#000')}
      className       = {text('className', '')}
      textToTranslate = {text('textToTranslate', _text)}
      onTranslate     = {action('onTranslate')}
      state           = {select('state', STATE, STATE.AUTO)}
    />
  </div>
)
stories.add('Custom label', () => 
  <div className='m-2'>
    <TranslationContainer 
      color           = {color('color', '#000')}
      className       = {text('className', '')}
      textToTranslate = {text('textToTranslate', text)}
      onTranslate     = {action('onTranslate')}
      state           = {select('state', STATE, STATE.AUTO)}
      renderLabel     = {() => <p> Translate -></p>}
    />
  </div>
)

const texts = [
  {
    text:   'Hello world',
    target: 'sp'
  },
  {
    text:   'My name is Joe',
    target: 'rs'
  }
]

stories.add('withTranslator HOC', () => 
  <div className='m-2'>
    <ListGroup>
      {
        texts.map(({text}, i) => 
          <TranslationListGroupItem key={i} textToTranslate={text}>
            {text}
          </TranslationListGroupItem>
        )
      }
    </ListGroup>
  </div>
)
