import React, { Component } from 'react'
import { Row, Col }         from 'reactstrap'
import { observer }         from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import QueryBuilder         from 'ui/shell/QueryBuilder'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'
import Panel                from 'ui/shell/Panel'
import StudentList          from 'ui/shell/StudentResults/StudentList'

import tagStore             from 'stores/TagStore'

@observer
export default class TagBuilder extends Component {
  render(){
    return (
      <div className='mb-4'>
        <ModuleHeader title='Tag Builder' /> 


        <Row className='mt-3'>
          <Col xs='12' sm='6'>
            <Panel className='pt-4' title='Set Conditions'>
              {tagStore.isFetchingSchema 
                ? <LoadingSpinner center/>
                : (
                  <QueryBuilder 
                    tree     = {tagStore.tree}
                    schema   = {tagStore.schema}
                    onChange = {tagStore.handleChange}
                    onTest   = {tagStore.testTag}
                    onSave   = {tagStore.saveTag}
                    disable  = {tagStore.disable}
                  />
                )
              }
            </Panel>
          </Col>
          <Col xs='12' sm='6'>
            <Panel 
              className='pt-4' 
              title='Students' 
              titleRight={() => <Result results={tagStore.students.length} total={tagStore.students.length} /> }
            >
              {tagStore.isFetchingResults && <LoadingSpinner center/>}

              {tagStore.hasResults && <StudentList students={tagStore.students} />}
            </Panel>
          </Col>
        </Row>
      </div>
    )
  }
}

const Result = ({results, total}) => <p className='text-muted'>{`${results} of ${total} results`}</p>
