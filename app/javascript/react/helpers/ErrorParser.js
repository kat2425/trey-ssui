import _ from 'lodash'

export default function ErrorParser(e){
  let _error = { title: 'Error', message: e.message}

  if( _.has(e, 'response.data')){
    if(isHTML(e.response.data)) return _error

    _error = {
      title:   e.response.data.message,
      message: e.response.data.errors
    }
  }   

  return _error
}


function isHTML(str) {
  const doc = new DOMParser().parseFromString(str, 'text/html')

  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1)
}
