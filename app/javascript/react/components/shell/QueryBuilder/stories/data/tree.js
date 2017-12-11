export default {
  "type": "group",
  "id": "988b88b8-0123-4456-b89a-b1602dfbd483",
  "children1": {
    "989ab9b8-cdef-4012-b456-71602dfbd483": {
      "type": "rule",
      "id": "989ab9b8-cdef-4012-b456-71602dfbd483",
      "properties": {
        "field": "accel_readers.quiz_title",
        "operator": "select_any_in",
        "value": [
          [
            "Berenstain Bears and Mama's New Job, The",
            "Because of Winn-Dixie",
            "Berenstain Bears and the Sitter, The",
            "Big Red Sled, The",
            "Catwings Return",
            "Clifford's Happy Easter"
          ]
        ],
        "valueSrc": [
          "value"
        ],
        "operatorOptions": null,
        "valueType": [
          "multiselect"
        ]
      }
    },
    "88ba9989-89ab-4cde-b012-31602dfc3c11": {
      "type": "rule",
      "id": "88ba9989-89ab-4cde-b012-31602dfc3c11",
      "properties": {
        "field": "accel_readers.used_audio",
        "operator": "equal",
        "value": [
          true
        ],
        "valueSrc": [
          "value"
        ],
        "operatorOptions": null,
        "valueType": [
          "boolean"
        ]
      }
    },
    "9abab988-4567-489a-bcde-f1602dfc696b": {
      "type": "group",
      "id": "9abab988-4567-489a-bcde-f1602dfc696b",
      "properties": {
        "conjunction": "AND"
      },
      "children1": {
        "99a888aa-0123-4456-b89a-b1602dfc696c": {
          "type": "rule",
          "id": "99a888aa-0123-4456-b89a-b1602dfc696c",
          "properties": {
            "field": "satps.type",
            "operator": "equal",
            "value": [
              null
            ],
            "valueSrc": [
              "value"
            ],
            "valueType": [
              null
            ],
            "conjunction": "AND"
          }
        }
      }
    }
  },
  "properties": {
    "conjunction": "AND"
  }
}
