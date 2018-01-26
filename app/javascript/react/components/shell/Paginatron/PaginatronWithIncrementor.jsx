import React, { Component } from 'react'
import { Button }           from 'antd'
import Paginatron           from './'

export default class PaginatronWithIncrementor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalPages:      this.props.totalPages || 1,
      currentPage:     this.props.currentPage || 1,
      additionalPages: 0
    }
  }

  morePages(){
    this.setState({
      additionalPages: this.state.additionalPages + 1,
      currentPage:     this.state.currentPage + 1
    })
  }

  fewerPages(){
    this.setState({
      additionalPages: this.state.additionalPages - 1,
      currentPage:     this.state.currentPage - 1
    })
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.morePages()}>More</Button>
        <Button onClick={() => this.fewerPages()}> Fewer </Button>
        <Paginatron currentPage={this.state.currentPage} totalPages={this.state.totalPages + this.state.additionalPages} onChange={this.props.onChange}/>
      </div>
    )
  }}