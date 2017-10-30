/**
 * Conditionally renders a Component if renderIf returns true
 *
 * Note:
 * @renderIf {boolean}
 * @renderElse {function} is called when renderIf is false
 *
 * Example:
 * const EnhancedButton = renderIf(Button)
 *
 *  <EnhancedButton
 *   color='info'
 *   renderIf={boolean('renderIf', false)}
 *   renderElse={() => <Button color='danger'>Danger</Button>}
 *  >
 *   Hello
 *  </EnhancedButton>
 */

import React, {Component} from 'react'
import {isUndefined}      from 'lodash'

const renderIf = (WrappedComponent) =>
  class RenderIfComponent extends Component {
    render() {
      const {renderIf, renderElse, ...rest} = this.props

      if(isUndefined(renderIf)) return <WrappedComponent {...rest} />

      return renderIf ?
        <WrappedComponent {...rest} />
        : (renderElse ? renderElse() : null) // check if renderElse is provided
    }
  }

export default renderIf

