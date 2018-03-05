import React          from 'react'
import renderIf       from 'render-if'

import Header         from './Header'
import Aside          from './Aside'
import Content        from './Content'
import CreateButton   from './CreateButton'
import Search         from './Search'

import { TagList }    from 'ui/shell/SmartTags'
import LoadingSpinner from 'ui/shell/LoadingSpinner'

export default function SideNav({tagStore}) {
  const {
    renderIfLoading,      
    renderIfNoTags,       
    renderIfTags
  } = getRenderFunctions(tagStore)

  return (
    <Aside>
      <Header title='Searchlight'>
        <CreateButton tagStore={tagStore} />
      </Header>
      <Search tagStore={tagStore}/>
      <Content>
        {renderIfNoTags(<p className='mt-5 text-center text-muted'>No saved lists</p>)}
        {renderIfLoading(<LoadingSpinner center />)}
        {renderIfTags(<TagList store={tagStore}/>)}
      </Content>
    </Aside>
  )
}

const getRenderFunctions = (tagStore) => {
  const renderIfLoading = renderIf(tagStore.isFetchingTags && tagStore.isEmpty)
  const renderIfNoTags  = renderIf(!tagStore.isFetchingTags && tagStore.isEmpty)
  const renderIfTags    = renderIf(!tagStore.isEmpty)

  return {
    renderIfLoading,      
    renderIfNoTags,       
    renderIfTags
  }
}
