import React, {Component} from 'react'
import { action }         from '@storybook/addon-actions'

import TreeInput          from './TreeInput'
import QueryView          from './QueryView'
import QueryBuilder       from '../'
import { Alert }          from 'reactstrap'

export default class Playground extends Component {
  state = { 
    tree:          this.props.tree,
    builderFormat: null,
    error:         null
  }

  handleChange = (tree, builderFormat) => {
    this.setState({tree, builderFormat})
  }

  handleInputChange = (e) => {
    this.setState({error: null})

    if(!e.target.value) return

    try {
      const tree = JSON.parse(e.target.value)

      this.setState({tree}) 
    } 
    catch(e){
      this.setState({error: e.message})
    }
  }

  render() {
    const {tree, builderFormat, error} = this.state

    return (
      <div> 
        <TreeInput onChange={this.handleInputChange} error={error}/>
        <QueryBuilder 
          tree     = {tree}
          onChange = {this.handleChange}
          onTest   = {action('onTest')}
          onSave   = {action('onSave')}
        />
        <QueryView tree={tree} builderFormat={builderFormat} />
        {error && <Alert color='danger' className='mt-2'>{error}</Alert>}
      </div>
    )
  }
}
