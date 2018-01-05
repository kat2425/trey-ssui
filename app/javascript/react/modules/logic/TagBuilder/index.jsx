import React, {Component} from 'react'
import {observer}         from 'mobx-react'
import styled             from 'styled-components'
import _                  from 'lodash'

import QueryBuilder       from 'ui/shell/QueryBuilder'
import LoadingSpinner     from 'ui/shell/LoadingSpinner'
import Panel              from 'ui/shell/Panel'
import StudentList        from 'ui/shell/StudentResults/StudentList'
import tagStore           from 'stores/TagStore'
import uuid               from 'uuid'

import SideNav            from './SideNav'
import Wrapper            from './Wrapper'
import ActionBar          from './ActionBar'

import { 
  Popconfirm,
  Button,
  Tooltip
} from 'antd'

import {
  FaExpand,
  FaTrashO
} from 'react-icons/lib/fa'

import {
  TagList, 
  TagActionBar,
  MapModal,
  NewQueryModal,
  TagNameFormPopover
} from 'ui/shell/SmartTags'

@observer
export default class TagBuilder extends Component {
  state = { showMap: false }

  toggleMap = () => {
    this.setState({ showMap: !this.state.showMap })
  }

  componentDidMount(){
    tagStore.fetchTags()
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
    const icStyle = {
      cursor:   'pointer',
      fontSize: 18,
      color:    '#3f9fcf'
    }


    return (
      <Wrapper>
        <div className="d-flex flex-column" style={{flex: 1}}>
          <SideNav title="Bullseye" onNewQuery={tagStore.handleOnNewQuery}>
            {tagStore.isFetchingTags && <LoadingSpinner center />}
            {!tagStore.isFetchingTags && _.isEmpty(tagStore.orderedTags) && 
              <p className='mt-5 text-center text-muted'>No saved tags</p>
            }
            {!_.isEmpty(tagStore.orderedTags) && <TagList tags={tagStore.orderedTags}/>}
          </SideNav>
        </div>
        <div className="d-flex flex-column" style={{flex: 4}}>
          <ActionBar>
            {selectedTag && [
              <div 
                key={uuid()}
                className='d-flex flex-row align-items-center'
              >
                <h5 style={this.nameStyle(selectedTag.isNew)}>
                  {selectedTag.name}
                </h5>
                {selectedTag.isEditable && (
                  <TagNameFormPopover tag={selectedTag}>
                    <Tooltip title='Edit Name'>
                      <Button icon="edit" style={{border: 0}}/>
                    </Tooltip>
                  </TagNameFormPopover>
                )}
              </div>
              ,
              <div key={uuid} 
                className='d-flex flex-row align-items-center justify-content-end'
              >
                <Popconfirm 
                  title="Are you sure?" 
                  onConfirm={selectedTag.deleteTag} 
                >
                  <Tooltip title='Delete Tag'>
                    <FaTrashO 
                      className='mr-4' 
                      style={icStyle}
                    />              
                  </Tooltip>
                </Popconfirm>
                <TagActionBar />
              </div>
            ]}
          </ActionBar>

          { showEmptySelectionPlaceholder && <p className='mt-5 text-muted text-center'>No Tag Selected</p> }

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
              {selectedTag && (
                <div>
                  {tagStore.isFetchingSchema && <LoadingSpinner center /> }
                  {selectedTag.showQueryBuilder && <QueryBuilder tag={selectedTag}/>}
                </div>
              )}
            </div>
            <div
              className="d-flex flex-column px-2 py-2"
              style={{flex: 1.5, height: '100%', overflow: 'auto'}}
            >
              {selectedTag && (
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
                      ?  <NumStudents> {selectedTag.students.length}</NumStudents>
                      : selectedTag.hasBeenTested 
                        ? <NumStudents>0</NumStudents>
                        : <p className='my-3 text-muted text-center'>.  .  .</p>
                      
                  }
                  <p>{selectedTag.humanStringFormat}</p>
                </Panel>
              )}
              {selectedTag && (
                <Panel
                  className    = "my-2 pt-4"
                  title        = "Map"
                  titleRight   = {() => <FaExpand onClick={tagStore.toggleMap} style={{cursor: 'pointer'}} />}
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
              )}
              {selectedTag && (
                <Panel
                  className="pt-4"
                  title="Students"
                  titleRight={() => (
                    <Result
                      results = {selectedTag.students.length}
                      total   = {selectedTag.students.length}
                    />
                  )}
                  contentStyle={{ minHeight: 'auto' }}
                >
                  {selectedTag.isFetchingStudents && <LoadingSpinner center />}
                  {selectedTag.hasStudents 
                    ? <StudentList students={selectedTag.students} />
                    : <p className='my-5 text-muted text-center'>No Students</p>
                  }
                </Panel>
              )}
            </div>
          </div>
        </div>
        <NewQueryModal store={tagStore} />
      </Wrapper>
    )
  }
}

const Result = ({results, total}) => (
  <p className="text-muted">{`${results} of ${total} results`}</p>
)

const NumStudents = ({children}) => (
  <h1 
    className='rounded-circle text-center d-inline-block mb-2 p-4' 
    style={{fontSize: 40, border: '1px solid transparent'}} 
  >
  {children}
  </h1>
)

const Img = styled.img`
  &:hover{
    opacity: 0.5;
    cursor: pointer;
    cursor: -webkit-zoom-in;
    cursor: zoom-in;
  }
`
