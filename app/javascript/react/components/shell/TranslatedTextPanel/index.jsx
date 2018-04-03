import React        from 'react'
import { observer } from 'mobx-react'
import PropTypes    from 'prop-types'
import { Icon }     from 'antd'

import BackButton   from './BackButton'
import Wrapper      from './Wrapper'
import Label        from './Label'

TranslatedTextPanel.propTypes = {
  translatedText: PropTypes.string.isRequired,
  languageName:   PropTypes.string.isRequired,
  color:          PropTypes.string,
  onGoBack:       PropTypes.func.isRequired,
}

function TranslatedTextPanel({
  translatedText,
  languageName,
  onGoBack,
  color = '#e6ecf0'
}) {
  if (!translatedText) return null

  return (
    <Wrapper color={color}>
      <Label className="mb-2">
        <BackButton color="link" onClick={onGoBack}>
          <Icon type="arrow-left" />
        </BackButton>
        &nbsp;Translated to {languageName}
      </Label>
      <p>{translatedText}</p>
    </Wrapper>
  )
}

export default observer(TranslatedTextPanel)
