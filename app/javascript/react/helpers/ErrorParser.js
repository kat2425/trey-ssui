import React             from 'react'
import _                 from 'lodash'
import CustomError       from 'ui/shell/CustomError'
import { bugsnagClient } from 'helpers/bugsnag'

export default function ErrorParser(e){
  console.error(e)
  bugsnagClient.notify(e)

  if(_.has(e, 'response.data.message') && _.has(e, 'response.data.errors')) {
    return {
      title:   e.response.data.message,
      message: e.response.data.errors
    }
  }

  return {
    title:   'Oh No! 😳',
    message: (
      <CustomError
        status     = {e.response.status}
        endpoint   = {e.request.responseURL.slice(28)}
        customText = {returnErrorMessage(e.response.status)}
      />
    )
  }
}

function returnErrorMessage(stringCode) {
  switch (stringCode) {
  case 404:
    return 'We cannot locate something on the page'
  case 500:
    return 'SchoolStatus servers are having trouble processing your request.'
  case 503:
    return 'SchoolStatus servers are temporarily unavailable probably \
    because they are unusually busy. Give us a minute and it should sort itself out.'
  case 504:
    return 'SchoolStatus servers are temporarily unavailable probably \
    because they are unusually busy. Give us a minute and it should sort itself out.'
  default:
    return 'We experienced an unknown error.'
  }
}
