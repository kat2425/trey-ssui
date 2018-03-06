const types = {
  text: {
    widgets: {
      text: {
        defaultOperator: 'is_empty',
        operators:       [
          'equal',
          'not_equal',
          'is_empty',
          'is_not_empty',
          'proximity'
        ],
        widgetProps: {
          formatValue:      (val, fieldDef, wgtDef, isForDisplay) => '_' + JSON.stringify(val),
          valueLabel:       'Text',
          valuePlaceholder: 'Enter text'
        }
      },
      field: {
        operators: [
          'equal',
          'not_equal',
          'proximity'
        ]
      }
    }
  },
  number: {
    valueSources: ['value'],
    widgets:      {
      number: {
        operators: [
          'equal',
          'not_equal',
          'less',
          'less_or_equal',
          'greater',
          'greater_or_equal',
          'between',
          'not_between',
          'is_empty',
          'is_not_empty'
        ],
        defaultOperator: 'less',
        widgetProps:     {
          valueLabel:       'Number2',
          valuePlaceholder: 'Enter number2'
        }
      }
    }
  },
  date: {
    widgets: {
      date: {
        operators: [
          'equal',
          'not_equal',
          'less',
          'less_or_equal',
          'greater',
          'greater_or_equal',
          'between',
          'not_between',
          'is_empty',
          'is_not_empty'
        ]
      }
    }
  },
  time: {
    widgets: {
      time: {
        operators: [
          'equal',
          'not_equal',
          'less',
          'less_or_equal',
          'greater',
          'greater_or_equal',
          'between',
          'not_between',
          'is_empty',
          'is_not_empty'
        ]
      }
    }
  },
  datetime: {
    widgets: {
      datetime: {
        operators: [
          'equal',
          'not_equal',
          'less',
          'less_or_equal',
          'greater',
          'greater_or_equal',
          'between',
          'not_between',
          'is_empty',
          'is_not_empty'
        ],
        opProps: {
          between: {
            valueLabels: [
              {label: 'Date from', placeholder: 'Enter datetime from'},
              {label: 'Date to', placeholder: 'Enter datetime to'}
            ]
          }
        },
        widgetProps: {
          timeFormat:  'HH:mm',
          dateFormat:  'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD HH:mm'
        }
      }
    }
  },
  select: {
    valueSources: ['value'],
    mainWidget:   'select',
    widgets:      {
      select: {
        operators:   ['select_equals', 'select_not_equals'],
        widgetProps: {
          customProps: {
            showSearch: true
          }
        }
      },
      multiselect: {
        operators:   ['select_any_in', 'select_not_any_in'],
        widgetProps: {}
      }
    }
  },
  multiselect: {
    widgets: {
      multiselect: {
        operators: ['multiselect_equals', 'multiselect_not_equals']
      }
    }
  },
  boolean: {
    valueSources: ['value'],
    widgets:      {
      boolean: {
        operators:   ['equal'],
        widgetProps: {
          //you can enable this if you don't use fields as value sources
          hideOperator: true,
          operatorInlineLabel: 'is'
        }
      },
      field: {
        operators: ['equal']
      }
    }
  }
}

export default types
