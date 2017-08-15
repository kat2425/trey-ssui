// Wrapper around browser's CustomEvent object.  This allows for easy event triggering
// anywhere within the DOM. Simple provide a name for the custom event as well as an object
// containing any data needed by your event listener:
// --
// Ex:
//  let fireEvent = require('FireEvent')
//  fireEvent('myCoolEvent', { name: 'cool dude', game: 'rap' })
// --

const FireEvent = (name, detail) => {
  window.dispatchEvent(new CustomEvent(name, {
    detail: detail
  }))
}

export default FireEvent
