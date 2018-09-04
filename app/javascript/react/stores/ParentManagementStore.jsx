import { setter }           from 'mobx-decorators'
import parentUserStore      from 'stores/ParentUserStore'
import potentialUserStore   from 'stores/PotentialUserStore'

import {
  action,
  observable
} from 'mobx'

export const MODE = {
  INVITED:  'invited',
  ACCEPTED: 'accepted'
}

export class ParentManagementStore {
  @setter @observable mode = MODE.INVITED

   @action clearData = () => {
     parentUserStore.clearData()
     potentialUserStore.clearData()
   }

   @action fetchCorrectUsers = () => {
     if (this.mode === MODE.INVITED)  potentialUserStore.fetchPotentialUsers()
     if (this.mode === MODE.ACCEPTED) parentUserStore.fetchParentUsers()
   }

   @action onPageChange = () => {
     this.fetchPotentialUsers()
   }

   @action handleModeChange = ({target}) => {
     this.setMode(MODE[target.value.split(' ')[0].toUpperCase()])
     this.fetchCorrectUsers()
   }
}

export default new ParentManagementStore()
