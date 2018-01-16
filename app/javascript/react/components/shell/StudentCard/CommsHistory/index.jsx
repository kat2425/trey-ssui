import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import { observer }       from 'mobx-react'
import commsStore         from 'stores/CommsStore'
import CommsItem          from 'ui/shell/CommsItem'
import CommsInfo          from 'ui/shell/CommsInfo'
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
      <div className='h-100'>
        <h4 className='m-1 mb-3'>Engagement</h4>

        <Loader isLoading={isLoading} />

        {(!isLoading && _.isEmpty(sortedCommunications)) && (
          <MsgWrapper>No engagement for this student yet.</MsgWrapper>
        )}

        {!_.isEmpty(sortedCommunications) && (
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

