import React from 'react'
import uuid  from 'uuid'

const THead = ({headers = []}) => (
  <thead>
    <tr>
      {headers.map(getHeader)}
    </tr>
  </thead>
)

const getHeader = (header) => <td key={uuid()}><strong>{header}</strong></td>

export default THead
