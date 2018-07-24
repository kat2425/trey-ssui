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
  Row, Col, Icon, Alert
} from 'antd'


@observer
class ParentPage extends Component {
  async componentDidMount() {
    await parentStore.fetchStudents(userStore.user.id)
    this.props.history.push(`/r/students/${parentStore.currentStudent.id}/overview`)
    parentStore.fetchValidationStatus()
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
              {parentStore.validationStatus && (
                <SAlert
                  message='Unattemped Validation Questions'
                  description={
                    <p>
                      You have unattempted validation questions.
                      Click <a href='/r/validation'>here</a> to attempt those questions.
                    </p>
                  }
                  closable
                />
              )}
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
                  {renderIf(studentCardStore.isError)(
                    <Error>
                      <h3>Couldn't load Student Card</h3>
                      <p>Looks like we're having trouble loading your student's Student Card.</p>
                      <p>Try refreshing the page or try again later!</p>
                    </Error>
                  )}
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

const Error = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-text: center;
`

const SAlert = styled(Alert)`
  position: absolute;
  bottom: 0;
  left: 0;
`

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
  border: 1px solid rgb(0,0,0,.25);
  border-radius: 5px;
  overflow: auto;
`

export default observer(ParentPage)
