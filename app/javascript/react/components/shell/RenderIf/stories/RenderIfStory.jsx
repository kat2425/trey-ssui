import React               from 'react'
import { storiesOf }       from '@storybook/react'
import RenderIf            from '../'

/* eslint-disable-next-line */
const stories = storiesOf('', module)
const { ASSESSMENT, HELPDESK, CASE21 } = window.SS_MODULES

stories.add('default', () => 
  <div>
    <RenderIf renderIf={({userStore}) => userStore.hasModules(ASSESSMENT)}>
      {
        (show) => show ? <button>Rendered</button> : null
      }
    </RenderIf>
  </div>
)

const renderIf = ({hasModules}) => 
  !hasModules(HELPDESK) && 
  hasModules(ASSESSMENT, CASE21) && 

stories.add('multiple', () => 
  <div>
    <RenderIf renderIf={renderIf}>
      {show =>
        show ? (
          <div className='container'>
            <h1>Page</h1>
          </div>
        ) : (
          <div className="container">
            <h1>404</h1>
          </div>
        )}
    </RenderIf>
  </div>
)
