import React                           from 'react'
import { observer }                    from 'mobx-react'
import uuid                            from 'uuid'
import _                               from 'lodash'

import CommDropdown                    from './CommDropdown'
import CommButton                      from './CommButton'
import { getButtonConfig, isDisabled } from './config'

const CommunicationButtons = ({contactsWithUniquePhones, contactsWithUniqueEmails}) => {
  const buttons = getButtonConfig(contactsWithUniquePhones, contactsWithUniqueEmails)

  return (
    <div className="d-flex mt-3">
      {buttons.map(
        ({
          hasContacts,
          contacts,
          keyForValue,
          onClick,
          iconNameForValue,
          label,
          ...rest
        }) =>
          hasContacts ? (
            <CommDropdown
              key              = {uuid()}
              contacts         = {contacts}
              keyForValue      = {keyForValue}
              onClick          = {onClick}
              iconNameForValue = {iconNameForValue}
              label            = {label}
            >
              <CommButton label={label} {...rest} />
            </CommDropdown>
          ) : (
            <CommButton
              key     = {uuid()}
              label   = {label}
              onClick = {() => onClick(_.head(contacts))}
              disabled = {isDisabled({contact: _.head(contacts), contactType: keyForValue, label})}
              {...rest}
            />
          )
      )}
    </div>
  )
}

export default observer(CommunicationButtons)
