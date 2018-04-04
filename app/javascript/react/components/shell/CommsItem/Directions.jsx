import React      from 'react'
import styled     from 'styled-components'
import {ifProp}   from 'styled-tools'
import RightArrow from 'react-icons/lib/fa/long-arrow-right'
import LeftArrow  from 'react-icons/lib/fa/long-arrow-left'
import {ellipsis} from 'polished'
import userStore  from 'stores/UserStore'
import { Tag }    from 'antd'

export const Incoming = ({userName, contactName, studentName, relationship, secondary}) => (
  <Wrapper secondary={secondary}>
    <Name bg>{userName}</Name>
    <LeftIcon />
    <Name>
      {contactName}
      {!userStore.user.higherEd &&
        <Tag className='ml-2'>
          {studentName}
          {`'s ${relationship || 'Contact'}`}
        </Tag>
      }
    </Name>
  </Wrapper>
)

export const Outgoing = ({userName, contactName, studentName, relationship, secondary}) => (
  <Wrapper secondary={secondary}>
    <Name>{userName}</Name>
    <RightIcon />
    <Name bg>
      {contactName}
      {!userStore.user.higherEd &&
          <Tag className='ml-2'>
            {studentName}
            {`'s ${relationship || 'Contact'}`}
          </Tag>
      }
    </Name>
  </Wrapper>
)

const Wrapper   = styled.div`
  display: flex;
  align-items: center;
  color: black;
  ${ifProp('secondary', `
    color: red;
  `)}
`

const getArrow  = Icon => styled(Icon)`
  margin: 0 10px;
`

const LeftIcon  = getArrow(LeftArrow)

const RightIcon = getArrow(RightArrow)

const Name      = styled.span`
  ${ellipsis('100%')}
  text-align: left;
  padding: 2px 8px;
  color: dimgray;
  ${ifProp('bg', `
    background-color: #f3f3f3;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.125);
  `)}
`

