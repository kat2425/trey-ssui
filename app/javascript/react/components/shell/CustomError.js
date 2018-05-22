import React               from 'react'
import { IntercomMessage } from 'helpers/Intercom'

export default function CustomError(props){
  return (
    <div>
      {props.customText && <p>{props.customText}</p>}
      <a
        href="#"
        onClick={ () => IntercomMessage(getScript(props))}
      >
        Click here or call SchoolStatus to let us know.
      </a>
      <p className="mt-2"><b>Status:</b> <code>{props.status}</code></p>
      <p><b>Location:</b></p>
      <code>{props.endpoint}</code>
    </div>
  )
}

const getScript = props => ['Dear Best Support In The World,',
  '\n\n',
  'Everything was going great until I encountered this error:',
  '\n',
  '`',props.status,'` at `',props.endpoint,'`',
  '\n\n',
  'I\'m sure it\'s just a misunderstanding',
  ' and you\'ll sort it out soon because you\'re a bunch of rockstars.',
  '\n\n',
  'Have an awesome day!'].join('')
