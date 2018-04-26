import React, { Component}                from 'react'
import { observer }                       from 'mobx-react'

import { Upload }                         from 'antd'

import {
  Table, Card, CardBlock, Button, Badge
} from 'reactstrap'

import SubmoduleHeader                    from 'ui/shell/SubmoduleHeader'
import DateFormat                         from 'helpers/DateFormat'
import studentCardStore                   from 'stores/StudentCardStore'
import PrivacyDropdown                    from './PrivacyDropdown'
import GroupModal                         from './GroupModal'

import axios                              from 'axios'
import getFile                            from 'js-file-download'

const visibilityOptions = [
  { label: 'Only Me',  visibility: 'private' }, 
  { label: 'Everyone', visibility: 'public'  },
  { label: 'Groups',   visibility: 'groups'  }
]

const AttachmentItem = observer(({ attachment }) => {
  if (!attachment['is_call_recording?']) {
    return (
      <tr>
        <td style={{width: 70}}><div style={thumbnailStyle(attachment.thumbnail)}/></td>
        <td><strong>{ attachment.filename }</strong></td>
        <td className='text-right text-muted'>{ bytesToSize(attachment.size) }</td>
        <td>{ DateFormat.timeAgo(attachment.created_at) }</td>

        <td>
          { attachment.groups.map(g => 
            <Badge key={g.id} color='info' className='mr-1'>{g.group_name}</Badge>
          )}
        </td>

        <td className='text-right'>
          <PrivacyDropdown 
            labelKey     = 'label'
            valueKey     = 'visibility'
            onSelect     = {changeAttachmentVisibility(attachment)}
            isModifiable = {attachment.modifiable}  
            options      = {visibilityOptions}
            visibility   = {attachment.visibility}
            attachment   = {attachment}
            store        = {studentCardStore}
          />

          <Button
            size      = 'sm'
            className = 'ml-1'
            color     = 'danger'
            style     = {{height: 28}}
            hidden    = {!attachment.modifiable}
            title     = 'Delete'
            onClick   = {() => deleteAttachment(attachment.id)}
          >
            <span className='icon icon-trash'/>
          </Button>

          <Button
            size      = 'sm'
            className = 'ml-1'
            color     = 'success'
            style     = {{height: 28}}
            title     = 'Download File'
            onClick   = {() => downloadFile(attachment.public_url, attachment.filename)}
          >
            <span className='icon icon-download'/>
          </Button>
        </td>
      </tr>
    )
  } else {
    return null
  }
})

@observer
export default class Attachments extends Component {
  constructor(props) {
    super(props)
  }

  renderList(attachments) {
    return (
      <tbody>
        { attachments.map(a => <AttachmentItem key={a.id} attachment={a}/>) }
      </tbody>
    )
  }

  uploadFile = ({ file }) => {
    studentCardStore.uploadFile(file.name, file)
  }

  render() {
    return (
      <div>
        <SubmoduleHeader title='Attachments'>
          <Upload customRequest={this.uploadFile} showUploadList={false}>
            <Button className='mr-3' size='sm' style={{height: 30}}>
              <span className='icon icon-upload-to-cloud mr-2'/>
              Upload
            </Button>
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
              {studentCardStore.showGroupsModal && <GroupModal store={studentCardStore} />}
              { this.renderList(this.props.attachments) }
            </Table>
          </CardBlock>
        </Card>
      </div>
    )
  }
}

const changeAttachmentVisibility = (attachment) => (newPrivacy) => {
  if(newPrivacy === 'groups'){
    studentCardStore.setShowGroupsModal(true)
    return
  }

  if (attachment.visibility !== newPrivacy) {
    studentCardStore.changeAttachmentVisibility(attachment.id, newPrivacy)
  }
}

function bytesToSize(bytes) {
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) return 'n/a'

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function downloadFile(url, filename) {
  axios.get(url, { responseType: 'blob' }).then((res) => getFile(res.data, filename))
}

function deleteAttachment(attachmentID) {
  if (confirm('Are you sure you want to remove this file?')) {
    studentCardStore.deleteAttachment(attachmentID)
  }
}

function thumbnailStyle(thumbnail) {
  return (
    {
      background:       `url("${thumbnail}") no-repeat center`,
      backgroundOrigin: 'content-box',
      backgroundSize:   'contain',
      height:           '64px',
      width:            '54px',
      padding:          2,
      margin:           '0 auto',
      border:           '1px solid #cacaca',
      boxShadow:        '0 1px 1px rgba(0,0,0,0.15)'
    }
  )
}
