import _ from 'lodash'

export default function ErrorParser(e){
  const error = { title: 'Error', message: e.message}

  if( _.has(e, 'response.data') && isHTML(e.response.data)) return error

  if(_.has(e, 'response.data.message') && _.has(e, 'response.data.errors')) {
    return {
      title:   e.response.data.message,
      message: e.response.data.errors
    }
  }

  return error
}


function isHTML(str) {
  const doc = new DOMParser().parseFromString(str, 'text/html')

  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1)
}
