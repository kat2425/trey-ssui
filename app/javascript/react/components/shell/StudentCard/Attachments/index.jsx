import React, { Component}         from 'react'
import { observer }                from 'mobx-react'

import { Upload }                  from 'antd'

import {  Table, Card, CardBlock } from 'reactstrap'

import SubmoduleHeader             from 'ui/shell/SubmoduleHeader'
import attachmentStore             from 'stores/AttachmentStore'
import GroupModal                  from './GroupModal'
import SSButton                    from 'ui/shell/SSButton'
import LoadingSpinner              from 'ui/shell/LoadingSpinner'
import AttachmentItem              from './AttachmentItem'

@observer
export default class Attachments extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    attachmentStore.fetchAttachments(this.props.student.id)
  }

  uploadFile = ({ file }) => {
    attachmentStore.uploadFile(this.props.student.id, file.name, file)
  }

  renderList() {
    return (
      <tbody>
        { attachmentStore.orderedAttachments.map(a => {
          return <AttachmentItem student={this.props.student.id} key={a.id} attachment={a}/>
        })}
      </tbody>
    )
  }

  render() {
    return (
      <div>
        <SubmoduleHeader title='Attachments'>
          <Upload customRequest={this.uploadFile} showUploadList={false}>
            <SSButton
              className='mr-3'
              iconClass='icon icon-upload-to-cloud mr-2'
              loading = { attachmentStore.isUploading }
              disabled = { attachmentStore.isLoading }
              size='sm'
              style={{height: 30}}
            >
              Upload
            </SSButton>
          </Upload>
        </SubmoduleHeader>

        <Card>
          <CardBlock className='p-0'>
            <Table>
              <thead>
                <tr>
                  <td className='border-0'></td>
                  <td className='border-0'><strong>Filename</strong></td>
                  <td className='border-0 text-right'><strong>Size</strong></td>
                  <td className='border-0'><strong>Created</strong></td>
                  <td className='border-0'><strong>Groups</strong></td>
                  <td className='border-0 text-right'></td>
                </tr>
              </thead>
              { attachmentStore.showGroupsModal &&
                  <GroupModal attachment={attachmentStore.selectedAttachment} /> 
              }
              { this.renderList() }
            </Table>
            { attachmentStore.isLoading && <LoadingSpinner center /> }
          </CardBlock>
        </Card>
      </div>
    )
  }
}
