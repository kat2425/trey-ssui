import React            from 'react'
import PropTypes        from 'prop-types'
import styled           from 'styled-components'
import fireEvent        from 'helpers/FireEvent'
import userStore        from 'stores/UserStore'
import { Tag }          from 'antd'
import {ifProp}         from 'styled-tools'
import {ellipsis}       from 'polished'
import {Text}           from 'ui/shell/ListItem'

ContactLink.propTypes = {
  name:         PropTypes.string.isRequired,
  studentId:    PropTypes.string.isRequired,
  relationship: PropTypes.string,
  tag:          PropTypes.string,
  studentName:  PropTypes.string.isRequired,
  vertical:     PropTypes.bool
}

export default function ContactLink({
  name, 
  relationship, 
  studentName, 
  studentId, 
  vertical, 
  tag = 'p', 
  ...rest
}){
  const Wrapper = getComponent(tag)

  return (
    <Wrapper 
      vertical={vertical}
      {...rest}
    >
      <div className={vertical ? 'd-block' : 'd-inline-block'}>
        {renderContactName(name, studentId)}
      </div>
      {!userStore.user.higherEd &&
        <_Tag
          onClick={showStudentCard(studentId)}
        >  
          {studentName}
          {`'s ${relationship || 'Contact'}`}
        </_Tag>
      }
    </Wrapper>
  )
}

function renderContactName(name, studentId) {
  const _props = userStore.user.higherEd ? {
    link:    true,
    onClick: showStudentCard(studentId)
  } : {}

  return (
    <Text {..._props}>{name}</Text>
  )
}

const showStudentCard = (id) => (e) => {
  e.stopPropagation()
  fireEvent('showStudentCard', { student: id })
}

const _Tag = styled(Tag)`
${ellipsis('100%')}
margin-left: 5px !important;
margin-right: 0px !important;
color: dimgray;
&:hover {
  background: #A9A9A9;
  color: white;
}

${ifProp('vertical', `
    display: block;
    margin-left: 0px !important;
  `)}
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;

 ${ifProp('vertical', `
    flex-direction: column;
    align-items: flex-end;
    margin-left: 0px !important;
  `)}
`

const getComponent = (tag) => Wrapper.withComponent(tag)
