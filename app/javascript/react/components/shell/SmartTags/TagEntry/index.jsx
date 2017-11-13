import React               from 'react'
import PropTypes           from 'prop-types'
import {observer}          from 'mobx-react'
import {FaGlobe, FaGroup}  from 'react-icons/lib/fa'

import Wrapper    from './Wrapper'

TagEntry.propTypes = {
  tag: PropTypes.shape({
    id:       PropTypes.string.isRequired,
    name:     PropTypes.string.isRequired,
    query:    PropTypes.object.isRequired,
    isGlobal: PropTypes.bool.isRequired,
    user:     PropTypes.bool.isRequired,
    group:    PropTypes.bool.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

function TagEntry({tag, onClick}){
  const {name, isGlobal, group} = tag

  return (
    <Wrapper isGlobal={isGlobal} group={group} onClick={onClick}>
      <div>{name}</div>
      <div>
        {group && <small><FaGroup className="mr-2" /></small> }
        {isGlobal && <small><FaGlobe className="mr-2" /></small> }
      </div>
    </Wrapper>
  )
}

export default observer(TagEntry)
