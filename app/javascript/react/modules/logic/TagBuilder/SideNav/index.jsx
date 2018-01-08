import React, {PropTypes}  from 'react'
import { Button, Tooltip } from 'antd'

import Header              from './Header'
import Aside               from './Aside'
import Content             from './Content'

SideNav.propTypes = {
  title:    PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  onAddTag: PropTypes.func.isRequired
}

export default function SideNav({title, children, onAddTag, ...props}) {
  return (
    <Aside {...props}>
      <Header title={title}>
        <Tooltip title='Create A Tag'>
          <Button 
            onClick={onAddTag} 
            icon = 'plus'
            type = 'primary'
            ghost
            shape='circle'
          />
        </Tooltip>
      </Header>
      <Content>
        {children}
      </Content>
    </Aside>
  )
}
