/*
 * 
 * Params:
 * transcript (string):
 * 'Speaker 1: hello world'
 *
 * separator (string):
 * 'Speaker '
 * 
 * Output (array):
 * [{
 *   speaker: 'Speaker 1',
 *   speech:  'Hello world'
 * }]
 *
 * If fails to parse, you get the original transcript back
 */

import {isEmpty, isArray} from 'lodash/fp'

export default function getFormattedTranscript(transcript = '', separator){
  if(!separator || isSplitGreaterThan(separator, ' ', 2)) return transcript

  const separatedArray = transcript
    .split(new RegExp(`${separator}`))

  if(isEmpty(separatedArray) || isEmpty(separatedArray.slice(1))) return transcript

  return separatedArray.slice(1)
    .map(t => {
      return t.match(/(\d\s*:)(.*)/) || t
    })
    .map(t => isArray(t) && !isEmpty(t) ? t.slice(1) : [separator, t])
    .map(([speakerNumber, speech]) => ({
      speaker: `${separator} ${speakerNumber}`,
      speech:  speech
    }))
}

function isSplitGreaterThan(str, separator, length){
  return str.split(separator).length > length
}
