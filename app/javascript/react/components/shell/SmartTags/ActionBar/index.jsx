import React                   from 'react'
import Dropdown                from 'ui/shell/Dropdown'
import { Button, ButtonGroup } from 'reactstrap'

const TagActionBar = ({ onCSVClick, onMapClick, onDropdownSelect }) => {
  return (
    <ButtonGroup>
      <Button onClick={onCSVClick} outline color="primary">CSV Export</Button>
      <Dropdown
        labelKey      = 'label'
        valueKey      = 'id'
        onSelect      = {onDropdownSelect}
        options       = {[{label: 'Tier 2 Students', id: 1}]}
        dropdownLabel = 'Group into Export' 
      />
      {/*<Button onClick={onMapClick} outline color="primary">Show Results on Map</Button>*/}
    </ButtonGroup>
  )
}

export default TagActionBar
