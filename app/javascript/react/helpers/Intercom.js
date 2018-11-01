// Wrapper around Intercom's event tracking. Assumes that there's already an Intercom user
// set up.
// --
// Ex:
//  let intercomEvent = require('IntercomEvent')
//  intercomEvent('myCoolEvent', { name: 'cool dude', game: 'rap' })
// Ex:
//  IntercomMessage() to open a new intercom message in the bottom
// AND
// IntercomMessage('I want to populate the message') to open the message
// with something prepopulating it.
// --

export const IntercomMessage = ( message ) => {
  window.Intercom && window.Intercom('showNewMessage', message)
}

const IntercomEvent = (event, metadata) => {
  window.Intercom && window.Intercom('trackEvent', event, metadata)
}

export const updateIntercom = () => {
  window.Intercom && window.Intercom('update')
}

export default IntercomEvent
