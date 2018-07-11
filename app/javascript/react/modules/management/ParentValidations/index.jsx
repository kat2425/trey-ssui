import React, { Component}  from 'react'
import { observer, inject } from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import Table                from 'ui/shell/AntdTable'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'

import Wrapper              from './Wrapper'
import TopBar               from './TopBar'
import FilterButtons        from './FilterButtons'
import getColumns           from './getColumns'

import {
  Card,
  CardBody
}  from 'reactstrap'

@inject('parentValidationStore')
@observer
export default class ParentValidations extends Component {
  componentDidMount(){
    this.props.parentValidationStore.fetchParentValidations()
  }

  componentWillUnmount(){
    this.props.parentValidationStore.clearData()
  }

  render(){
    const { parentValidationStore: store } = this.props

    return(
      <Wrapper>
        <ModuleHeader title='Parent Management'/>
        <Card className='mx-2 mb-2'>
          <CardBody className='p-4'>
            <FilterButtons store={store} />
            <TopBar store={store} />
            {store.showTable && (
              <Table
                columns = {getColumns()}
                dataSource = {store.dataSource}
                pagination = {false}
              />
            )}
            { store.isLoading && <LoadingSpinner center /> }
          </CardBody>
        </Card>
      </Wrapper>
    )
  }
}
