import React           from 'react'
import { observer }    from 'mobx-react'
import SubmoduleHeader from 'ui/shell/SubmoduleHeader'
import renderIf        from 'ui/hoc/renderIf'
import Courses         from './Courses'

import {
  Card, CardBlock
} from 'reactstrap'


const badgeStyle = {
  margin: 20
}
// '#ecf3fb'
const valueStyle = (color) => {
  return {
    backgroundColor: `${color}`,
    display:         'table-cell',
    textAlign:       'center',
    verticalAlign:   'middle',
    borderRadius:    '50%',
    border:          '2px solid rgba(0,0,0,0.055)',
    fontSize:        '22px',
    height:          '85px',
    width:           '85px',
    textShadow:      '0 1px rgba(255,255,255, 0.65)'
  }
}

const textStyle = {
  textAlign: 'center',
  fontSize:  '12px',
  marginTop: '10px',
}

const OverviewBadge = ({color, title, value}) => {
  return (
    <div style={ badgeStyle }>
      <div style={ valueStyle(color) }>{ value }</div>
      <p style={ textStyle }>{ title }</p>
    </div>
  )
}

const Overview = ({student, overview, higherEd}) => {
  const EOverviewBadge = renderIf(OverviewBadge)

  return (
    <div>
      <SubmoduleHeader title='Overview' />

      <Card>
        <CardBlock>
          <div className='row justify-content-center'>
            <EOverviewBadge
              color = '#ecf3fb'
              title    = 'absences'
              value    = { overview.absence_count }
              renderIf = {!higherEd}
            />

            <EOverviewBadge
              color = '#fbf8ec'
              title    = 'infractions'
              value    = { overview.infractions }
              renderIf = {!higherEd}
            />

            <OverviewBadge color='#daefbd' title='calls completed' value={ overview.calls_completed } />
            <OverviewBadge color='#c4e0f2' title='texts (sent)' value={ overview.sms_outgoing } />
            <OverviewBadge color='#a3c8e6' title='texts (received)' value={ overview.sms_incoming} />
            <OverviewBadge color='#ead9f2' title='emails' value={ overview.emails } />
          </div>
        </CardBlock>
      </Card>

      <SubmoduleHeader title='Schedule' />
      <Courses student={student} higherEd={higherEd} />
    </div>
  )
}

Overview.defaultProps = {}
Overview.propTypes = {}

export default observer(Overview)
