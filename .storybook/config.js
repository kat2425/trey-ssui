import { configure } from '@storybook/react'

import '../app/javascript/packs/theme/toolkit.css'
import '../app/javascript/packs/theme/temp.css'

window.jQuery = require('jquery')
window.$      = window.jQuery
window.Tether = require('tether')

const storyDeps = require.context('../app/javascript/react', true, /Story\.jsx?$/)

function loadStories() {
  storyDeps.keys().forEach(storyDeps)
}

configure(loadStories, module)
