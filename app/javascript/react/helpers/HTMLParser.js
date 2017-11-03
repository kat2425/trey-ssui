import { isEmpty } from 'lodash'

export function getTextContent(htmlString) {
  const div = document.createElement('div')

  div.innerHTML = htmlString.trim()
  return div.textContent
}

export function getInnerText(htmlString) {
  const div = document.createElement('div')

  div.innerHTML = htmlString.trim()
  return div.innerText
}

export function isEmptyHTML(htmlString) {
  return isEmpty(getTextContent(htmlString))
}
