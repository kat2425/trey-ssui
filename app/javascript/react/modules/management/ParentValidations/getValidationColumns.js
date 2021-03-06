import React        from 'react'
import { Tag }      from 'antd'
import Actions      from './AcceptedActions'

const getColumns = () => [{
  title:  'Status',
  key:    'status',
  render: (text, { validation }) => (
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
  title:  'Relation',
  key:    'relation',
  render: (text, { validation }) => (
    <div key={validation.id}>
      <div
        className='cursor-pointer text-primary'
        onClick={validation.openStudentCard}
      >
        {`${validation.contact.student.full_name}'s ${validation.contact
          .relationship || 'Contact'}`}
      </div>
    </div>
  )
}, {
  title:  'DOB',
  key:    'DOB',
  render: (text, { validation }) => (
    <div>
      {getStatus(
        !validation.dateOfBirthQuestionAttempted,
        validation.dateOfBirthCorrect
      )}
    </div>
  )
},
{
  title:  'Address',
  key:    'address',
  render: (text, { validation }) => (
    <div>
      {getStatus(
        !validation.addressQuestionAttempted,
        validation.addressCorrect
      )}
    </div>
  )
},
{
  title:  'Action',
  key:    'action',
  render: (text, { validation }) => <Actions validation={validation} />
}
]

const getColor = status => {
  return {
    pending:  '#3399cc',
    rejected: '#bf5329',
    verified: '#4eb76e'
  }[status]
}

const getStatus = (noAttempt, success) => {
  if (noAttempt) {
    return <p>No Attempt</p>
  } else if (success) {
    return <p className='text-success'>Success</p>
  } else {
    return <p className='text-danger'>Failed</p>
  }
}

export default getColumns
