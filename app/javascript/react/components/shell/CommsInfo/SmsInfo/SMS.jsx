import React, {Component}  from 'react'
import {observer}          from 'mobx-react'
import ReactDOM            from 'react-dom'
import Time                from './Time'
import styled, {keyframes} from 'styled-components'
import {ifProp}            from 'styled-tools'
import withTranslator      from 'ui/hoc/withTranslator'

const Text = styled.span`
  font-size: 14px;
  display: inline-block;
`
const EText = withTranslator(Text)

@observer
export default class SMS extends Component { 
  timeoutId = null

  componentDidMount(){
    this.scrollIntoView()
  }

  componentDidUpdate(){
    this.scrollIntoView()
  }

  componentWillUnmount(){
    clearTimeout(this.timeoutId)
  }

  scrollIntoView = () => {
    if(!this.props.comm.isActive) return

    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      ReactDOM.findDOMNode(this).scrollIntoView({block: 'center', behavior: 'smooth'})
    }, 300)
  }

  activeStyle = () => {
    const activeStyle = {  
      boxShadow: '0 0 8px rgba(35, 173, 255, 1)',
      border:    '1px solid white'
    } 

    return this.props.comm.isActive ? activeStyle : null
  }

  getIncomingClass = () => {
    return this.props.comm.isIncoming ? 'mr-5 m-2 ml-0' : 'media-current-user ml-5 m-2 mr-0'
  }

  render() {
    const {comm} = this.props
    const {id, createdAt, isIncoming, preview, isActive} = comm
    const color = isIncoming ? '#657786' : '#fff' 

    return (
      <li 
        id={id} 
        className={`media ${this.getIncomingClass(isIncoming)}`} 
      >
        <div className='media-body'>
          <MediaText 
            active={isActive} 
            incoming={isActive && isIncoming} 
            outgoing={isActive && !isIncoming}
          >
            <EText
              color           = {color}
              textToTranslate = {preview}
            >
              {preview}
            </EText>
          </MediaText>
          <Time time={createdAt} isIncoming={isIncoming} />
        </div>
      </li>
    )
  }
}

const outgoing = keyframes`
  0% {
    background: #b1e5ff  
  }

  100% {
    background: #3f9fcf;
  }
`

const incoming = keyframes`
  0% {
    background: rgb(254, 248, 216);
  }

  100% {
    background: #fff;
  }
`

const MediaText = styled.div.attrs({className: 'media-body-text'})`
  ${ifProp('active',`
    box-shadow: 0 0 6px rgba(35, 173, 255, 1) !important;
    border:    1px solid white !important;
  `)}
  ${ifProp('incoming', `
    animation: ${incoming} 3s ease-out 0.5s !important;  
   `)}

  ${ifProp('outgoing', `
    animation: ${outgoing} 3s ease-out 0.5s !important;  
  `)}
`
