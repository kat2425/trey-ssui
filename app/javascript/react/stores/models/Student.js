import { computed, action } from 'mobx'

export default class Student {
  store     = null
  id        = ''
  name      = ''

  constructor(store, json) {
    this.store = store
    this.update(json)
  }

  @computed get isActive() {
    return this.store.currentStudent === this
  }

  @action update({
    id,
    full_name
  }) {
    this.id = id
    this.fullName = full_name
  }

  @action handleOnStudentClick = (callback) => {
    this.store.setCurrentStudent(this)
    callback(this.id)
  }
}