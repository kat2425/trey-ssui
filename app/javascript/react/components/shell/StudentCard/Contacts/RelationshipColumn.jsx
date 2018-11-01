import React        from 'react'
import { observer } from 'mobx-react'

const RelationshipColumn = ({contact}) => <td>{contact.relationship}</td>

export default observer(RelationshipColumn)
