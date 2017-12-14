import React, {Component} from 'react'
import {observer}         from 'mobx-react'
import { Button }         from 'reactstrap'

import QueryBuilder       from 'ui/shell/QueryBuilder'
import LoadingSpinner     from 'ui/shell/LoadingSpinner'
import Panel              from 'ui/shell/Panel'
import StudentList        from 'ui/shell/StudentResults/StudentList'
import tagStore           from 'stores/TagStore'

import SideNav            from './SideNav'
import Wrapper            from './Wrapper'
import ActionBar          from './ActionBar'

import {
  FaExpand,
  FaTrashO,
  FaEdit
} from 'react-icons/lib/fa'

import {
  TagList, 
  TagActionBar
} from 'ui/shell/SmartTags/'

const tagPlaceholder = [
  {
    id:       '0',
    name:     'Tag One',
    query:    {json: 'goes_here'},
    isGlobal: true,
    user:     true,
    group:    true
  },
  {
    id:       '1',
    name:     'Tag Two',
    query:    {json: 'goes here as well'},
    isGlobal: false,
    user:     true,
    group:    false
  },
  {
    id:       '3',
    name:     'what is this test',
    query:    {all: 'test'},
    isGlobal: false,
    user:     true,
    group:    true
  }
]

@observer
export default class TagBuilder extends Component {
  render() {
    return (
      <Wrapper>
        <div className="d-flex flex-column" style={{flex: 1}}>
          <SideNav title="BullsEye" onNewQuery={() => console.log('NEW QUERY')}>
            <TagList
              tags={tagPlaceholder}
              activeTagId={tagStore.activeTagId}
              onClick={tagStore.handleOnTagChange}
            />
          </SideNav>
        </div>
        <div className="d-flex flex-column" style={{flex: 4}}>
          <ActionBar>
            <div className='d-flex flex-row align-items-center'>
              <h5>Tag One</h5>
            </div>
            <div className='d-flex flex-row align-items-center justify-content-end'>
              <FaEdit className='mr-4' style={{cursor: 'pointer', fontSize: 18, color:'#3f9fcf'}}/>
              <FaTrashO className='mr-4' style={{cursor: 'pointer', fontSize: 18, color:'#3f9fcf'}}/>              
              <TagActionBar />
            </div>
          </ActionBar>
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
              <Panel>
                {tagStore.isFetchingSchema ? (
                  <LoadingSpinner center />
                ) : (
                  <QueryBuilder
                    tree     = {tagStore.tree}
                    schema   = {tagStore.schema}
                    onChange = {tagStore.handleChange}
                    onTest   = {tagStore.testTag}
                    onSave   = {tagStore.saveTag}
                    disable  = {tagStore.disable}
                  />
                )}
              </Panel>
            </div>
            <div
              className="d-flex flex-column px-2 py-2"
              style={{flex: 1, height: '100%', overflow: 'auto'}}
            >
              <Panel 
                contentStyle={{
                  margin:    20,
                  minHeight: 100,
                  textAlign: 'center'
                }}
              >
                {tagStore.isFetchingResults && <LoadingSpinner center />}

                <h1 
                  className='rounded-circle text-center d-inline-block mb-2 p-4' 
                  style={{fontSize: 40, border: '1px solid transparent'}} 
                >
                  {tagStore.students.length || 245}
                </h1>

                <p>of your students that are age <b>12-16</b> and living in <b>Jackson, Mississippi</b> passed with grade average above <b>60%</b></p>
                
              </Panel>


              <Panel
                className    = "my-2 pt-4"
                title        = "Map"
                titleRight   = {() => <FaExpand style={{cursor: 'pointer'}} />}
                contentStyle = {{minHeight: 'auto'}}
              >
                <img
                  src       = "https://d32ogoqmya1dw8.cloudfront.net/images/sp/library/google_earth/google_maps_hello_world.jpg"
                  className = "img-fluid"
                />
              </Panel>

              <Panel
                className="pt-4"
                title="Students"
                titleRight={() => (
                  <Result
                    results = {tagStore.students.length}
                    total   = {tagStore.students.length}
                  />
                )}
              >
                {tagStore.isFetchingResults && <LoadingSpinner center />}

                {tagStore.hasResults && (
                  <StudentList students={tagStore.students} />
                )}
              </Panel>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

const Result = ({results, total}) => (
  <p className="text-muted">{`${results} of ${total} results`}</p>
)
