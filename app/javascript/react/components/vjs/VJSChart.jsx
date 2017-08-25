import React, { Component } from 'react'

import {
  Collapse,            Button,     Card,           CardBlock,
  UncontrolledTooltip, Pagination, PaginationItem, PaginationLink
} from 'reactstrap'

import LoadingSpinner from 'ui/shell/LoadingSpinner'

const chartContainer = { margin: '5px' }

export default class VJSChart extends Component {
  constructor(props) {
    super(props)

    this._isMounted = false
    this._retries   = 0

    this.report     = null
    this.reportID   = `vjs-${this.props.id}`
    this.state      = {
      resourceLoaded: false,
      collapse:       false,
      totalPages:     0,
      currentPage:    1,
    }
  }

  // Due to VisualizeJS's funky method of rendering, its target element must be part of the
  // DOM instead of React's virtual DOM, so we must wait until mounted to call the client's
  // render method.  A nice benefit to this method is a simple entry/exit point for a
  // loading indicator
  componentDidMount() {
    const { reportPath, params } = this.props

    this._isMounted = true
    this.renderChart(reportPath, params)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  // only call renderChart() when receiving new report params
  componentWillReceiveProps(nextProps) {
    const { reportPath, params } = nextProps

    if (!(this.props.params === nextProps.params)) {
      this.setReportState(false)
      this.renderChart(reportPath, params)
    }
  }

  setReportState(bool) {
    this.setState({ resourceLoaded: bool })
  }

  // TODO: refactor into dynamic doc-type function
  exportPDF() {
    this.report.export({
      outputFormat:     'pdf',
      ignorePagination: false
    }, (link) => {
      window.location.href = (link.href || link)
    })
  }

  // Call our VJSClient (shared via window variable) and fire a report render that will
  // render to our newly created DOM element when finished on VJS server
  renderChart(reportPath, reportParams) {
    this.report = window.vjsClient.report({
      // Fixed VJS properties
      container:      `#${this.reportID}`,
      resource:       reportPath,
      loadingOverlay: false,
      autoresize:     true,
      scrollToTop:    false,

      // Props open to override via our React component
      linkOptions:      this.mergeLinkOptions((this.props.linkOptions || {})),
      ignorePagination: (this.props.ignorePagination || false),
      params:           (reportParams || {}),

      // TODO: fixme with a spread ... operator
      events: Object.assign((this.props.events || this.correctVJSTable()), {
        changeTotalPages: (total) => {
          if (this._isMounted) this.setState({ totalPages: total })
        }
      }),

      // Hide our loading indicator on a successful render
      success: () => {
        if (this._isMounted) this.setState({ resourceLoaded: true })
      },

      error: this.handleError
    })
  }

  handleError(err) {
    if (err.errorCode === 'resource.not.found') {
      if (this._retries <= 2) {
        this.renderChart(this.props.reportPath, this.props.params)
        this._retries++
      }
    }
  }

  renderLoader() {
    // VisualizeJS provides a terrible loading overlay, that not only looks visually
    // unappealing, but often exits well before the report has truly finished loading
    // _and_ rendering.  We disable it's loading overlay with a fixed value in the render
    // method and replace it with a CSS defined animation
    if (!this.state.resourceLoaded) {
      return (
        <LoadingSpinner />
      )
    }
  }

  renderPaginator() {
    if ((this.state.totalPages > 1) && this.state.resourceLoaded && this.props.isTable && !this.props.ignorePagination) {
      return (
        <Pagination className='float-right'>
          <PaginationItem
            onClick  = {() => this.changeReportPage(this.state.currentPage - 1)}
            disabled = {this.state.currentPage === 1}
          >
            <PaginationLink previous/>
          </PaginationItem>

          {this.paginatorRange().map(page => this.renderPaginatorChild(page + 1))}

          <PaginationItem
            onClick  = {() => this.changeReportPage(this.state.currentPage + 1)}
            disabled = {this.state.currentPage === this.state.totalPages}
          >
            <PaginationLink next/>
          </PaginationItem>
        </Pagination>
      )
    }
  }

  renderPaginatorStub(page, label) {
    return (
      <PaginationItem key={page} disabled>
        <PaginationLink>
          {label}
        </PaginationLink>
      </PaginationItem>
    )
  }

  paginatorRange() {
    return [...Array(this.state.totalPages).keys()]
  }

  showPaginatorChild(page) {
    if ((page === 1) ||
        (page === this.state.totalPages) ||
        (Math.abs(page - this.state.currentPage) < 4)) {
      return true
    } else {
      return false
    }
  }

  renderPaginatorChild(page) {
    if (this.showPaginatorChild(page)) {
      return (
        <PaginationItem
          key      = {page}
          active   = {page === this.state.currentPage}
        >
          <PaginationLink onClick={() => this.changeReportPage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    } else if ((page === 2) || (page === (this.state.totalPages - 1))) {
      return this.renderPaginatorStub(page, '...')
    }
  }

  changeReportPage(page) {
    if ((page > 0) && (page <= this.state.totalPages)) {
      this.report.pages(page).run()
      this.setState({ currentPage: page })
    }
  }

  collapseIcon() {
    return this.state.collapse ? 'icon-chevron-small-down' : 'icon-chevron-small-up'
  }

  toggleCollapse() {
    this.setState({ collapse: !this.state.collapse })
  }

  mergeLinkOptions(opts) {
    return {
      ...opts,
      beforeRender: (pairs) => {
        pairs.forEach(pair => $(pair.element).addClass('vjs-link'))
      }
    }
  }

  correctVJSTable() {
    // This is some disgusting, but absolutely neccessary, hacks that must be
    // performed on data tables from VJS.  VJS creates pixel perfect reports,
    // but they are generally set a fixed-ish size and do not tend to scale well
    // with the dynamic widths encountered in browsers.  We can circumvent this
    // by hooking into the beforeRender event and doing some scrubbing
    if (this.props.isTable) {
      return {
        beforeRender: (html) => {
          $(html).find('table.jrPage').addClass('table table-hover').css('width', '100%')
          $(html).find('table.jrPage.table > tbody > tr:nth-child(1)').css('display', 'none')
          $(html).find('table.jrPage.table > tbody > tr:nth-child(2) > td').css('border-top', 'none')
          $(html).find('table.jrPage.table > tbody > tr').css('height', '')
          $(html).find('table.jrPage.table > tbody > tr > td').css('padding', '').css('white-space', '')
        }
      }
    } else {
      return {
        beforeRender: (html) => {
          // TODO: potentially fork visualize.js for chart dynamic chart width
          // NOTE: this indeed relies on visualize.js fork
          $(html).find('table.jrPage').css('width', '100%')
          $(html).find('.highcharts_parent_container').css('width', '100%')
          $(html).find('.highcharts_parent_container').css('position', 'absolute')
        }
      }
    }
  }

  render() {
    // You're probably noticing a <center> tag down below.  VJS does some silly things with
    // it's element scaling by way of using <table> tags vs <div>.  I know, it's like 1998
    // or something.  <center> will brute force the browser into aligning charts correctly
    // and maintaining the useful scaling features available on mobile.  I'm still combing
    // thru the catacombs of the non-public VisualizeJS source to find a workaround (jd)
    // --
    //  * sadly, using 'inline-block' and a center align is not a solution
    // --
    // FIXME: several things here in render() can be extracted into wrapper components
    return (
      <div className={this.props.className}>
        <Card className='mb-4'>
          <CardBlock>
            <h5>
              <span
                className = {`icon ${this.collapseIcon()} mr-3`}
                onClick   = {() => this.toggleCollapse()}
              />

              <span onClick = {() => this.toggleCollapse()}>{this.props.title}</span>

              <div className='float-right'>
                <Button
                  style    = {{padding: 0, width: 28, height: 28}}
                  size     = 'sm'
                  id       = {`${this.reportID}-export-pdf`}
                  onClick  = {() => this.exportPDF()}
                  disabled = {!this.state.resourceLoaded}
                >
                  <span className='icon icon-download text-muted'/>
                </Button>

                <UncontrolledTooltip
                  placement = 'left'
                  target    = {`${this.reportID}-export-pdf`}
                >
                  Save this chart as PDF
                </UncontrolledTooltip>
              </div>
            </h5>
          </CardBlock>

          <Collapse isOpen={!this.state.collapse}>
            <div className='text-center' style={chartContainer}>
              { this.renderLoader() }

              <center>
                <div id={this.reportID}>
                  <br/>
                </div>
              </center>

              { this.renderPaginator() }
            </div>
          </Collapse>
        </Card>
      </div>
    )
  }
}
