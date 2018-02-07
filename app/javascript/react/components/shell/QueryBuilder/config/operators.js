const operators = {
  equal: {
    label:          'is',
    labelForFormat: '==',
    reversedOp:     'not_equal',
    formatOp:       (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return `${field} is ${value}`
    }
  },
  not_equal: {
    label:          'is not',
    labelForFormat: '!=',
    reversedOp:     'equal',
    formatOp:       (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return `${field} is not ${value}`
    }
  },
  less: {
    label:          'is less than',
    labelForFormat: '<',
    reversedOp:     'greater_or_equal',
    formatOp:       (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return `${field} is less than ${value}`
    }
  },
  less_or_equal: {
    label:          'is less than or equal to',
    labelForFormat: '<=',
    reversedOp:     'greater',
    formatOp:       (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return `${field} is less than or equal to ${value}`
    }
  },
  greater: {
    label:          'is over',
    labelForFormat: '>',
    reversedOp:     'less_or_equal',
    formatOp:       (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return `${field} is over ${value}`
    }
  },
  greater_or_equal: {
    label:          'is greater than or equal to',
    labelForFormat: '>=',
    reversedOp:     'less',
    formatOp:       (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return `${field} is ${value}`
    }
  },

  //between: {
  //label: 'Between',
  //labelForFormat: 'BETWEEN',
  //cardinality: 2,
  //formatOp: (
  //field,
  //op,
  //values,
  //valueSrcs,
  //valueTypes,
  //opDef,
  //operatorOptions,
  //isForDisplay
  //) => {
  //let valFrom = values.first()
  //let valTo = values.get(1)
  //if (isForDisplay)
  //return `${field} >= ${valFrom} AND ${field} <= ${valTo}`
  //else return `${field} >= ${valFrom} && ${field} <= ${valTo}`
  //},
  //valueLabels: ['Value from', 'Value to'],
  //textSeparators: [null, 'and'],
  //reversedOp: 'not_between'
  //},
  //not_between: {
  //label: 'Not between',
  //labelForFormat: 'NOT BETWEEN',
  //cardinality: 2,
  //reversedOp: 'between',
  //valueLabels: ['Value from', 'Value to'],
  //textSeparators: [null, 'and'],
  //reversedOp: 'between'
  //},

  is_empty: {
    isUnary: true,
    label: 'Is Empty',
    labelForFormat: 'IS EMPTY',
    cardinality: 0,
    reversedOp: 'is_not_empty',
    formatOp: (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return isForDisplay ? `${field} is empty` : `!${field}`
    }
  },
  is_not_empty: {
    isUnary: true,
    label: 'Is not empty',
    labelForFormat: 'IS NOT EMPTY',
    cardinality: 0,
    reversedOp: 'is_empty',
    formatOp: (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return isForDisplay ? `${field} is not empty` : `!!${field}`
    }
  },
  select_equals: {
    label: 'is',
    labelForFormat: '==',
    formatOp: (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return `${field} is ${value}`
    },
    reversedOp: 'select_not_equals'
  },
  select_not_equals: {
    label: 'is not',
    labelForFormat: '!=',
    formatOp: (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return `${field} is not ${value}`
    },
    reversedOp: 'select_equals'
  },
  select_any_in: {
    label: 'is any of',
    labelForFormat: 'IN',
    formatOp: (
      field,
      op,
      values,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      if (valueSrc == 'value') return `${field} in (${values.join(', ')})`
      else return `${field} in (${values})`
    },
    reversedOp: 'select_not_any_in'
  },
  select_not_any_in: {
    label: 'not any of',
    labelForFormat: 'NOT IN',
    formatOp: (
      field,
      op,
      values,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      if (valueSrc == 'value') return `${field} not in (${values.join(', ')})`
      else return `${field} not in (${values})`
    },
    reversedOp: 'select_any_in'
  },
  multiselect_equals: {
    label: 'is one of',
    labelForFormat: '==',
    formatOp: (
      field,
      op,
      values,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      if (valueSrc == 'value') return `${field} is equal to [${values.join(', or ')}]`
      else return `${field} is equal to ${values}`
    },
    reversedOp: 'multiselect_not_equals'
  },
  multiselect_not_equals: {
    label:          'not one of',
    labelForFormat: '!=',
    formatOp:       (
      field,
      op,
      values,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      if (valueSrc == 'value') return `${field} is not equal to [${values.join(', or ')}]`
      else return `${field} not equal to ${values}`
    },
    reversedOp: 'multiselect_equals'
  },
}

export default operators
