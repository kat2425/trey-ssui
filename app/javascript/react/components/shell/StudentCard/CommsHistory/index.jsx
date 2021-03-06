import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import { observer }       from 'mobx-react'
import commsStore         from 'stores/CommsStore'
import CommsItem          from 'ui/shell/CommsItem'
import CommsInfo          from 'ui/shell/CommsInfo'
import SubmoduleHeader    from 'ui/shell/SubmoduleHeader'
import _                  from 'lodash'

import Left               from './Left'
import Right              from './Right'
import Main               from './Main'
import Container          from './Container'
import Loader             from './Loader'
import MsgWrapper         from './MsgWrapper'



@observer
export default class CommsHistory extends Component {
  static propTypes = {
    student: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
  }

  componentDidMount(){
    this.fetchCommsHistory()
  }

  componentWillUnmount(){
    commsStore.dispose()
  }

  fetchCommsHistory = () => {
    const { student } = this.props

    commsStore.fetchCommunicationHistory(student.id)
  }

  setDefaultSelectedComm = (comm) => {
    commsStore.setSelectedComm(comm)
  }

  renderCommunications = () => {
    const {  sortedCommunications } = commsStore

    return sortedCommunications.map((c, i) => {
      if(i === 0) this.setDefaultSelectedComm(c)
      return <CommsItem first={i === 0} key={c.id} comm={c}/>
    })
  }

  render(){
    const { isLoading, sortedCommunications } = commsStore

    return (
      <div>
        <SubmoduleHeader title='Engagement' />

        <Loader isLoading={isLoading} />

        {(!isLoading && _.isEmpty(sortedCommunications)) && (
          <MsgWrapper>This student does not have any engagement history.</MsgWrapper>
        )}

        {(!isLoading && !_.isEmpty(sortedCommunications)) && (
          <Container>
            <Main>
              <Left>
                {this.renderCommunications()}
              </Left>
              <Right>
                <CommsInfo store={commsStore} show/>
              </Right>
            </Main>
          </Container>
        )}
      </div>
    )
  }
}

