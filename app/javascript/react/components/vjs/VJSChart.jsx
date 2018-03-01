import React, { Component } from 'react'
import PropTypes            from 'prop-types'

import {
  Collapse,            Button,         Card,           CardBlock,
  UncontrolledTooltip, Pagination,     PaginationItem, PaginationLink,
  ButtonDropdown,      DropdownToggle, DropdownMenu,   DropdownItem
} from 'reactstrap'

import LoadingSpinner from 'ui/shell/LoadingSpinner'
import EmptyMessage   from 'ui/shell/EmptyMessage'

const chartContainer = { margin: '5px' }

export default class VJSChart extends Component {
  static defaultProps = {
    isTable:      false,
    noExport:     false,
    emptyIcon:    'info-with-circle',
    emptyTitle:   'No Data',
    emptyMessage: ''
  }

  constructor(props) {
    super(props)

    this._isMounted = false
    this._retries   = 0

    this.report     = null
    this.reportID   = `vjs-${this.props.id}`
    this.state      = {
      isExporting:    false,
      showError:      false,
      emptyReport:    false,
      resourceLoaded: false,
      collapse:       false,
      totalPages:     0,
      currentPage:    1,
      exportOpen:     false
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
      this.setState({ emptyReport: false, resourceLoaded: false, totalPages: 0 })
      this.renderChart(reportPath, params)
    }
  }

  setReportState(bool) {
    this.setState({ resourceLoaded: bool })
  }

  // TODO: refactor into dynamic doc-type function
  exportFile(format) {
    const _ignorePagination = format === 'pdf' ? false : true

    this.setState({ isExporting: true })

    this.report.export({
      outputFormat:     format,
      ignorePagination: _ignorePagination
    }, (link) => {
      this.setState({ isExporting: false })
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
        },

        reportCompleted: (status) => {
          // TODO: can we use an await here to check if component is mounted, if not,
          // wait until it is, and then complete the function?

          // Hide our loading indicator on a successful render
          if (this._isMounted) {
            this.setState({ resourceLoaded: true })

            // Show empty message if table has no data
            if (!this.report.data().components.length && this.props.isTable) {
              this.setState({ emptyReport: true })
            }
          }
        }
      }),

      success: () => {
        // XXX: this is triggered when report is successfully running, but potentially
        // not yet finished. Should we do anything here?
      },

      error: ::this.handleError
    })
  }

  handleError(err) {
    if (err.errorCode === 'resource.not.found') {
      if (this._retries <= 2) {
        this.renderChart(this.props.reportPath, this.props.params)
        this._retries++
      } else {
        this.setErrorState(err)
      }
    } else {
      this.setErrorState(err)
    }
  }

  setErrorState(err) {
    this.setState({ resourceLoaded: true, showError: true, errState: err })
  }

  renderError() {
    if (this.state.showError) {
      return (
        <div className='mb-4' style={{ color: '#df4d4b' }}>
          <span className='icon icon-emoji-sad' style={{ fontSize: '32px' }} />
          <br />
          <h5>Oh no!  We encountered an error fetching this data.</h5>
          <div style={{ color: '#df4d4b'}} className='text-left m-4 alert alert-danger'>
            <strong style={{ color: '#741e20'}}>Error Code:</strong>
            <br />
            <pre style={{fontSize: '11px'}}>{ this.state.errState.errorCode }</pre>
            <strong style={{ color: '#741e20'}}>Message:</strong>
            <br />
            <pre style={{fontSize: '11px'}}>{ this.state.errState.message }</pre>
          </div>
        </div>
      )
    }
  }

  renderEmptyMessage() {
    if (this.state.emptyReport) {
      const { emptyTitle, emptyIcon, emptyMessage } = this.props

      return (
        <EmptyMessage title={ emptyTitle } icon={ emptyIcon }>
          { emptyMessage }
        </EmptyMessage>
      )
    }
  }

  renderLoader() {
    // VisualizeJS provides a terrible loading overlay, that not only looks visually
    // unappealing, but often exits well before the report has truly finished loading
    // _and_ rendering.  We disable it's loading overlay with a fixed value in the render
    // method and replace it with a CSS defined animation
    if (!this.state.resourceLoaded) {
      return (
        <LoadingSpinner padding={2} />
      )
    }
  }

  renderExportLoader() {
    if (this.state.isExporting) {
      return (
        <LoadingSpinner
          padding      = {2}
          className    = 'pr-3'
          spinnerStyle = {{
            width:       '18px',
            height:      '18px',
            borderWidth: '0.22rem'
          }}
        />
      )
    }
  }

  renderPaginator() {
    if ((this.state.totalPages > 1) &&
         this.state.resourceLoaded &&
         this.props.isTable &&
         !this.props.ignorePagination) {
      return (
        <Pagination className='float-right' style={{marginTop: '-12px'}}>
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
          $(html).find('table.jrPage').addClass('table table-hover').css('width', '100%').css('margin-bottom', '0')
          $(html).find('table.jrPage.table > tbody > tr:nth-child(1)').css('display', 'none')
          $(html).find('table.jrPage.table > tbody > tr:nth-child(2) > td').css('border-top', 'none')
          $(html).find('table.jrPage.table > tbody > tr').css('height', '')
          $(html).find('table.jrPage.table > tbody > tr > td').css('padding', '').css('white-space', '')
        }
      }
    } else if (this.props.isCrosstab) {
      return {
        beforeRender: (html) => {
          $(html).find('table.jrPage').addClass('table table-hover').css('width', '100%').css('margin-bottom', '0')
          $(html).find('table.jrPage.table > tbody > tr:nth-child(1)').css('display', 'none')
          $(html).find('table.jrPage.table > tbody > tr:nth-child(2) > td').css('border-top', 'none')
          $(html).find('table.jrPage.table > tbody > tr').css('height', '')
          $(html).find('table.jrPage.table > tbody > tr > td').css('padding', '').css('white-space', '')
          $(html).find('table.jrPage.table > tbody > tr > td:last-child').css('display', 'none')
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

  toggleExport() {
    this.setState({
      exportOpen: !this.state.exportOpen
    })
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
    const cardHeight = (this.props.fullHeight) ? 'h-100' : 'mb-3'

    return (
      <div className={this.props.className}>
        <Card className={cardHeight}>
          <CardBlock className='no-flex-grow p-0 pl-2 pb-2 pt-2'>
            <div className='row mr-2 ml-1'>
              <div>
                <h5 className='mt-2'>
                  <span
                    className = {`icon ${this.collapseIcon()} mr-2`}
                    onClick   = {() => this.toggleCollapse()}
                  />

                  <span onClick = {() => this.toggleCollapse()}>{this.props.title}</span>
                </h5>
              </div>

              <div className='ml-auto' style={{display: 'flex'}}>
                <div className='mr-2 row'>
                  { this.props.children }
                </div>

                <ButtonDropdown isOpen={this.state.exportOpen} toggle={::this.toggleExport}>
                  { this.renderExportLoader() }
                  <DropdownToggle
                    style = {{padding: 0, width: 44, height: 36}}
                    size  = 'sm'
                    id    = {`${this.reportID}-export-data`}
                    caret
                  >
                    <span className='icon icon-download text-muted' style={{marginRight: '4px'}}/>
                  </DropdownToggle>

                  <DropdownMenu right>
                    <DropdownItem header>Export as</DropdownItem>

                    <DropdownItem divider />

                    <DropdownItem
                      onClick  = {() => this.exportFile('csv')}
                      disabled = {!this.props.isTable}
                      hidden   = {!this.props.isTable}
                    >
                      <span>CSV</span>
                    </DropdownItem>

                    <DropdownItem
                      onClick  = {() => this.exportFile('xls')}
                      disabled = {!this.props.isTable}
                      hidden   = {!this.props.isTable}
                    >
                      <span>XLS</span>
                    </DropdownItem>

                    <DropdownItem
                      onClick  = {() => this.exportFile('pdf')}
                      disabled = {this.props.isTable}
                      hidden   = {this.props.isTable}
                    >
                      <span>PDF</span>
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>

                <UncontrolledTooltip
                  placement = 'left'
                  target    = {`${this.reportID}-export-data`}
                >
                  Export data
                </UncontrolledTooltip>
              </div>
            </div>
          </CardBlock>

          <Collapse isOpen={!this.state.collapse}>
            <div className='text-center' style={chartContainer}>
              { this.renderError() }
              { this.renderEmptyMessage() }

              <center>
                <div id={this.reportID}>
                  <br/>
                </div>
              </center>

              { this.renderLoader() }
              { this.renderPaginator() }
            </div>
          </Collapse>
        </Card>
      </div>
    )
  }
}
