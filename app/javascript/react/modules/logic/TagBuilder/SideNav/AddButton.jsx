import React      from 'react'
import styled     from 'styled-components'
import { Button as Btn } from 'reactstrap'


export default function AddButton({onClick, children}){
  return (
    <Button color='link' onClick={onClick}>
      <span className='icon icon-plus mr-1' /> {children}
    </Button>
  )
}

const Button = styled(Btn)`
 font-weight: bold;
 font-size: 12px;
 cursor: pointer;
 padding: 10px;
 color: #4d565f;

 &:hover{
  color: #3f9fcf;
  text-decoration: none;
 }
`

