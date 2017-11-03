import React          from 'react'
import { observer }   from 'mobx-react'
import PropTypes      from 'prop-types'
import uuid           from 'uuid'

import LanguageSelect from 'ui/shell/LanguageSelect'
import Wrapper        from './Wrapper'
import LabelWrapper   from './LabelWrapper'
import GlobeIcon      from './GlobeIcon'

LanguageSelectWithLabel.propTypes = {
  language:         PropTypes.string,
  color:            PropTypes.string,
  renderLabel:      PropTypes.func,
  disabled:         PropTypes.bool,
  showSpinner:      PropTypes.bool,
  onLanguageChange: PropTypes.func,
  onClick:          PropTypes.func
}
function LanguageSelectWithLabel({
  language,
  color,
  renderLabel,
  onLanguageChange,
  disabled,
  showSpinner,
  onClick
}){
  return ( 
    <Wrapper color={color} className='mt-2' disabled={disabled}>
      <ELabel onClick={onClick} spin={showSpinner}>
        {renderLabel && renderLabel()}
      </ELabel>
      <LanguageSelect 
        color           = {color}
        defaultLanguage = 'en'
        value           = {language}
        onChange        = {onLanguageChange}
        disabled        = {disabled || showSpinner}
      />
    </Wrapper>
  )
}

function Label({spin, children, onClick}){
  return (
    <LabelWrapper onClick={onClick}>
      {children && children}
      {!children && [
        <GlobeIcon key={uuid()} spin={spin} />,
        <span key={uuid()} className='mx-1'>Translate to </span>
      ]}
    </LabelWrapper>
  )
}

const ELabel = observer(Label)

export default observer(LanguageSelectWithLabel)
