/**
 * Conditionally renders a Component if renderIf returns true
 *
 * Note:
 * @renderIf {function} passes in userStore
 * @userStore has {hasModules} & {hasPolicies} 
 * Use {MODULES} & {POLICIES} constants found in helpers/UserConstants. 
 *
 * Example:
 * <RenderIf renderIf={({userStore}) => userStore.hasModules(MODULES.ASSESSMENT)}>
 *  {
 *   (show) => show ? <button>Rendered</button> : null
 *  }
 * </RenderIf>
 */

import React     from 'react'
import userStore from 'stores/UserStore'

const RenderIf = ({renderIf, children}) => children(renderIf(userStore))

export default RenderIf
