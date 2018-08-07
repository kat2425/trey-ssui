import React, { Component}   from 'react'
import { observer}           from 'mobx-react'

import ModuleHeader          from 'ui/shell/ModuleHeader'
import InvitedParents        from './InvitedParents'
import AcceptedParents       from './AcceptedParents'
import ModeButtons           from './ModeButtons'

import potentialUserStore    from 'stores/PotentialUserStore'
import parentUserStore       from 'stores/ParentUserStore'
import parentManagementStore,
{ MODE }                     from 'stores/ParentManagementStore'

import Wrapper               from './Wrapper'

import {
  Card,
  CardBody
}  from 'reactstrap'


@observer
export default class ParentValidations extends Component {
  componentDidMount(){
    parentManagementStore.fetchCorrectUsers()
  }

  componentWillUnmount(){
    parentManagementStore.clearData()
  }

  render(){
    return(
      <Wrapper>
        <ModuleHeader title='Parent Access Management'/>
        <Card className='mx-2 mb-2'>
          <CardBody className='p-4'>
            <ModeButtons store={parentManagementStore} />
            {parentManagementStore.mode === MODE.INVITED ? (
              <InvitedParents store={potentialUserStore} />
            ) : (
              <AcceptedParents store={parentUserStore} />
            )}
          </CardBody>
        </Card>
      </Wrapper>
    )
  }
}
