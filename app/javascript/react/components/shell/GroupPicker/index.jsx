import React, {Component}           from 'react'
import { observer }                 from 'mobx-react'
import { FormGroup, Label, Input }  from 'reactstrap'
import Select                       from 'react-select'
import _                            from 'lodash'
import NoteStore                    from 'stores/NoteStore'

@observer
export default class GroupPicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedItem: null,
      selectedGroup: null,
      groupsVisible: false
    }
  }

  componentDidMount() {
    const defaultKey = this.props.defaultKey ? _.find(this.props.options, {'id': this.props.defaultKey}) : null
    { defaultKey && this.setState({ selectedItem: defaultKey }) }
  }

  handleChange = (val) => {
    const selectedItem = val
    console.log('onchange', selectedItem)
    this.setState({ selectedItem })
    NoteStore.selectedVisibilityIndex = val.id
    switch(val.id) {
      case 1:
        NoteStore.global = false
        NoteStore.showGroups = false
        break
      case 2:
        NoteStore.global = true
        NoteStore.showGroups = false
        break
      case 3:
        NoteStore.global = false
        NoteStore.showGroups = true
        break
      default:
        NoteStore.global = false
    }

  }

  handleGroupChange = (val) => {
    const selectedGroup = val
    this.setState({ selectedGroup })
    NoteStore.addNoteGroup(val)
  }

  renderGroups = () => {
    return (
      <Select 
        multi
        style={{marginTop: 10}}
        placeholder="Select group(s)"
        value={NoteStore.selectedGroups.toJS()}
        options={this.props.groups.toJS()}
        labelKey={'group_name'}
        valueKey={'id'}
        onChange={this.handleGroupChange}
      />
    )
  }
  
  render() {
    return (
      <div>
        <Select 
        value={NoteStore.selectedVisibilityIndex}
        options={this.props.options}
        labelKey={this.props.labelKey}
        valueKey={this.props.valueKey}
        onChange={this.handleChange}
      />
      { NoteStore.showGroups && this.renderGroups() }
    </div>
    )
}
}
