import React, { Component }   from 'react'
import ModuleHeader           from 'ui/shell/ModuleHeader'
import RGL, { WidthProvider } from 'react-grid-layout'
import { toJS }               from 'mobx'
import { observer }           from 'mobx-react'
import seatingChartStore      from 'stores/seatingChartStore'
import ItemWrapper            from './ItemWrapper'
import userStore              from 'stores/UserStore'
import styled                 from 'styled-components'
import _isEmpty               from 'lodash/isEmpty'
import { NavLink }            from 'react-router-dom'
import renderIf               from 'ui/hoc/renderIf'

import {
  Icon,
  Spin
} from 'antd'

import {
  Card, CardBlock
} from 'reactstrap'

//Breaks antd when placed in its own component
const StudentAvatar = styled.div`
  background:       #ababab 50% 50% no-repeat;
  background-image: url(https://api.schoolstatus.com/avatars/student/${props => props.id}.png);
  width:            ${props => props.size || '30px'};
  height:           ${props => props.size || '30px'};
  background-size:  ${props => props.size || '30px'};
  border-radius:    500px;

  @media print {
    content:         url(https://api.schoolstatus.com/avatars/student/${props => props.id}.png);
    width:           ${props => props.size || '30px'};
    height:          ${props => props.size || '30px'};
    background-size: contain;
    border-radius:   500px;
  }
`

const antIcon =
  <Icon
    type='loading'
    spin
    style={{
      fontSize:   24,
      marginLeft: 8,
    }}
  />

const ReactGridLayout = WidthProvider(RGL)
const _ReactGridLayout = renderIf(ReactGridLayout)

@observer
export default class SeatingChart extends Component {
  hasDragged = false

  constructor(props) {
    super(props)

    const _currentYear = userStore.user.currentSchoolYear.toString()

    this.state = {
      params: {
        school_year: [_currentYear ]
      },
      selected: {
        school_year: { selected: true, label: _currentYear , value: _currentYear }
      }
    }
  }

  componentDidMount = () => {
    this.setInitialOptions()
  }

  setInitialOptions = () => {
    const {
<<<<<<< HEAD
      fetchCourseName,
=======
>>>>>>> feat: add seating chart
      fetchCourseStudents,
      setSelectedCourse
    } = seatingChartStore

    const course_id = this.props.match.params.course_id

    setSelectedCourse(course_id)
    fetchCourseStudents(course_id)
<<<<<<< HEAD
    fetchCourseName(course_id)
=======

>>>>>>> feat: add seating chart

    this.setState({
      selected: { ...this.state.selected, course_id }
    })
  }

  setCourseFilter = (val) => {
    const {
      fetchCourseStudents,
      setSelectedCourse
    } = seatingChartStore

    const { history } = this.props
    const jrsValue = val ? val.value : '~NOTHING~'

    val && setSelectedCourse(val.value)
    val && fetchCourseStudents(val.value)

    this.setState({
      params:   {...this.state.params, course_id: [jrsValue] },
      selected: { ...this.state.selected, course_id: val }
    })

    //val.value only exists after initial load
    history.push(`/r/seating_chart/${val.value}`)
    this.hasDragged = false
  }

  renderLayoutItem = (e) => {
    return (
      <ItemWrapper key={e.id}>
        <StudentAvatar id={e.id} />
        <p>{e.full_name}</p>
      </ItemWrapper>
    )
  }

  renderStudents = () => {
    const { courseStudents } = seatingChartStore

    if (courseStudents) {
      return courseStudents.map((e) =>
        this.renderLayoutItem(e)
      )
    }
    return null
  }

  renderLayout = () => {
    const { isFetchingLayout, isFetchingStudents, layout } = seatingChartStore

    if (isFetchingLayout || isFetchingStudents) {
      return null
    }

    return (
      <div ref={el => (this.componentRef = el)}>
        <_ReactGridLayout
          onDragStart    = {this.setDragged}
          layout         = {toJS(layout)}
          isResizable
          onLayoutChange = {this.onLayoutChange}
          compactType    = {null}
          className      = 'layout'
          cols           = {12}
          rowHeight      = {30}
          renderIf       = {this.state.selected.course_id && this.state.selected.teacher_id}
        >
          {this.renderStudents()}
        </_ReactGridLayout>
      </div>
    )
  }

  setDragged = () => {
    this.hasDragged = true
  }

  onLayoutChange = (layout) => {
    const { updateSeatingChart, selectedCourse } = seatingChartStore

    this.hasDragged && updateSeatingChart(selectedCourse, layout)
  }

<<<<<<< HEAD
  getCourseName = () => {
    const {
      courseName,
      coursePeriod,
      layout
    } = seatingChartStore

    if(!courseName) return null

    const _coursePeriod = coursePeriod ? `(${coursePeriod})` : null

    return `${courseName} ${_coursePeriod}`
  }

  render() {
    const {
      courseName,
      coursePeriod,
=======
  render() {
    const {
      isFetchingLayout,
      isFetchingStudents,
      isFetchingCourses,
>>>>>>> feat: add seating chart
      layout
    } = seatingChartStore

    return (
      <div>
        <ModuleHeader title='Seating Chart'>
          <NavLink
            className = 'pr-4 pl-4 p-1'
            to        = {'/r/my_students'}
          >
            <Icon type='arrow-left'/> Back to My Students
          </NavLink>
        </ModuleHeader>

<<<<<<< HEAD
        <Card>
          <CardBlock>
            <h5 className='mb-2'>{this.getCourseName()}</h5>
=======
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <ReactToPrint
            trigger={() =>
              <Icon
                type      = "printer"
                className = 'ml-2'
                style     = {{
                  fontSize: 24,
                  color:    '#08c',
                  cursor:   'pointer'
                }}
              />
            }
            content={() => this.componentRef}
          />
          <Spin
            indicator={antIcon}
            spinning={
              isFetchingLayout
              || isFetchingStudents
              || isFetchingCourses
            }
          />
        </div>

        <div className='clearfix'>
        </div>

        <Card>
          <CardBlock>
            <h5>Name of Class</h5>
>>>>>>> feat: add seating chart

            {!_isEmpty(layout) && this.renderLayout()}
          </CardBlock>
        </Card>
      </div>
    )
  }
}
