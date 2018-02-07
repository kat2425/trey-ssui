import React                     from 'react'
import { storiesOf }             from '@storybook/react'
import { action }                from '@storybook/addon-actions'
import Paginatron                from 'ui/shell/Paginatron'
import PaginatronWithIncrementor from 'ui/shell/Paginatron/PaginatronWithIncrementor'

const stories = storiesOf('Paginatron', module)
const divStyle = {
  userSelect: 'none',
  margin:     '20px',
  padding:    '20px'
}

stories.add('Paginatron', () =>
  <div>
    <div style={divStyle}>
      <b>Paginator with incrementation</b>
      <PaginatronWithIncrementor totalPages={2} onChange={action('Change handled')}/>
    </div>
    <hr />
    <div style={divStyle}>
      <b>Small List</b>
      <Paginatron currentPage={2} totalPages={2} onChange={action('Change handled')}/>
    </div>
    <hr />
    <div style={divStyle}>
      <b>Long list near beginning</b>
      <Paginatron currentPage = {2} totalPages = {151} onChange={action('Change handled')}/>
    </div>
    <hr />
    <div style={divStyle}>
      <b>Long list near end</b>
      <Paginatron currentPage = {11} totalPages = {12} onChange={action('Change handled')}/>
    </div>
    <hr />
    <div style={divStyle}>
      <b>Long list near center</b>
      <Paginatron currentPage = {30403} totalPages = {60807} onChange={action('Change handled')}/>
    </div>
    <hr />
    <div style={divStyle}>
      <b>Stupid Long list near center</b>
      <Paginatron currentPage = {30403402311542} totalPages = {60807813623984} onChange={action('Change handled')}/>
    </div>
  </div>)
