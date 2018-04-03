import React, { Component } from 'react'
import { observer}          from 'mobx-react'
import TranslationContainer from 'ui/shell/TranslationContainer'
import userStore            from 'stores/UserStore'

const withTranslator = WrappedComponent => {
  class Translator extends Component {
    render(){
      const showTranslator = userStore.user.hasChannel && !!this.props.textToTranslate

      return (
        <div className='d-flex flex-column'>
          <WrappedComponent {...this.props} />
          {showTranslator && (
            <TranslationContainer 
              color            = {this.props.color}
              textToTranslate  = {this.props.textToTranslate}
              onTranslate      = {this.props.onTranslate}
              onTranslating    = {this.props.onTranslating}
              renderLabel      = {this.props.renderLabel}
              style            = {this.props.style}
              className        = {this.props.className}
            />
          )}
        </div>
      )
    }
  }

  return observer(Translator)
}

export default withTranslator
