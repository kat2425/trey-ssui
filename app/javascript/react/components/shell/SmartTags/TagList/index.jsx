import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'

import TagEntry   from '../TagEntry'
import Wrapper    from './Wrapper'
import ScrollView from './ScrollView'

TagList.propTypes = {
  arrayWithShape: PropTypes.arrayOf(
    PropTypes.shape({
      id:       PropTypes.string.isRequired,
      name:     PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired
    }).isRequired
  )
}

function TagList({tags}) {
  return (
    <Wrapper>
      <ScrollView>
        {tags.map(tag => (
          <TagEntry 
            active={tag.isActive} 
            key={tag.id} 
            tag={tag} 
            onClick={tag.handleOnTagClick} 
          />
        ))}
      </ScrollView>
    </Wrapper>
  )
}

export default observer(TagList)
