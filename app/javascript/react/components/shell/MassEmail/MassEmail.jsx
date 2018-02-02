import React      from 'react'
import PropTypes  from 'prop-types'

import { Button } from 'reactstrap'
import xhr        from 'helpers/XHR'

const MassEmail = ({type, name, id}) => {
  return (
    <div>
      <Button
        color     = 'info'
        className = 'pl-2'
        style     = {{marginTop: '1px'}}
        onClick   = {() => {
          window.massMailer = window.open('', '_blank')
          triggerNativeMailTo(type, name, id)
        }}
      >
        <span className='icon icon-mail mr-2' />
        Email Course
      </Button>
    </div>
  )
}

const triggerNativeMailTo = (type, name, id) => {
  xhr.get('/commo/email/get_conversation', {
    params: {
      id:   id,
      type: type
    }
  }).then(res => {
    const _contact = name
    const _mailto  = encodeURIComponent(`${_contact.replace(/,/g, '')} <${res.data.email_link}>`)
    const _gmail   = `https://mail.google.com/mail/?view=cm&fs=1&to=${_mailto}`

    window.massMailer.location.href = _gmail
    window.massMailer.focus()
  })
}

MassEmail.defaultProps = {}

MassEmail.propTypes = {}

export default MassEmail
