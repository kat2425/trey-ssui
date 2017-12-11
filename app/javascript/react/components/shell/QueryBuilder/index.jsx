import React, { Component} from 'react'
import PropTypes           from 'prop-types'

import config              from './config'
import Query               from './QueryWrapper'
import Builder             from './BuilderWrapper'
import {fromJS}            from 'immutable'
import {Utils}             from 'react-awesome-query-builder'
import stringify           from 'json-stringify-safe'
import ActionButtons       from './ActionButtons'

class QueryBuilder extends Component {
  state = {
    value: fromJS(this.props.tree)
  }

  static propTypes = {
    tree:     PropTypes.object,
    schema:   PropTypes.object,
    onChange: PropTypes.func,
    disable:  PropTypes.bool
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.disable !== nextProps.disable){
      this.setState({
        disable: nextProps.disable
      })
    }
  }

  handleChange = (tree) => {
    this.setState({value: tree})

    const treeFormat = stringify(tree)
    const builderFormat = stringify(Utils.queryBuilderFormat(tree, config))

    this.props.onChange(treeFormat, builderFormat)
  }

  render() {
    const { value } = this.state
    const { onTest, onSave, disable, schema } = this.props

    config.fields = schema
    return (
      <div>
        <Query 
          config={config}
          value={value}
          onChange={this.handleChange}
          getChildren={props => <Builder {...props} />}
        />
        <ActionButtons disabled={disable} onTest={onTest} onSave={onSave} />
      </div>
    )
  }
}

export default QueryBuilder
