import React     from 'react'
import PropTypes from 'prop-types'

import Courses         from './Courses'

const Overview = ({student, handleClick}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>
        Overview
        <div className='float-right'>
          <span className='icon icon-cross' onClick={handleClick} />
        </div>
      </h4>

      <div>
        <Courses student={student} />
      </div>
    </div>
  )
}

Overview.defaultProps = {}

Overview.propTypes = {}

export default Overview

//<Card>
//  <Table>
//    <thead>
//      <tr>
//        <td>
//          <strong>Name</strong>
//        </td>
//        <td>
//          <strong>Relationship</strong>
//        </td>
//        <td>
//          <strong>Phone</strong>
//        </td>
//        <td>
//          <strong>Email</strong>
//        </td>
//      </tr>
//    </thead>
//
//    <Contacts contacts={contacts}/>
//  </Table>
//</Card>
