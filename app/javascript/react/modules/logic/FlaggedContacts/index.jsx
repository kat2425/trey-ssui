import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import LoadingSpinner       from 'ui/shell/LoadingSpinner'
import ModuleHeader         from 'ui/shell/ModuleHeader'
import Table                from 'ui/shell/AntdTable'

import Wrapper              from './Wrapper'
import Content              from './Content'
import TopBar               from './TopBar'
import getColumns           from './getColumns'
import FlagNotes            from 'ui/shell/StudentCard/Contacts/FlagNotes'


@inject('flaggedContactStore')
@observer
export default class FlaggedContacts extends Component {
  componentDidMount() {
    this.props.flaggedContactStore.fetchFlaggedContacts()
  }

  componentWillUnmount() {
    this.props.flaggedContactStore.resetView()
  }

  handleOnExpand = (expanded, {contact}) => {
    const { flaggedContactStore } = this.props

    return flaggedContactStore.toggleViewNotes(contact)
  }

  getRowSelection = ({selectedRowKeys, onSelectChange}) => ({
    selectedRowKeys:  selectedRowKeys.peek(),
    onChange:         onSelectChange,
    getCheckboxProps: ({contact}) => ({
      disabled: contact.isUnFlagging
    })
  })

  render() {
    const { flaggedContactStore : store} = this.props

    return (
      <Wrapper>
        <ModuleHeader title='Flagged Contacts' />
        <Content className='p-4'>
          {store.showTable && <TopBar store={store} />}
          {store.showTable && (
            <Table
              locale            = {{emptyText: 'No flagged contacts yet'}}
              rowSelection      = {this.getRowSelection(store)}
              columns           = {getColumns(store)}
              dataSource        = {store.dataSource}
              expandedRowRender = {({contact}) => <FlagNotes contact={contact} />}
              expandedRowKeys   = {store.expandedRowKeys.values()}
              onExpand          = {this.handleOnExpand}
              pagination        = {false}
            />
          )}
          {store.isLoading && <LoadingSpinner center />}
        </Content>
      </Wrapper>
    )
  }
}
