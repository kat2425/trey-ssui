import LogRocket                    from 'logrocket'

const LRInit = () => LogRocket.init('j8uy8j/ss-ui')

const LRIdentify = (id,user) => LogRocket.identify(id, user)

const LRBeforeSend = (data) => {
  data.metaData.sessionURL = LogRocket.sessionURL
  return data
}

export {
  LRInit,
  LRIdentify,
  LRBeforeSend
}
