import React, { PureComponent }                       from 'react'
import _                                              from 'lodash'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import uuid                                           from 'uuid'


export default class Paginatron extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      totalPages:  this.props.totalPages || 0,
      currentPage: this.props.currentPage || 1,
      RANGE:       10,
      INTERVAl:    4
    }
  }

  handleChange(currentPage) {
    this.props.onChange(currentPage)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalPages:  nextProps.totalPages || this.state.totalPages,
      currentPage: nextProps.currentPage || this.state.currentPage
    })
  }

  renderPaginatorStub(page, label) {
    return (
      <PaginationItem key={uuid()} disabled>
        <PaginationLink>
          {label}
        </PaginationLink>
      </PaginationItem>
    )
  }

  generateSmallRange(totalPages) {
    return _.range(totalPages)
  }

  generateRangeNearBeginning(INTERVAL, page, totalPages) {
    const nearby = _.range(0, page + INTERVAL)

    nearby.push(totalPages - 2)
    nearby.push(totalPages - 1)
    return nearby
  }

  generateRangeNearEnd(INTERVAL, page, totalPages) {
    const nearby = _.range(page - INTERVAL, totalPages)

    nearby.unshift(1)
    nearby.unshift(0)
    return nearby
  }

  generateRangeInMiddle(INTERVAL, page, totalPages) {
    const nearby = _.range(page - INTERVAL, page + INTERVAL)

    nearby.unshift(1)
    nearby.unshift(0)
    nearby.push(totalPages - 2)
    nearby.push(totalPages - 1)
    return nearby
  }
  paginatorRange() {
    const INTERVAL = 4
    const RANGE = 10

    if (this.state.totalPages < RANGE) {
      return this.generateSmallRange(this.state.totalPages)
    } else if ( (this.state.currentPage - INTERVAL) < 2) {
      return this.generateRangeNearBeginning(INTERVAL, this.state.currentPage, this.state.totalPages)
    } else if ((this.state.totalPages - this.state.currentPage) < INTERVAL + 2) {
      return this.generateRangeNearEnd(INTERVAL, this.state.currentPage, this.state.totalPages)
    } else {
      return this.generateRangeInMiddle(INTERVAL, this.state.currentPage, this.state.totalPages)
    }
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
          key      = {uuid()}
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
      this.setState({ currentPage: page })
      this.handleChange(page)
    }
  }

  render() {
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
