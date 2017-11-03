import React, {Component}            from 'react'
import {observer}                    from 'mobx-react'
import styled, {keyframes}           from 'styled-components'
import {ifProp}                      from 'styled-tools'
import renderHTML                    from 'react-render-html'
import { Card }                      from 'reactstrap'
import DateFormat                    from 'helpers/DateFormat'
import ReactDOM                      from 'react-dom'
import LoadingSpinner                from 'ui/shell/LoadingSpinner'
import withTranslator                from 'ui/hoc/withTranslator'
import { isEmptyHTML, getInnerText } from 'helpers/HTMLParser'


const Text = styled.span`
  font-size: 14px;
  display: inline-block;
`
const EText = withTranslator(Text)

@observer
export default class Email extends Component {
  timeoutId = null

  componentDidMount(){
    this.scrollIntoView()
  }
  componentDidUpdate(){
    this.scrollIntoView()
  }

  scrollIntoView = () => {
    if(!this.props.comm.isActive) return

    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => {
      ReactDOM.findDOMNode(this).scrollIntoView({block: 'center', behavior: 'smooth'})
    }, 300)
  }

  getTime = () => {
    const {comm} = this.props

    return DateFormat.time12Hour(comm.createdAt)
  }

  getSubject = () => {
    const {comm} = this.props
    const {email, preview} = comm

    return email && email.subject ? email.subject : preview
  }

  getBody = () => {
    const {email, preview, isLoading} = this.props.comm
    const body = email && email.body ? renderHTML(email.body) : preview

    return isLoading ? <LoadingSpinner center/> : body
  }

  getText = () => {
    const { email, isLoading} = this.props.comm

    return (isLoading || !email) ? '' : getInnerText(email.body)
  }

  render(){
    const {isActive} = this.props.comm

    return (
      <Wrapper active={isActive}>        
        <Subject> 
          {this.getSubject()} 
          <small>{this.getTime()}</small> 
        </Subject>
        <Body>
          <EText textToTranslate={this.getText()}>{this.getBody()}</EText>
        </Body>
      </Wrapper>
    )
  }
}

const active = keyframes`
	0% {
		background: rgb(254, 248, 216);
	}

	100% {
		background: #fff;
	}
`

const Wrapper = styled(Card)`
  background-color: #fff;
  margin-bottom: 20px;
  padding: 15px;

  ${ifProp('active', `
    box-shadow: 0 0 8px rgba(35, 173, 255, 1);
    border: 1px solid white;
    animation: ${active} 3s ease-out 0.5s;  
  `)}
`

const Subject = styled.div.attrs({className: 'text-muted'})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  padding-bottom: 15px;
  margin-bottom: 15px;
`

const Body = styled.div`
  overflow: auto;
  max-width: 100%;
`
