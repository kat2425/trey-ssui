import React               from 'react'
import { storiesOf }       from '@storybook/react'
import RenderIf            from '../'
import * as MODULES        from 'helpers/UserModules'
import * as POLICIES       from 'helpers/UserPolicies'

/* eslint-disable-next-line */
const stories = storiesOf('', module)

stories.add('default', () => 
  <div>
    <RenderIf renderIf={({userStore}) => userStore.hasModules(MODULES.ASSESSMENT)}>
      {
        (show) => show ? <button>Rendered</button> : null
      }
    </RenderIf>
  </div>
)

const renderIf = ({hasModules, hasPolicies}) => 
  !hasModules(MODULES.HELPDESK) && 
  hasModules(MODULES.ASSESSMENT, MODULES.CASE21) && 
  hasPolicies(POLICIES.ADMIN)

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
