import React, { Component } from 'react'
import { withRouter }       from 'react-router-dom'
import Iframe               from 'react-iframe'
import uiStore              from 'stores/UiStore'

@withRouter
export default class Reporting extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    uiStore.setIsReportingInUse(true)
  }

  componentWillUnmount() {
    uiStore.setIsReportingInUse(false)
  }

  shouldComponentUpdate() {
    const wasOnStudentCard = !!this.props.location.pathname.match(/\/students\//)

    return !(wasOnStudentCard || uiStore.isStudentCardOpen)
  }

  reportingPath = (action) => {
    return {
      viewer: 'flow.html?_flowId=searchFlow&mode=search&filterId=resourceTypeFilter&filterOption=resourceTypeFilter-reports&searchText=&theme=default',
      adhoc:  'flow.html?_flowId=adhocFlow&mode=browse&theme=default'
    }[action]
  }

  render() {
    const jrsServer = window.SSUser.jasper.server
    const jrsOrg    = window.SSUser.jasper.org
    const jrsToken  = window.SSUser.jasper.token
    const jrsID     = window.SSUser.id
    const jrsSeed   = Math.floor((Math.random() * 800000) + 100000)

    const frameLink = `${jrsServer}/${this.reportingPath(this.props.action)}&j_username=${jrsID}%7C${jrsOrg}&j_password=${jrsToken}&cb=${jrsSeed};`

    return (
      <Iframe
        url    = {frameLink}
        styles = {{marginTop: '-1.5rem', paddingBottom: '50px', paddingTop: '8px'}}
      />
    )
  }
}
