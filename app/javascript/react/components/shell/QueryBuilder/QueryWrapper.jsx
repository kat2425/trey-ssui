import React     from 'react'
import { Query } from 'react-awesome-query-builder'
import PropTypes from 'prop-types'

QueryWrapper.propTypes = {
  onChange:    PropTypes.func.isRequired,
  getChildren: PropTypes.func.isRequired,
  value:       PropTypes.object.isRequired,
  config:      PropTypes.object.isRequired
}
export default function QueryWrapper({value, getChildren, onChange, config}){
  return (
    <Query
      {...config}
      value        = {value}
      get_children = {getChildren}
      onChange     = {onChange}
    />
  )
}
