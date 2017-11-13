import React                   from 'react'
import ModuleHeader            from 'ui/shell/ModuleHeader'

import { 
  Row, 
  Col
} from 'reactstrap'

export default function TagBuilder() {
  return (
    <div>
      <ModuleHeader title='Tag Builder'/>
      <Row>
        <Col xs="12" sm="5">
          <h4>Query Builder placeholder</h4>
        </Col>
        <Col xs="12" sm="7">
          <h4>Query Results placeholder</h4>
        </Col>
      </Row>
    </div>
  )
}
