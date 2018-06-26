import React            from 'react'
import { observer }     from 'mobx-react'
import { Steps, Icon }  from 'antd'
import store, { STEPS } from 'stores/VerificationStore'
import uuid             from 'uuid'

const Step = Steps.Step

const stepIcons = {
  [STEPS.VERIFICATION]: 'idcard',
  [STEPS.PASSWORD]:     'lock',
  [STEPS.LOGIN]:        'home'
}

const steps = Object.values(STEPS).map(step => ({
  step,
  icon: stepIcons[step]
}))

const StepIndicator = () => (
  <Steps current={store.stepIndex}>
    {steps.map(({ icon, step }) => (
      <Step key={uuid()} title={<Title icon={icon} step={step} />} icon={icon}/>
    ))}
  </Steps>
)

const Title = ({step, icon, showIcon = false}) => (
  <div className='text-nowrap'>
    {showIcon && <Icon type={icon} className ='mr-2' />}{step}
  </div>
) 

export default observer(StepIndicator)