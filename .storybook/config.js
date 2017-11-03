import React                       from 'react'
import { Provider }                from 'mobx-react'
import { configure, addDecorator } from '@storybook/react'
import {withKnobs}                 from '@storybook/addon-knobs'
import { Alert }                   from 'reactstrap'

import uiStore                     from 'stores/UiStore'
import userStore                   from 'stores/UserStore'
import tagStore                    from 'stores/TagStore'
import translationStore            from 'stores/TranslationStore'

import '../app/javascript/packs/theme/toolkit.css'
import '../app/javascript/packs/theme/temp.css'
import 'antd/dist/antd.css'

const store = {uiStore, userStore, tagStore, translationStore}

window.jQuery = require('jquery')
window.$      = window.jQuery
window.Tether = require('tether')

const storyDeps = require.context('../app/javascript/react', true, /Story\.jsx?$/)

function loadStories() {
  storyDeps.keys().forEach(storyDeps)
}

addDecorator(story => (
  <Provider {...store}>
    <div className='m-2'>
      {story()}
    </div>
  </Provider>
))

configure(loadStories, module)
