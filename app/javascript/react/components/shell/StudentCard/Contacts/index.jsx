import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { inject, observer } from 'mobx-react'

import SubmoduleHeader      from 'ui/shell/SubmoduleHeader'
import Search               from './Search'
import Filter               from './Filter'
import FlagFormModal        from './FlagFormModal'
import FlagNotesModal       from './FlagNotesModal'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'
import TableView            from './TableView'
import CardView             from './CardView'
import ViewSelector         from './ViewSelector'
import { Card }             from 'reactstrap'
import { Row, Col }         from 'antd'


@inject('contactStore')
@observer
export default class Contacts extends Component {
  static propTypes = {
    contactStore: PropTypes.object.isRequired,
    student:      PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }

  componentDidMount() {
    const { contactStore, student } = this.props

    contactStore.fetchStudentContacts(student.id)
  }

  componentWillUnmount() {
    this.props.contactStore.resetView()
  }

  render() {
    const { contactStore } = this.props

    return (
      <div>
        <SubmoduleHeader title='Contacts' />
        <Card className='mb-4 px-3 pb-4'>
          <Filter contactStore={contactStore} />
          <Row
            type      = 'flex'
            justify   = 'space-between'
            align     = 'middle'
            className = 'mt-3 mb-5'
          >
            <Col span={9}>
              <Search contactStore={contactStore} />
            </Col>
            <Col span={12} className='text-right'>
              <ViewSelector contactStore={contactStore} />
            </Col>
          </Row>
          {contactStore.showTableView && (
            <TableView contactStore={contactStore} />
          )}
          {contactStore.showGridView && (
            <CardView contactStore={contactStore} />
          )}
          {contactStore.isLoading && <LoadingSpinner center />}
          {contactStore.showEmptyContacts && <div className='text-center my-2'>No Contacts Found</div>}
        </Card>
        {contactStore.showFlagFormModal && <FlagFormModal contactStore={contactStore} />}
        {contactStore.showFlagNotesModal && <FlagNotesModal contactStore={contactStore} />}
      </div>
    )
  }
}
