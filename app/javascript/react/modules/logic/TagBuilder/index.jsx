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
  StudentSection,
  TopSection,
  UnsavedPrompt,
  MapView,
  Tabs
} from 'ui/shell/SmartTags'


const TOP_BOTTOM_HEIGHT = 135

@observer
export default class TagBuilder extends Component {
  state = {
    dimensions: {
      width:  500,
      height: 500
    }
  }
  componentDidMount(){
    window.addEventListener('resize', this.handleOnResize)

    tagStore.fetchTags()
    this.calculateDimensions(this.container)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleOnResize)
  }

  calculateDimensions = (node) => {
    const _node = ReactDOM.findDOMNode(node)

    if(!_node) return

    this.setState({
      dimensions: {
        width:  _node.offsetWidth,
        height: _node.offsetHeight - TOP_BOTTOM_HEIGHT
      }
    })
  }

  handleOnResize = () => {
    this.calculateDimensions(this.container)
  }  

  setContainerRef = (node) => {
    this.container = node
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
      renderIfShowMapTab,
      renderIfShowStudentsTab,
      renderIfShowQueryBuilderTab
    } = getRenderFunctions(tagStore)

    return (
      <Wrapper>
        {renderIfTag(<UnsavedPrompt tagStore={tagStore} />)}
        <Row type='flex'>
          <Col style={{ background: '#fff' }} xs={24} sm={24} md={6} lg={5}>
            <SideNav tagStore={tagStore} />
          </Col>

          <Content innerRef={this.setContainerRef} xs={24} sm={24} md={18} lg={19}>
            {renderIfNoSelectedTag(<p className='mt-5 text-muted text-center'>No Tag Selected</p>)}
            {renderIfLoadingSchema(<LoadingSpinner center />)}

            <TopSection tagStore={tagStore} />

            {renderIfTag(<Tabs tag={selectedTag} />)}

            <Row className='mt-4'>
              {renderIfShowQueryBuilderTab([
                <Col xs={24} sm={24} md={17} xxl={20} key={uuid()} className='px-4'>
                  {renderQueryBuilder(<QueryBuilder tag={selectedTag}/>)}
                </Col>,
                <Col xs={24} sm={24} md={7} xxl={4} key={uuid()} className='pr-4'>                  
                  {renderContent(
                    <NaturalLanguageSection tagStore={tagStore} />
                  )}
                </Col>
              ])}

              {renderIfShowStudentsTab(
                <Col className='px-4 mx-4 mb-4'>                  
                  <StudentSection tagStore={tagStore} />
                </Col>
              )}
              {renderIfShowMapTab(
                <Col>
                  <MapView width={width} height={height} tag={selectedTag}/>
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
  const { selectedTag }             = tagStore
  const renderIfTag                 = renderIf(selectedTag)
  const renderIfLoading             = renderIf(tagStore.isFetchingTags && tagStore.isEmpty)
  const renderIfNoTags              = renderIf(!tagStore.isFetchingTags && tagStore.isEmpty)
  const renderIfTags                = renderIf(!tagStore.isEmpty)
  const renderContent               = renderIf(selectedTag && !tagStore.isFetchingSchema)
  const renderIfLoadingSchema       = renderIf(tagStore.isFetchingSchema)
  const renderQueryBuilder          = renderIf(selectedTag && selectedTag.showQueryBuilder)

  const renderIfShowMap             = renderIf(selectedTag && tagStore.showMap)
  const renderIfShowMapTab          = renderIf(selectedTag && selectedTag.showMapTab)
  const renderIfShowStudentsTab     = renderIf(selectedTag && selectedTag.showStudentsTab)
  const renderIfShowQueryBuilderTab = renderIf(selectedTag && selectedTag.showQueryBuilderTab)

  const renderIfHideMap             = renderIf(selectedTag && !tagStore.showMap)
  const renderIfNoSelectedTag       = renderIf(
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
    renderIfHideMap,
    renderIfShowMapTab,
    renderIfShowStudentsTab,
    renderIfShowQueryBuilderTab
  }
}
