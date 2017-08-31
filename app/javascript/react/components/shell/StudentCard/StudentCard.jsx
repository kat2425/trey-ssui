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
import Notes           from '../Notes'


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
    const { store, noteStore } = this.props
    noteStore.resetNoteForm()
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
                link      = {`${match.url}/overview`}
                location  = {location}
              /> 
              <UserMenuItem 
                title     = 'Contacts'
                iconClass = 'icon-calendar'
                link      = {`${match.url}/contacts`}
                location  = {location}
              /> 
              <UserMenuItem 
                title     = 'Discipline'
                iconClass = 'icon-thermometer'
                link      = {`${match.url}/discipline`}
                location  = {location}
              /> 
              <UserMenuItem 
                title     = 'Assessment'
                iconClass = 'icon-bar-graph'
                link      = {`${match.url}/assessment`}
                location  = {location}
              /> 
              <UserMenuItem 
                title     = 'Notes'
                iconClass = 'icon-pencil'
                link      = {`${match.url}/notes`}
                location  = {location}
              /> 
            </UserMenuSection> 
          </Card> 
        </Col>

        {/* Root Container */}
        <Col sm='9'>
          <Switch location={location}>
            <Redirect exact from={`${match.url}`} to={`${match.url}/overview`} />
            <Route
              path   = {`${match.url}/overview`}
              render = {() => <Overview student={student} handleClick={this.closeCard}/> }
            />
            <Route
              path   = {`${match.url}/contacts`}
              render = {() => <Contacts student={student} contacts={contacts}/> }
            />
            <Route
              path   = {`${match.url}/notes`}
              render = {() => <Notes student={student} noteStore={this.props.noteStore}/> }
            />
            <Route render={() => <div>404</div>} />
          </Switch>
        </Col>
      </Row>
    )
  }
}
