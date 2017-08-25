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

  renderCard(){
    const { store, match } = this.props
    const { student, groupedContacts: contacts } = store

    return (
      <Row>
        <Col sm='3'>
          <Info student={student} />
          <Demographics student={student} />
          <FinancialAid student={student} />

          {/* <Card> */}
          {/*   <RRNavLink to={`${match.url}/overview`}>Overview</RRNavLink> */}
          {/*   <RRNavLink to={`${match.url}/contacts`}>Contacts</RRNavLink> */}
          {/*   {this.props.children} */}
            {/* <h5 className='p-2 pb-0 mb-0'>Details</h5> */}
            {/* <UserMenuSection title='Details'> */}
            {/*   <UserMenuItem */}
            {/*     title='Overview' */}
            {/*     iconClass='icon-list' */}
            {/*     link={`${match.url}/overview`} */}
            {/*   /> */}
            {/*   <UserMenuItem */}
            {/*     title='Contacts' */}
            {/*     iconClass='icon-calendar' */}
            {/*     link={`${match.url}/contacts`} */}
            {/*   /> */}
            {/*   <UserMenuItem */}
            {/*     title='Discipline' */}
            {/*     iconClass='icon-thermometer' */}
            {/*     link={`${match.url}/discipline`} */}
            {/*   /> */}
            {/*   <UserMenuItem */}
            {/*     title='Assessment' */}
            {/*     iconClass='icon-bar-graph' */}
            {/*     link={`${match.url}/assessment`} */}
            {/*   /> */}
            {/* </UserMenuSection> */}
          {/* </Card> */}
        </Col>

        {/* Root Container */}
        <Col sm='9'>
          <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/overview`}/>

            <Route
              path   = {`${match.url}/overview`}
              render = {() => <Overview student={student} handleClick={this.closeCard}/> }
            />

            <Route
              path   = {`${match.url}/contacts`}
              render = {() => <Contacts student={student} contacts={contacts}/> }
            />
          </Switch>

          <Card>
            <CardBlock>
              <h5>Contacts</h5>

              <Contacts contacts={contacts}/>
            </CardBlock>
          </Card>
        </Col>
      </Row>
    )
  }

  renderSubComponents = page => {
    return (
      <Card>
        <CardImg src={`http://via.placeholder.com/318x180?text=${page}`} />
        <CardBlock>
          <CardSubtitle className='text-center'>sub component</CardSubtitle>
        </CardBlock>
      </Card>
    )
  }
}
