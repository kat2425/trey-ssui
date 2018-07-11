import React        from 'react'
import { Observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'
import { Tag }      from 'antd'

const getColor = (status) => {
  return {
    'pending':  '#3399cc',
    'rejected': '#bf5329',
    'verified': '#4eb76e'
  }[status]
}

const getStatus = (noAttempt, success) => {
  if(noAttempt) {
    return <p className='w-100 text-center'>No Attempt</p>
  } else if(success) {
    return <p className='w-100 text-center text-success'>Success</p>
  } else {
    return <p className='w-100 text-center text-danger'>Failed</p>
  }
}

const getColumns = () => [
  {
    title:  'Status',
    key:    'status',
    render: (text, {validation}) => (
      <div className='d-flex align-items-center'>
        <Tag
          className='w-100 text-center'
          key={validation.id}
          color={getColor(validation.validationStatus)}
        >
          {validation.validationStatus}
        </Tag>
      </div>
    )
  }, {
    title:  'Name',
    key:    'name',
    render: (text, {validation}) => (
      <div key={validation.id}>
        <div>{validation.user.full_name}</div>
        <small className='cursor-pointer text-primary' onClick={validation.openStudentCard}>
          {`${validation.student.full_name}'s ${validation.contact.relationship || 'Contact'}`}
        </small>
      </div>
    )
  }, {
    title:  'Phone',
    key:    'phone',
    render: (text, {validation}) => (
      <p key={validation.id}>{validation.user.mobile_number}</p>
    )
  }, {
    title:  'Email',
    key:    'email',
    render: (text, {validation}) => (
      <p key={validation.id}>{validation.user.username}</p>
    )
  }, {
    title:  'DOB',
    key:    'DOB',
    render: (text, {validation}) => (
      <div>
        { getStatus(!validation.dateOfBirthQuestionAttempted, validation.dateOfBirthCorrect) }
      </div>
    )
  }, {
    title:  'Address',
    key:    'address',
    render: (text, {validation}) => (
      <div>
        { getStatus(!validation.addressQuestionAttempted, validation.addressCorrect) }
      </div>
    )
  }, {
    title:  'Approve',
    key:    'approve',
    render: (text, {validation}) => (
      <Observer render={ () =>
        <SSButton
          onClick   = { validation.verify }
          disabled  = {validation.validationStatus === 'verified'}
          loading   = {validation.isVerifying}
          className = 'mx-auto d-block'
          iconClass = 'icon icon-check'
          color     = 'success'
          size      = 'sm'
        />
      }
      />
    )
  },{
    title:  'Reject',
    key:    'reject',
    render: (text, {validation}) => (
      <Observer render={ () =>
        <SSButton
          onClick   = {validation.reject}
          disabled  = {validation.validationStatus === 'rejected'}
          loading   = {validation.isRejecting}
          className = 'mx-auto d-block'
          iconClass = 'icon icon-cross'
          color='danger'
          size='sm'
        />
      }
      />
    )
  }
]

export default getColumns
