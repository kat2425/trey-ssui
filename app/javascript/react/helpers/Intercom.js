// Wrapper around Intercom's event tracking. Assumes that there's already an Intercom user
// set up.
// --
// Ex:
//  let intercomEvent = require('IntercomEvent')
//  intercomEvent('myCoolEvent', { name: 'cool dude', game: 'rap' })
// --

const IntercomEvent = (event, metadata) => {
  window.Intercom && window.Intercom('trackEvent', event, metadata)
}

export default IntercomEvent
