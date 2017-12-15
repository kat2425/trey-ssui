import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'
import _          from 'lodash'

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
  if(_.isEmpty(tags)) return <p className='mt-5 text-center text-muted'>No saved tags</p>

  return (
    <Wrapper>
      <ScrollView>
        {tags.map(tag => (
          <TagEntry 
            active={tag.isActive} 
            key={tag.id} 
            tag={tag} 
            onClick={tag.setActive} 
          />
        ))}
      </ScrollView>
    </Wrapper>
  )
}

export default observer(TagList)
