import React, { Component}  from 'react'
import { observer, inject } from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import InvitedParents       from './InvitedParents'
import ModeButtons          from './ModeButtons'

import { MODE }             from 'stores/ParentValidationsStore'

import Wrapper              from './Wrapper'

import {
  Card,
  CardBody
}  from 'reactstrap'


@inject('parentValidationStore')
@observer
export default class ParentValidations extends Component {
  componentDidMount(){
    this.props.parentValidationStore.fetchParentValidations()
  }

  componentWillUnmount(){
    this.props.parentValidationStore.clearData()
  }

  render(){
    const { parentValidationStore: store } = this.props

    return(
      <Wrapper>
        <ModuleHeader title='Parent Access Management'/>
        <Card className='h-100 mx-2 mb-2'>
          <CardBody className='h-100 p-4'>
            <ModeButtons store={store} />
            {store.mode === MODE.INVITED ? (
              <InvitedParents store={store} />
            ) : (
              <h1>Accepted Parents</h1>
            )}
          </CardBody>
        </Card>
      </Wrapper>
    )
  }
}
