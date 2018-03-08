
import React                           from 'react'
import PropTypes                       from 'prop-types'
import { Wrapper, Col, Row, FlexItem } from './styles'
export { Text } from './styles'

ListItem.propTypes = {
  renderLeftIcon:    PropTypes.func,
  renderRightIcon:   PropTypes.func,
  renderTopLeft:     PropTypes.func.isRequired,
  renderTopRight:    PropTypes.func.isRequired,
  renderBottomLeft:  PropTypes.func.isRequired,
  renderBottomRight: PropTypes.func.isRequired,
  onClick:           PropTypes.func.isRequired
}

export default function ListItem({
  renderLeftIcon,
  renderRightIcon,
  renderTopLeft,
  renderTopRight,
  renderBottomLeft,
  renderBottomRight,
  topLeftContainerStyle,
  topRightContainerStyle,
  bottomLeftContainerStyle,
  bottomRightContainerStyle,
  onClick,
  style,
  className
}) {
  return (
    <Wrapper onClick={onClick} style={style} className={`p-2 ${className}`}>
      {renderLeftIcon && <Col left>{renderLeftIcon()}</Col>}
      <Col flex="1" className="mx-1">
        <Row className='mb-1'>
          <FlexItem style={topLeftContainerStyle}>{renderTopLeft && renderTopLeft()}</FlexItem>
          <FlexItem style={topRightContainerStyle} justifyContent="flex-end">
            {renderTopRight && renderTopRight()}
          </FlexItem>
        </Row>
        <Row>
          <FlexItem 
            style={bottomLeftContainerStyle} 
            className='align-self-start'
          >
            {renderBottomLeft && renderBottomLeft()}
          </FlexItem>
          <FlexItem 
            style={bottomRightContainerStyle} 
            className='align-self-start'  
            justifyContent="flex-end"
          >
            {renderBottomRight && renderBottomRight()}
          </FlexItem>
        </Row>
      </Col>
      {renderRightIcon && <Col right>{renderRightIcon()}</Col>}
    </Wrapper>
  )
}
