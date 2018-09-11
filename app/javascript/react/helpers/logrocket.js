import LogRocket                    from 'logrocket'
import intercomEvent                from 'helpers/Intercom'


const appID = 'j8uy8j/ss-ui'

const LRInit = () => LogRocket.init(appID)

const LRIdentify = (id, user) => {
  LogRocket.identify(id, user)
  updateIntercom(id)
}

const LRBeforeSend = data => {
  data.metaData.sessionURL = LogRocket.sessionURL
  intercomEvent('LogRocket', { sessionURL: LogRocket.sessionURL })
  return data
}

const updateIntercom = (id) => {
  if (!window.Intercom) return

  window.Intercom('update', {
    logrocketURL: `https://app.logrocket.com/${appID}/sessions?u=${id}`
  })
}

export { LRInit, LRIdentify, LRBeforeSend }
