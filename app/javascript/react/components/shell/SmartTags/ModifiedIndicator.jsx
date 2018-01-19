import React        from 'react'
import PropTypes    from 'prop-types'
import { observer } from 'mobx-react'
import { Tooltip }  from 'antd'


ModifiedIndicator.propTypes = {
  tag: PropTypes.shape({
    isNotSaved: PropTypes.bool.isRequired
  }).isRequired,
  renderIndicator: PropTypes.func
}

function ModifiedIndicator({children, tag, renderIndicator}){
  const indicator = renderIndicator ? renderIndicator() : <Indicator />

  return (
    <span>{children}&nbsp;{tag.isNotSaved && indicator} </span>
  )
}

function Indicator(){
  return (
    <Tooltip title='Tag has been modified'>
      <span>*</span>
    </Tooltip>
  )
}
export default observer(ModifiedIndicator)
