import React      from 'react'
import _          from 'lodash'

import Wrapper    from './Wrapper'
import Header     from './Header'
import ScrollView from './ScrollView'

export default function Panel({title, titleRight, children, footer, contentStyle}){
  return (
    <Wrapper>
      <Header title={title} titleRight={titleRight} />
      <ScrollView className='py-4' style={contentStyle}>{children}</ScrollView>
      {footer && <footer className='mt-4'>{_.isFunction(footer) ? footer() : footer}</footer>}
    </Wrapper>
  )
}
