import React, { Component } from 'react'
import { observer }         from 'mobx-react'
import { Modal }            from 'antd'
import bowser               from 'bowser'
import chrome               from './chrome.svg'
import ie                   from './ie.png'
import firefox              from './firefox.svg'
import safari               from './safari.svg'


class BrowserMessage extends Component {
  state = {
    visible: false
  }

  componentDidMount(){
    if(this.isUnsupportedBrowser()){
      this.showModal()
    }
  }

  isUnsupportedBrowser = () => {
    return  (
      (bowser.msie && bowser.version <= 11) ||
      (bowser.chrome && bowser.version <= 45) ||
      (bowser.firefox && bowser.version <= 51) ||
      (bowser.safari && bowser.version <= 10)
    )
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  closeModal = () => {
    this.setState({ visible: false })
  }

  renderBrowser = (browser) => (
    <Browser {...browser}/>
  )

  render(){
    return (
      <Modal
        title         = 'Outdated browser detected'
        wrapClassName = "vertical-center-modal"
        visible       = {this.state.visible}
        footer        = {null}
        onCancel      = {this.closeModal}
        closable
      >
        <div className='text-center'>
          <p>Your browser is out of date, and may not be compatible with our website.</p>
          <p>A list of the most popular web browsers can be found below.</p>
          <p className='mt-2'>Just click on the icons to go to the download page and upgrade your browser.</p>
          <div className='mt-4'>
            {browsers.map(this.renderBrowser)}
          </div>
        </div>
      </Modal>
    )
  }
}

const Browser = ({name, url, icon}) => (
  <a href={url} className='browser d-inline-block m-2'>
    <img height='80' width='80' src={icon} />
    <a href={url} className='mt-2 d-block'>{name}</a>
  </a>
)

const browsers = [
  { 
    icon: chrome,
    name: 'Google Chrome',
    url:  'https://www.google.com/chrome/'
  },
  { 
    icon: firefox,
    name: 'Mozilla Firefox',
    url:  'https://www.mozilla.org/en-US/firefox/new/'
  },
  { 
    icon: safari,
    name: 'Safari',
    url:  'https://www.apple.com/safari/'
  },
  { 
    icon: ie,
    name: 'Internet Explorer',
    url:  'https://www.microsoft.com/en-us/windows/microsoft-edge'
  }
]

export default observer(BrowserMessage)
