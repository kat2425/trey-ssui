import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'
import TagEntry   from '../TagEntry'
import Wrapper    from './Wrapper'
import Header     from './Header'
import ScrollView from './ScrollView'

TagList.propTypes = {
  activeTagId:    PropTypes.string.isRequired,
  arrayWithShape: PropTypes.arrayOf(
    PropTypes.shape({
      id:       PropTypes.string.isRequired,
      name:     PropTypes.string.isRequired,
      query:    PropTypes.object.isRequired,
      isGlobal: PropTypes.bool.isRequired,
      user:     PropTypes.bool.isRequired,
      group:    PropTypes.bool.isRequired
    }).isRequired
  ),
  onClick: PropTypes.func.isRequired
}

function TagList({activeTagId, tags, onClick}) {
  return (
    <Wrapper>
      <ScrollView>
        {tags.map(tag => <TagEntry active={activeTagId === tag.id} key={tag.id} tag={tag} onClick={() => onClick(tag)} />)}
      </ScrollView>
    </Wrapper>
  )
}

export default observer(TagList)
