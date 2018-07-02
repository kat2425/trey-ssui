import React, { Component }   from 'react'
import LoadingSpinner         from 'ui/shell/LoadingSpinner'
import SideNav                from './SideNav'
import StudentCardController  from 'ui/controllers/StudentCardController'
import VJSContainer           from 'ui/vjs/VJSContainer'
import NavBar                 from '../NavBar'
import parentStore            from 'stores/ParentHomePageStore'
import userStore              from 'stores/UserStore'
import renderIf               from 'render-if'
import studentCardStore       from 'stores/StudentCardStore'
import styled                 from 'styled-components'
import { Route }              from 'react-router-dom'
import { observer }           from 'mobx-react'

import {
  Row, Col, Icon
} from 'antd'


@observer
class ParentPage extends Component {
  async componentDidMount() {
    await parentStore.fetchStudents(userStore.user.id)
    this.props.history.push(`/r/students/${parentStore.currentStudent.id}/overview`)
  }

  handleHideList = () => {
    parentStore.setToggleStudentList(!parentStore.toggleStudentList)
  }

  render() {
    return (
      <VJSContainer className='h-100'>
        <NavBar />
        <Row className='h-100 w-100 mt-2'>
          {renderIf(parentStore.toggleStudentList)(
            <Col span={4} className='h-100'>
              <SideNav store={parentStore}/>
            </Col>
          )}
          <Col 
            span={parentStore.toggleStudentList ? 20 : 24}
            className='h-100 pt-2'
          >
            <Row>
              <ToggleIcon 
                type={`menu-${parentStore.toggleStudentList ? 'fold' : 'unfold'}`}
                onClick={this.handleHideList}
              />
            </Row>
            <Row
              className='h-100'
              style={{marginTop: '10px'}}
            >
              <Col span={24}>
                <Wrapper>
                  {renderIf(studentCardStore.isLoading)(<LoadingSpinner center/>)}
                  <Route 
                    path='/r/students/:studentId'
                    render={() => <StudentCardController embedded />}
                  />
                </Wrapper>
              </Col>
            </Row>
          </Col>
        </Row>
      </VJSContainer>
    )
  }
}

const ToggleIcon = styled(Icon)`
  margin-left: 10px;
  cursor: pointer;
`

const Wrapper = styled.div`
  height: 100%;
  max-height: calc(100vh - 87px);
  margin-left: 10px;
  margin-right: 10px;
  padding: 15px;
  background-color: white;
  outline: 1px solid rgb(0,0,0,.25);
  overflow: auto;
`

export default observer(ParentPage)
