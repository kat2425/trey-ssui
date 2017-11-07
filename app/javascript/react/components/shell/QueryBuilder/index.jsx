import React, { Component} from 'react'
import PropTypes           from 'prop-types'

import config              from './config'
import Query               from './QueryWrapper'
import Builder             from './BuilderWrapper'
import {fromJS}            from 'immutable'
import { Utils }           from 'react-awesome-query-builder'
import stringify           from 'json-stringify-safe'
import ActionButtons       from './ActionButtons'

class QueryBuilder extends Component {
  state = {
    value: fromJS(this.props.tree)
  }

  static propTypes = {
    tree:     PropTypes.object,
    onChange: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: fromJS(nextProps.tree)})
  }

  handleChange = (tree) => {
    this.setState({value: tree})

    const _tree = stringify(tree)
    const builderFormat = stringify(Utils.queryBuilderFormat(tree, config))

    this.props.onChange(_tree, builderFormat)
  }

  render() {
    const { value } = this.state
    const { onTest, onSave } = this.props

    return (
      <div>
        <Query 
          config={config}
          value={value}
          onChange={this.handleChange}
          getChildren={props => <Builder {...props} />}
        />
        <ActionButtons disabled={!value} onTest={onTest} onSave={onSave} />
      </div>
    )
  }
}

export default QueryBuilder
