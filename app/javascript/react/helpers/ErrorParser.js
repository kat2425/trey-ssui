import React             from 'react'
import _                 from 'lodash'
import CustomError       from 'ui/shell/CustomError'
import { bugsnagClient } from 'helpers/bugsnag'

export default function ErrorParser(e){
  bugsnagClient.notify(e)

  if(_.hasIn(e, 'response.data.message') && _.hasIn(e, 'response.data.errors')) {
    return {
      title:   e.response.data.message,
      message: e.response.data.errors
    }
  }

  return {
    title:   'Oh No! 😳',
    message: <CustomError {...getCustomErrorProps(e)}/>
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

const getCustomErrorProps = (e) => {
  const status = _.get(e, 'response.status', 'NA')
  const endpoint = _.hasIn(e, 'request.responseURL') ? getPathname(e.request.responseURL) : 'NA'
  const customText = returnErrorMessage(status)

  return {
    status,
    endpoint,
    customText
  }
}

const getPathname = (url) => {
  if(!url) return 'NA'

  return new URL(url).pathname
}
