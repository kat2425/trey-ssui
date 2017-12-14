import React, {PropTypes} from 'react'

import Header             from './Header'
import Aside              from './Aside'
import Content            from './Content'
import ButtonWrapper      from './ButtonWrapper'
import AddButton          from './AddButton'

SideNav.propTypes = {
  title:      PropTypes.string.isRequired,
  children:   PropTypes.any.isRequired,
  onNewQuery: PropTypes.func.isRequired
}

export default function SideNav({title, children, onNewQuery, ...props}) {
  return (
    <Aside {...props}>
      <Header title={title} />
      <ButtonWrapper>
        <AddButton onClick={onNewQuery}> New Query</AddButton>
      </ButtonWrapper>
      <Content>
        {children}
      </Content>
    </Aside>
  )
}
