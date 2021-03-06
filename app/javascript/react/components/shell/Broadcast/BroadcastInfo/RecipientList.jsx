import React        from 'react'
import styled       from 'styled-components'
import { observer } from 'mobx-react'
import PropTypes    from 'prop-types'
import {switchProp} from 'styled-tools'
import _            from 'lodash'

RecipientList.propTypes = {
  broadcast: PropTypes.object.isRequired
}

function RecipientList({ broadcast }){
  return(
    <div>
      { broadcast.recipients.map(( recipient ) => {
        return (
          <Wrapper key={recipient.id}>
            <div>
              { getName(recipient) }
            </div>
            <TypeIndicator type={recipient.type}>
              {recipient.type}
            </TypeIndicator>
          </Wrapper>
        )
      })}
    </div>
  )
}

const getName = (recipient) => {
  switch (recipient.type) {
  case 'group':
    return _.get(recipient.group, 'group_name', 'Unknown Group')
  case 'course':
    return _.get(recipient.course, 'course_name', 'Unknown Course')
  default:
    return _.get(recipient.contact, 'name', 'Unknown Contact')
  }
}

const Wrapper = styled.div.attrs({className: 'py-1'})`
  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`

const TypeIndicator = styled.small`
  padding:          2px;
  margin-left:      auto;
  color:            #fff;
  border-radius:    4px;
  border:           1px solid rgba(0, 0, 0, 0.125);
  background-color: ${switchProp('type', {
    course:  '#BE5F7C',
    group:   '#2E8B57',
    contact: '#4f628E'
  })}
`

export default observer(RecipientList)
