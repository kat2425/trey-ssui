import React               from 'react'
import { IntercomMessage } from 'helpers/Intercom'

export default function CustomError({status, endpoint, customText}){
  return (
    <div>
      {customText && <p>{customText}</p>}
      <a
        className = 'd-block'
        href      = "#"
        onClick   = { () => IntercomMessage(getScript({status, endpoint}))}
      >
        Click here or call SchoolStatus to let us know.
      </a>
      <div className='mt-2'>
        <Label>Status:</Label>
        <Code>{status}</Code>

        <Label className='mt-2'>Location:</Label>
        <Code>{endpoint}</Code>
      </div>
    </div>
  )
}

const Label = ({ children, className = '', ...rest }) => (
  <p className={`text-bold ${className}`} {...rest}>
    {children}
  </p>
)
const Code = ({ children, className = '', ...rest }) => (
  <code
    className={`d-block ${className}`}
    style={{ wordWrap: 'break-word' }}
    {...rest}
  >
    {children}
  </code>
)

const getScript = ({status, endpoint}) => ['Dear Best Support In The World,',
  '\n\n',
  'Everything was going great until I encountered this error:',
  '\n',
  '`',status,'` at `',endpoint,'`',
  '\n\n',
  'I\'m sure it\'s just a misunderstanding',
  ' and you\'ll sort it out soon because you\'re a bunch of rockstars.',
  '\n\n',
  'Have an awesome day!'].join('')

