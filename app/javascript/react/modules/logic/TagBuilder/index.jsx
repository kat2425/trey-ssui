import React, {Component} from 'react'
import {observer}         from 'mobx-react'
import renderIf           from 'render-if'
import uuid               from 'uuid'
import ReactDOM           from 'react-dom'

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
  UnsavedPrompt,
  MapView
} from 'ui/shell/SmartTags'


@observer
export default class TagBuilder extends Component {
  state = { 
    dimensions: {
      width:  500,
      height: 500
    }
  }

  componentDidMount(){
    tagStore.fetchTags()
    this.calculateDimensions(this.container)
  }

  calculateDimensions = (node) => {
    const _node = ReactDOM.findDOMNode(node)

    if(!_node) return

    this.setState({
      dimensions: {
        width:  _node.offsetWidth,
        height: _node.offsetHeight
      }
    })
  }

  render() {
    const { width, height } = this.state.dimensions
    const {selectedTag} = tagStore
    const {
      renderIfTag,          
      renderContent,        
      renderIfLoadingSchema,
      renderIfNoSelectedTag,
      renderQueryBuilder,
      renderIfHideMap,
      renderIfShowMap
    } = getRenderFunctions(tagStore)

    return (
      <Wrapper>
        {renderIfTag(<UnsavedPrompt tagStore={tagStore} />)}
        <Row type='flex'>
          <Col xs={24} sm={24} md={5} lg={4}>
            <SideNav tagStore={tagStore} />
          </Col>
          <Content innerRef={node => this.container = node} xs={24} sm={24} md={19} lg={20}>
            <TopSection tagStore={tagStore} />
            {renderIfNoSelectedTag(<p className='mt-5 text-muted text-center'>No Tag Selected</p>)}
            {renderIfLoadingSchema(<LoadingSpinner center />)}
            <Row>
              {renderIfHideMap([
                <Col xs={24} sm={24} md={18} xxl={20} key={uuid()}>
                  {renderQueryBuilder(<QueryBuilder tag={selectedTag}/>)}
                </Col>,
                <Col xs={24} sm={24} md={6} xxl={4} key={uuid()}>
                  {renderContent(
                    <div className='py-4 pr-2'>
                      <NaturalLanguageSection   tagStore={tagStore} />
                      <MapSection               tagStore={tagStore} />
                      <StudentSection           tagStore={tagStore} />
                    </div>
                  )}
                </Col>
              ])}
              {renderIfShowMap(
                <Col >
                  <MapView width={width} height={height} container={this.container}/>
                </Col>
              )}
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
  const renderIfShowMap       = renderIf(selectedTag && tagStore.showMap)
  const renderIfHideMap       = renderIf(selectedTag && !tagStore.showMap)
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
    renderQueryBuilder,
    renderIfShowMap,
    renderIfHideMap
  }
}

