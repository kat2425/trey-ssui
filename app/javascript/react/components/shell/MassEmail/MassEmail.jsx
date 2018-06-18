import React      from 'react'
import PropTypes  from 'prop-types'

import { Button } from 'antd'
import fireEvent  from 'helpers/FireEvent'

const MassEmail = ({type, name, id, label, disabled}) => {
  return (
    <div>
      <Button
        type      = 'primary'
        className = 'pl-2'
        style     = {{ marginTop: '1px' }}
        disabled  = { disabled }
        onClick   = {() => {
          fireEvent('showMailer', {
            type: type,
            id:   id,
            name: name
          })
        }}
      >
        <span className='icon icon-mail mr-2' />
        { label }
      </Button>
    </div>
  )
}

MassEmail.defaultProps = {}
MassEmail.propTypes    = {}

export default MassEmail
