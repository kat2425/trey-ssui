import React                from 'react'
import { observer }         from 'mobx-react'

import Table                from 'ui/shell/AntdTable'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'
import ParentModal          from 'ui/shell/Parent/PotentialUser'
import Paginatron           from 'ui/shell/Paginatron'

import AcceptedTopBar       from './AcceptedTopBar'
import ValidationDetails    from './ValidationDetails'
import getColumns           from './getAcceptedColumns'


const AcceptedParents = (props) => {
  const { store } = props
  const { pagination, showPagination } = store

  return (
    <div className='h-100 w-100'>
      <AcceptedTopBar store={store} />
      {store.showTable && (
        <Table
          className         = 'pb-3'
          columns           = {getColumns()}
          dataSource        = {store.dataSource}
          expandedRowRender = {({parentUser}) => <ValidationDetails parentUser={parentUser} />}
          expandedRowKeys   = {store.expandedRowKeys.values()}
          onExpand          = {handleOnExpand(store)}
          pagination        = {false}
        />
      )}
      {store.isLoading && <LoadingSpinner center /> }
      <ParentModal />
      { showPagination && (
        <Paginatron
          totalPages  = {pagination.totalPages}
          currentPage = {pagination.current}
          onChange    = {pagination.onChange}
        />
      )}
    </div>
  )
}

const handleOnExpand = store => (expanded, {parentUser}) => {
  return store.toggleViewValidations(parentUser)
}

export default observer(AcceptedParents)
