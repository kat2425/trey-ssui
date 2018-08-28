import React            from 'react'
import bugsnag          from 'bugsnag-js'
import createPlugin     from 'bugsnag-react'
import { LRBeforeSend } from 'helpers/logrocket'

const bugsnagClient = bugsnag({
  beforeSend:   LRBeforeSend,
  apiKey:       process.env.JS_BUGSNAG_API_KEY,
  releaseStage: process.env.NODE_ENV
})

const ErrorBoundary = bugsnagClient.use(createPlugin(React))

export {
  bugsnagClient,
  ErrorBoundary
}
