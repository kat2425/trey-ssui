import React         from 'react'
import { observer }  from 'mobx-react'
import {
  Button, ButtonGroup, Popover,
  PopoverContent, PopoverTitle
} from 'reactstrap'

const Dialpad = observer(({callingStore}) => {
  const { sendDigit, isDialPadSelected } = callingStore

  return (
    <Popover placement="bottom" isOpen={isDialPadSelected} target="Popover1">
      <span 
        style     = {{ padding: 5, fontSize: '1em' }} 
        onClick   = {()      => callingStore.setIsDialPadSelected(false)} 
        className = "icon icon-cross float-right"
      >
      </span>
      
      <PopoverTitle>Dialpad</PopoverTitle>

      <PopoverContent style={{ textAlign: 'center' }}>
        <ButtonGroup size="lg">
          <Button onClick={() => sendDigit('1')}>1</Button>
          <Button onClick={() => sendDigit('2')}>2</Button>
          <Button onClick={() => sendDigit('3')}>3</Button>
        </ButtonGroup>

        <ButtonGroup size="lg">
          <Button onClick={() => sendDigit('4')}>4</Button>
          <Button onClick={() => sendDigit('5')}>5</Button>
          <Button onClick={() => sendDigit('6')}>6</Button>
        </ButtonGroup>

        <ButtonGroup size="lg">
          <Button onClick={() => sendDigit('7')}>7</Button>
          <Button onClick={() => sendDigit('8')}>8</Button>
          <Button onClick={() => sendDigit('9')}>9</Button>
        </ButtonGroup>

        <ButtonGroup size="lg">
          <Button onClick={() => sendDigit('*')}>*</Button>
          <Button onClick={() => sendDigit('0')}>0</Button>
          <Button onClick={() => sendDigit('#')}>#</Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover >
  )
})

export default Dialpad