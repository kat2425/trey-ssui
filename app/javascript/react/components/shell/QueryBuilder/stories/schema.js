export default {
  type: 'group',
  id: 'bb8ab999-0123-4456-b89a-b15f9864d7d9',
  children1: {
    'b999b8a8-cdef-4012-b456-715f9864d7da': {
      type: 'rule',
      id: 'b999b8a8-cdef-4012-b456-715f9864d7da',
      properties: {
        field: 'num',
        operator: 'between',
        value: [2, 5],
        valueSrc: ['value', 'value'],
        operatorOptions: null,
        valueType: ['number', 'number']
      }
    },
    '999a8baa-89ab-4cde-b012-315f98654307': {
      type: 'rule',
      id: '999a8baa-89ab-4cde-b012-315f98654307',
      properties: {
        field: 'datetime',
        operator: 'equal',
        value: ['datetime2'],
        valueSrc: ['field'],
        operatorOptions: null,
        valueType: [null]
      }
    },
    '8bb9abaa-0123-4456-b89a-b15f98659be3': {
      type: 'group',
      id: '8bb9abaa-0123-4456-b89a-b15f98659be3',
      properties: { conjunction: 'AND' },
      children1: {
        'abaaa99a-cdef-4012-b456-715f98659be3': {
          type: 'rule',
          id: 'abaaa99a-cdef-4012-b456-715f98659be3',
          properties: {
            field: 'time',
            operator: 'between',
            value: ['15:11:32', '19:11:32'],
            valueSrc: ['value', 'value'],
            operatorOptions: null,
            conjunction: 'AND',
            valueType: ['time', 'time']
          }
        }
      }
    }
  },
  properties: { conjunction: 'AND' }
}
