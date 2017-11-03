import React, { Component } from 'react'
import { observer}          from 'mobx-react'
import CommsTranslator      from 'ui/shell/CommsTranslator'
import userStore            from 'stores/UserStore'

const withCommsTranslator = WrappedComponent => {
  class Translator extends Component {
    render(){
      const { className, store, style, color, ...rest } = this.props
      const showTranslator = (userStore.user.hasChannel && (store.showTranslator || store.showTranslatedText))

      return (
        <div className='d-flex flex-column'>
          <WrappedComponent {...rest} />
          {showTranslator && (
            <CommsTranslator
              color     = {color}
              style     = {style}
              className = {className}
              store     = {store}
            />
          )}
        </div>
      )
    }
  }

  return observer(Translator)
}

export default withCommsTranslator
