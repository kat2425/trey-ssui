import React, { Component }  from 'react'
import { observer }          from 'mobx-react'
import Modal                 from 'react-modal'

import {
  Switch, withRouter, Route, Redirect, Link as RRNavLink
} from 'react-router-dom'

import {
  Container,  Row,            Col,       Collapse,
  Button,     Card,           CardBlock, UncontrolledTooltip,
  Pagination, PaginationItem, PaginationLink,
  CardHeader, CardImg,        CardTitle, CardSubtitle, Badge, Table,
  ButtonGroup
} from 'reactstrap'

import UserMenuSection from 'ui/shell/UserMenu/UserMenuSection'
import UserMenuItem    from 'ui/shell/UserMenu/UserMenuItem'
import VJSChart        from 'ui/vjs/VJSChart'
import LoadingSpinner  from 'ui/shell/LoadingSpinner'

import Info            from './Info'
import Overview        from './Overview'
import Demographics    from './Demographics'
import FinancialAid    from './FinancialAid'
import Contacts        from './Contacts'

import fireEvent       from 'helpers/FireEvent'
import _               from 'lodash'

const cardStyle = {
  overlay: {
    zIndex:          3000,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },

  content: {
    zIndex:          3050,
    top:             20,
    bottom:          20,
    left:            55,
    right:           55,
    borderRadius:    '0.25em',
    border:          'none',
    backgroundColor: '#f7f9fb'
  }
}

@withRouter
@observer
export default class StudentCard extends Component {
  constructor(props) {
    super(props)

    this.student = this.props.store.student
    this.visible = this.props.store.visible
  }

  closeCard = () => {
    const { store } = this.props

    store.hideCard()
    fireEvent('onCloseStudentCard', { student: store.student.id })
  }

  render() {
    const { store } = this.props
    const { isLoading, student } = store

    return (
      <Modal
        style={cardStyle}
        isOpen
        onRequestClose={this.closeCard}
        contentLabel='Student Card'
      >
        {student ? this.renderCard() : this.renderLoader()}
      </Modal>
    )
  }

  renderLoader = () => {
    <Row className='justify-content-sm-center align-items-sm-center h-100'>
      <LoadingSpinner/>
    </Row>
  }

  componentWillReceiveProps(nextProps) {
    console.log('-- will receive')
  }

  isActive = (tab) => {
    const {match} = this.props
    return () => tab === match.params.tab
  }

  renderCard() {
    const { store, match, location } = this.props
    const { student, groupedContacts: contacts } = store

    return (
      <Row>
        <Col sm='3'>
          <Info student={student} />
          <Demographics student={student} />
          <FinancialAid student={student} />

          <Card> 
            {this.props.children} 
            <UserMenuSection title='Details'> 
              <UserMenuItem 
                title     = 'Overview'
                iconClass = 'icon-list'
                link      = 'overview'
                isActive  = {this.isActive('overview')}
              /> 
              <UserMenuItem 
                title     = 'Contacts'
                iconClass = 'icon-calendar'
                link      = 'contacts'
                isActive  = {this.isActive('contacts')}
              /> 
              <UserMenuItem 
                title     = 'Discipline'
                iconClass = 'icon-thermometer'
                link      = 'discipline'
                isActive  = {this.isActive('discipline')}
              /> 
              <UserMenuItem 
                title     = 'Assessment'
                iconClass = 'icon-bar-graph'
                link      = 'assessment'
                isActive  = {this.isActive('assessment')}
              /> 
            </UserMenuSection> 
          </Card> 
        </Col>

        {/* Root Container */}
        <Col sm='9'>
          <Route
            render = {this.renderRoutes}
          />
        </Col>
      </Row>
    )
  }

  renderRoutes = () => {
    const { store, match, location } = this.props
    const { student, groupedContacts: contacts } = store

    const tab = match.params.tab
    switch(tab){
      case 'overview':
        return <Overview student={student} handleClick={this.closeCard}/>
      case 'contacts':
        return <Contacts student={student} contacts={contacts}/>
      default:
        return <div>404 </div>
    }
  }
}
