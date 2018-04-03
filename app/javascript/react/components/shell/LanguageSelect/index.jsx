import React           from 'react'
import { observer }    from 'mobx-react'
import PropTypes       from 'prop-types'
import { Select }      from 'antd'
import cachedLanguages from 'helpers/languages'
import StyledSelect    from './StyledSelect'

LanguageSelect.propTypes = {
  color:           PropTypes.string,
  placeholder:     PropTypes.string,
  defaultLanguage: PropTypes.string,
  value:           PropTypes.string,
  onChange:        PropTypes.func.isRequired,
  style:           PropTypes.object,
  languageList:    PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      name:     PropTypes.number.isRequired
    }).isRequired
  )
}

function LanguageSelect({
  color,
  onChange,
  style,
  placeholder,
  languageList    = cachedLanguages,
  defaultLanguage = 'en',
  value           = 'en',
  ...rest
}) {
  return (
    <StyledSelect
      showSearch
      placeholder  = {placeholder}
      color        = {color}
      value        = {value}
      size         = "small"
      defaultValue = {defaultLanguage}
      onSelect     = {onChange}
      filterOption = {filterOption}
      style        = {style}
      {...rest}
    >
      {renderOptions({languageList})}
    </StyledSelect>
  )
}
function filterOption(input, option) {
  const children = option.props.children

  return children.toLowerCase().indexOf(input.toLowerCase()) > -1
}

const renderOptions = ({languageList}) => {
  return languageList.map(({language, name}) => (
    <Select.Option key={language} value={language}>
      {name}
    </Select.Option>
  ))
}

export default observer(LanguageSelect)
