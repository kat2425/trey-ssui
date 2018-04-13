import { Seq }      from 'immutable'
import { isNumber } from 'lodash/fp'


/*
 * Fixes a bug where a multiselect value is converted into a list instead of staying as an Array
 */
const isValueArrayAndKeyAnIndex = (val, key) => isNumber(key) && Array.isArray(val)

export default function fromJSOrdered(js, key){
  return typeof js !== 'object' || js === null || isValueArrayAndKeyAnIndex(js, key) ? js :
    Array.isArray(js) ? 
      Seq(js).map(fromJSOrdered).toList() :
      Seq(js).map(fromJSOrdered).toOrderedMap()
}

