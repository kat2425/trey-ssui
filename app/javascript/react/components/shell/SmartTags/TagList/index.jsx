import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'
import TagEntry   from '../TagEntry'
import Wrapper    from './Wrapper'
import Header     from './Header'
import ScrollView from './ScrollView'

TagList.propTypes = {
  arrayWithShape: PropTypes.arrayOf(PropTypes.shape({
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

function TagList({tags, onClick}) {
  return (
    <Wrapper show >
      <Header title='Tags' />
      <ScrollView>
        {tags.map(tag => <TagEntry key={tag.id} tag={tag} onClick={() => onClick(tag)} />)}
      </ScrollView>
    </Wrapper>
  )
}

export default observer(TagList)
