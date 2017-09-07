import React, { Component} from 'react'
import PropTypes           from 'prop-types'
import { observer }        from 'mobx-react'
import { Col } from 'reactstrap'
import _    from 'lodash'

const headerStyle = {
  position: 'absolute',
  top:      67
}

@observer
export default class ConversationHeader extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  renderHeader() {
    const {contact} = this.props

    return (
      <div key={ contact.id } className='text-right'>
        <h4>{ contact.name }</h4>
        <h5 className='font-weight-normal m-0'>&nbsp;{ contact.relationship }</h5>
        <span className='text-muted m-0'>{ contact.phone }</span>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Col className='float-left col-sm-1' style={headerStyle}>
          <span 
            onClick   = {this.props.handleBack}
            style     = {{lineHeight:'20px'}}
            className = 'icon icon-chevron-thin-left'
          />
        </Col>

        <Col className='float-right mt-5 col-sm-11'>
          {this.renderHeader()}
        </Col>
      </div>
    )
  }
}
