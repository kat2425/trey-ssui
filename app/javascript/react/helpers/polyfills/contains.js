/* eslint-disable no-cond-assign*/
function contains(node) {
  if (!(0 in arguments)) {
    throw new TypeError('1 argument is required')
  }
  do {
    if (this === node) {
      return true
    }
  } while (node = node && node.parentNode)
  return false
}
  
export default function init(){
  if(!document.contains) {
    document.contains = contains
  }

  if(!Element.prototype.contains) {
    Element.prototype.contains = contains
  }

  if(!Node.prototype.contains) {
    Node.prototype.contains = contains
  }

  if(!HTMLElement.prototype.contains){
    HTMLElement.prototype.contains = contains
  }
}
