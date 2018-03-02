import en_US from 'antd/lib/locale-provider/en_US'

const settings = {
  locale: {
    short: 'en',
    full:  'en-US',
    antd:  en_US
  },
  maxLabelsLength:            50,
  hideConjForOne:             true,
  renderSize:                 'small',
  renderConjsAsRadios:        false,
  renderFieldAndOpAsDropdown: false,
  customFieldSelectProps:     {
    showSearch: true
  },
  // You can change the position of the group actions to the following:
  // oneOf [topLeft, topCenter, topRight (default), bottomLeft, bottomCenter, bottomRight]
  groupActionsPosition:    'bottomLeft',
  // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'
  setOpOnChangeField:      ['keep', 'default'],
  //false - if prev & next fields have same type (widget), keep
  clearValueOnChangeField: false, 
  clearValueOnChangeOp:    false,
  setDefaultFieldAndOp:    false,
  maxNesting:              10,
  fieldSeparator:          '.',
  fieldSeparatorDisplay:   ', ',
  showLabels:              false,
  valueLabel:              'Value',
  valuePlaceholder:        'Value',
  fieldLabel:              'Field',
  operatorLabel:           'Operator',
  fieldPlaceholder:        'Select field',
  operatorPlaceholder:     'Select operator',
  deleteLabel:             null,
  addGroupLabel:           'Add group',
  addRuleLabel:            'Add filter',
  delGroupLabel:           null,
  canLeaveEmptyGroup:      true, //after deletion
  formatReverse:           (
    q,
    operator,
    reversedOp,
    operatorDefinition,
    revOperatorDefinition,
    isForDisplay
  ) => {
    if (isForDisplay) return 'NOT(' + q + ')'
    else return '!(' + q + ')'
  },
  formatField: (
    field,
    parts,
    label2,
    fieldDefinition,
    config,
    isForDisplay
  ) => {
    if (isForDisplay) return label2
    else return field
  },
  valueSourcesInfo: {
    value: {
      label: 'Value'
    }
  },
  valueSourcesPopupTitle:   'Select value source',
  canReorder:               true,
  canCompareFieldWithField: (
    leftField,
    leftFieldConfig,
    rightField,
    rightFieldConfig
  ) => {
    //for type == 'select'/'multiselect' you can check listValues
    return true
  }
}

export default settings
