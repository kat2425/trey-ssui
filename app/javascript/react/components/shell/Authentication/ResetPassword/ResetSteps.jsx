import React           from 'react'
import { observer }    from 'mobx-react'
import { Steps, Icon } from 'antd'
import { STEPS }       from 'stores/ResetPasswordStore'
import uuid            from 'uuid'
import _               from 'lodash'

const Step = Steps.Step

const stepIcons = {
  [STEPS.USERNAME_VERIFICATION]: 'mail',
  [STEPS.DELIVERY_METHOD]:       'car',
  [STEPS.CONFIRMATION_CODE]:     'qrcode',
  [STEPS.NEW_PASSWORD]:          'lock'
}

const steps = Object.values(STEPS).map(step => ({
  step,
  icon: stepIcons[step]
}))

const ResetSteps = ({location}) => (
  <Steps current={getCurrentFromPath(location.pathname)}>
    {steps.map(({ icon, step }) => (
      <Step key={uuid()} title={<Title icon={icon} step={step} />} icon={icon}/>
    ))}
  </Steps>
)

const Title = ({step, icon, showIcon = false}) => (
  <div className='text-nowrap'>
    {showIcon && <Icon type={icon} className='mr-2' />}{step}
  </div>
)

function getCurrentFromPath(path){
  const _path = _.replace(path, '/reset', '')

  if(_.startsWith(_path, '/delivery_method')){
    return 1
  } else if(_.startsWith(_path, '/confirmation_code')){
    return 2
  } else if(_.startsWith(_path, '/new_password')){
    return 3
  } else {
    return 0
  }
}
export default observer(ResetSteps)
