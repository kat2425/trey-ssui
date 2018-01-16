import React, {Component} from 'react'
import {observer}         from 'mobx-react'
import renderIf           from 'render-if'

import QueryBuilder       from 'ui/shell/QueryBuilder'
import LoadingSpinner     from 'ui/shell/LoadingSpinner'

import tagStore           from 'stores/TagStore'

import SideNav            from './SideNav'
import Wrapper            from './Wrapper'
import Content            from './Content'

import { Row, Col }       from 'antd'

import {
  TagFormModal,
  NaturalLanguageSection,
  MapSection,
  StudentSection,
  TopSection,
  UnsavedPrompt
} from 'ui/shell/SmartTags'


@observer
export default class TagBuilder extends Component {
  state = { showMap: false }

  componentDidMount(){
    tagStore.fetchTags()
  }

  toggleMap = () => {
    this.setState({ showMap: !this.state.showMap })
  }


  render() {
    const {selectedTag} = tagStore
    const {
      renderIfTag,          
      renderContent,        
      renderIfLoadingSchema,
      renderIfNoSelectedTag,
      renderQueryBuilder
    } = getRenderFunctions(tagStore)

    return (
      <Wrapper>
        {renderIfTag(<UnsavedPrompt tagStore={tagStore} />)}
        <Row type='flex'>
          <Col xs={24} sm={24} md={5} lg={4}>
            <SideNav tagStore={tagStore} />
          </Col>
          <Content xs={24} sm={24} md={19} lg={20}>
            {renderIfTag(<TopSection tagStore={tagStore} />)}
            {renderIfNoSelectedTag(<p className='mt-5 text-muted text-center'>No Tag Selected</p>)}
            {renderIfLoadingSchema(<LoadingSpinner center />)}
            <Row>
              <Col xs={24} sm={24} md={18} xxl={20}>
                {renderQueryBuilder(<QueryBuilder tag={selectedTag}/>)}
              </Col>
              <Col xs={24} sm={24} md={6} xxl={4}>
                {renderContent(
                  <div className='py-4 pr-2'>
                    <NaturalLanguageSection   tagStore={tagStore} />
                    <MapSection               tagStore={tagStore} />
                    <StudentSection           tagStore={tagStore} />
                  </div>
                )}
              </Col>
            </Row>
          </Content>
        </Row>
        <TagFormModal tagStore={tagStore} />
      </Wrapper>
    )
  }
}

const getRenderFunctions = (tagStore) => {
  const { selectedTag }       = tagStore
  const renderIfTag           = renderIf(selectedTag)
  const renderIfLoading       = renderIf(tagStore.isFetchingTags && tagStore.isEmpty)
  const renderIfNoTags        = renderIf(!tagStore.isFetchingTags && tagStore.isEmpty)
  const renderIfTags          = renderIf(!tagStore.isEmpty)
  const renderContent         = renderIf(selectedTag && !tagStore.isFetchingSchema)
  const renderIfLoadingSchema = renderIf(tagStore.isFetchingSchema)
  const renderQueryBuilder    = renderIf(selectedTag && selectedTag.showQueryBuilder)
  const renderIfNoSelectedTag = renderIf(
    !selectedTag && 
    !tagStore.isFetchingSchema && 
    !tagStore.isSelectingTag
  )

  return {
    renderIfTag,          
    renderIfLoading,      
    renderIfNoTags,       
    renderIfTags,         
    renderContent,        
    renderIfLoadingSchema,
    renderIfNoSelectedTag,
    renderQueryBuilder
  }
}

