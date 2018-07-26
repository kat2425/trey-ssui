import React, { Component}  from 'react'
import { observer, inject } from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import Table                from 'ui/shell/AntdTable'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'
import AddParent            from 'ui/shell/Parent/PotentialUser'
import Paginatron           from 'ui/shell/Paginatron'

import parentStore          from 'stores/ParentAccessManagementStore'

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

  addParent = () => {
    parentStore.setShowModal(true)
  }

  render(){
    const { parentValidationStore: store } = this.props
    const { pagination, showPagination } = store

    return(
      <Wrapper>
        <ModuleHeader title='Parent Access Management'/>
        <Card className='mx-2 mb-2'>
          <CardBody className='p-4'>
            <FilterButtons store={store} />
            <TopBar store={store} onAddParent={this.addParent}/>
            {store.showTable && (
              <Table
                className  = 'pb-3'
                columns = {getColumns()}
                dataSource = {store.dataSource}
                pagination = {false}
              />
            )}
            {store.isLoading && <LoadingSpinner center /> }
            <AddParent />
            { showPagination && (
              <Paginatron
                totalPages  = {pagination.totalPages}
                currentPage = {pagination.current}
                onChange    = {pagination.onChange}
              />
            )}
          </CardBody>
        </Card>
      </Wrapper>
    )
  }
}
