import React                from 'react'
import { observer }         from 'mobx-react'

import Table                from 'ui/shell/AntdTable'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'
import ParentModal          from 'ui/shell/Parent/PotentialUser'
import Paginatron           from 'ui/shell/Paginatron'

import TopBar               from './TopBar'
import getColumns           from './getInvitedColumns'


const InvitedParents = (props) => {
  const { store } = props
  const { pagination, showPagination } = store

  return (
    <div className='h-100 w-100'>
      <TopBar store={store} />
      {store.showTable && (
        <Table
          className  = 'pb-3'
          columns = {getColumns()}
          dataSource = {store.dataSource}
          pagination = {false}
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

export default observer(InvitedParents)