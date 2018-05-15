import React          from 'react'
import { observer }   from 'mobx-react'
import styled         from 'styled-components'
import { List }       from 'antd'
import Title          from './Title'

const RelatedGroupItem = ({group, store}) => {
  return (
    <ListItem onClick={handleOnClick(group, store)}>
      <ListItemMeta
        title = {<Title group={group}/>}
      />    
    </ListItem>
  )
}

const handleOnClick = (group, store) => (e) => { 
  e.preventDefault()

  store.setSelectedGroup(store.groups.get(group.id))
}

const ListItemMeta = List.Item.Meta
const ListItem = styled(List.Item)`
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
  cursor: pointer;
  &:hover{
    background-color:  rgba(0, 0, 0, 0.025);
  }
`

export default observer(RelatedGroupItem)