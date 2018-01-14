import React, {Component}    from 'react'
import {observer}            from 'mobx-react'
import styled                from 'styled-components'
import { FaExpand }          from 'react-icons/lib/fa'
import uuid                  from 'uuid'
import { Prompt }            from 'react-router-dom'
import _                     from 'lodash'

import QueryBuilder          from 'ui/shell/QueryBuilder'
import LoadingSpinner        from 'ui/shell/LoadingSpinner'
import Panel                 from 'ui/shell/Panel'
import StudentList           from 'ui/shell/StudentResults/StudentList'
import { ModifiedIndicator } from 'ui/shell/SmartTags'

import tagStore              from 'stores/TagStore'

import SideNav               from './SideNav'
import Wrapper               from './Wrapper'
import ActionBar             from './ActionBar'

import { 
  Popconfirm,
  Button,
  Tooltip,
  Input
} from 'antd'
const Search = Input.Search

import {
  TagList, 
  MapModal,
  NewQueryModal
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

  nameStyle = (isNew) => {
    if(!isNew) return

    return {
      color:     '#777',
      fontStyle: 'italic'
    }
  }

  render() {
    const {selectedTag} = tagStore
    const showEmptySelectionPlaceholder = 
            !selectedTag               &&
            !tagStore.isFetchingSchema &&
            !tagStore.isSelectingTag

    const showContent = selectedTag && !tagStore.isFetchingSchema

    return (
      <Wrapper>
        {selectedTag && (
          <Prompt
            when    = {selectedTag.isModified}
            message = 'You have unsaved information, are you sure you want to leave this page?'
          />
        )}
        <div className="d-flex flex-column" style={{flex: 1}}>
          <SideNav title="Bullseye" onAddTag={tagStore.handleAddTag}>
            <Search 
              size        = 'large'
              className   = 'my-3 px-2'
              placeholder = 'Filter tags'
              onChange    = {tagStore.handleTagFilter}
            />
            {!tagStore.isFetchingTags && tagStore.isEmpty && 
              <p className='mt-5 text-center text-muted'>No saved tags</p>
            }

            {tagStore.isFetchingTags && tagStore.isEmpty && <LoadingSpinner center />}

            {!tagStore.isEmpty && <TagList store={tagStore}/>}
          </SideNav>
        </div>
        <div className="d-flex flex-column" style={{flex: 4}}>
          <ActionBar>
            {showContent && [
              <div 
                key       = {uuid()}
                className = 'd-flex flex-row align-items-center'
              >
                <h5 style={this.nameStyle(selectedTag.isNew)} title={selectedTag.name}>
                  <ModifiedIndicator tag={selectedTag}>{selectedTag.name}</ModifiedIndicator>
                </h5>
                {selectedTag.isEditable && (
                  <Tooltip title='Edit Tag'>
                    <Button 
                      onClick = {() => tagStore.editTag(selectedTag)}
                      icon    = "edit"
                      style   = {{border: 0}}
                    />
                  </Tooltip>
                )}
              </div>
              ,
              <div key={uuid} 
                className='d-flex flex-row align-items-center justify-content-end'
              >
                {selectedTag.modifiable && (
                  <Tooltip title='Clone Tag'>
                    <Button 
                      icon      = 'copy'
                      type      = 'primary'
                      ghost
                      className = 'mr-2'
                      onClick   = {() => tagStore.cloneTag(selectedTag)}
                    >              
                      Clone 
                    </Button>
                  </Tooltip>
                )}
                <Popconfirm 
                  title      = "Are you sure?"
                  onConfirm  = {selectedTag.deleteTag}
                  okText     = 'OK'
                  cancelText = 'Cancel'
                >
                  <Tooltip title='Delete Tag'>
                    <Button 
                      icon      = 'delete'
                      type      = 'danger'
                      ghost
                    >              
                      Delete
                    </Button>
                  </Tooltip>
                </Popconfirm>
              </div>
            ]}
          </ActionBar>

          { showEmptySelectionPlaceholder && <p className='mt-5 text-muted text-center'>No Tag Selected</p> }
          { tagStore.isFetchingSchema && <LoadingSpinner center /> }

          <div
            className="d-flex flex-row px-2 py-4"
            style={{
              flex:       1,
              background: 'transparent',
              height:     'calc(100vh - 107px)',
              overflow:   'auto'
            }}
          >
            <div
              className="d-flex flex-column px-4 py-2"
              style={{flex: 3, height: '100%'}}
            >
              { showContent && (
                <div>
                  {selectedTag.showQueryBuilder && <QueryBuilder tag={selectedTag}/>}
                </div>
              )}
            </div>
            {showContent && (
              <div
                className="d-flex flex-column px-2 py-2"
                style={{flex: 1.5, height: '100%', overflow: 'auto'}}
              >
                <Panel 
                  contentStyle={{
                    margin:    20,
                    minHeight: 'auto',
                    textAlign: 'center'
                  }}
                >
                  {selectedTag.isFetchingStudents 
                    ? <LoadingSpinner center />
                    : selectedTag.hasStudents 
                      ?  <NumStudents> {selectedTag.pagination.total}</NumStudents>
                      : selectedTag.hasBeenTested 
                        ? <NumStudents>0</NumStudents>
                        : <p className='my-3 text-muted text-center'>.  .  .</p>

                  }
                  <p>{selectedTag.humanStringFormat}</p>
                </Panel>
                <Panel
                  className    = "my-2 pt-4"
                  title        = "Map"
                  titleRight   = {() => 
                    <FaExpand 
                      onClick={tagStore.toggleMap} 
                      style={{cursor: 'pointer'}} 
                    />
                  }
                  contentStyle = {{minHeight: 'auto'}}
                >
                  <Img
                    src       = "https://d32ogoqmya1dw8.cloudfront.net/images/sp/library/google_earth/google_maps_hello_world.jpg"
                    className = "img-fluid"
                    onClick={tagStore.toggleMap}
                  />
                  <MapModal 
                    toggle={tagStore.toggleMap}
                    isOpen={tagStore.showMap} 
                    src='https://developers.google.com/maps/documentation/urls/images/map-no-params.png' 
                  />
                </Panel>
                <Panel
                  className="pt-4"
                  title="Students"
                  contentStyle={{ minHeight: 'auto' }}
                  titleRight={() => (
                    <Result
                      results = {selectedTag.students.length}
                      total   = {selectedTag.pagination.total}
                    />
                  )}
                >
                  {selectedTag.isFetchingStudents && _.isEmpty(selectedTag.students) && <LoadingSpinner center />}
                  {!_.isEmpty(selectedTag.students) && <StudentList tag={selectedTag} />}
                  {!selectedTag.isFetchingStudents && _.isEmpty(selectedTag.students) && (
                    <p className='my-5 text-muted text-center'>No Students</p> 
                  )}
                </Panel>
              </div>
            )}
          </div>
        </div>
        <NewQueryModal store={tagStore} />
      </Wrapper>
    )
  }
}

const NumStudents = ({children}) => (
  <h1 
    className='rounded-circle text-center d-inline-block mb-2 p-4' 
    style={{fontSize: 40, border: '1px solid transparent'}} 
  >
    {children}
  </h1>
)
const Result = ({results, total}) => (
  <p className="text-muted">{`shown ${results} of ${total}`}</p>
)
const Img = styled.img`
  &:hover{
    opacity: 0.5;
    cursor: pointer;
    cursor: -webkit-zoom-in;
    cursor: zoom-in;
  }
`
