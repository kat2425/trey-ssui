import React             from 'react'
import { observer }      from 'mobx-react'
import Panel             from 'ui/shell/Panel'
import RelatedGroupsList from './RelatedGroupsList'
import _                 from 'lodash'

const RelatedGroups = ({group, store}) => {
  if(_.isEmpty(group.childGroups) && _.isEmpty(group.parentGroup)) return null

  return (
    <Panel
      className    = 'mt-2'
      title        = {`${group.groupType === 'user' ? 'Owned Student Groups:' : 'Owned by User Groups:'}`}
    >
      <RelatedGroupsList group={group} store={store}/>
    </Panel>
  )
}

export default observer(RelatedGroups)