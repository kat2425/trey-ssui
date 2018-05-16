import React, { Component}                from 'react'
import { observer }                       from 'mobx-react'

import { Upload }                         from 'antd'

import {  Table, Card, CardBlock, Badge
} from 'reactstrap'

import SubmoduleHeader                    from 'ui/shell/SubmoduleHeader'
import DateFormat                         from 'helpers/DateFormat'
import attachmentStore                    from 'stores/AttachmentStore'
import PrivacyDropdown                    from './PrivacyDropdown'
import GroupModal                         from './GroupModal'
import SSButton                           from 'ui/shell/SSButton'
import { Popconfirm }                     from 'antd'


const visibilityOptions = [
  { label: 'Only Me',  visibility: 'private' },
  { label: 'Everyone', visibility: 'public'  },
  { label: 'Groups',   visibility: 'groups'  }
]

const AttachmentItem = observer(({ attachment }) => {
  if (attachment.isRecording) return null

  return (
    <tr>
      <td style={{width: 70}}><div style={thumbnailStyle(attachment.thumbnail)}/></td>
      <td><strong>{ attachment.filename }</strong></td>
      <td className='text-right text-muted'>{ attachment.humanSize }</td>
      <td>{ DateFormat.timeAgo(attachment.createdAt) }</td>

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
          store        = {attachmentStore}
        />

        <Popconfirm
          title      = 'Are you sure you want to delete this attachment?'
          onConfirm  = { attachment.deleteAttachment }
          okText     = 'Delete'
          cancelText = 'Cancel'
        >
          <SSButton
            size      = 'sm'
            className = 'ml-1'
            iconClass = 'icon icon-trash'
            loading   = { attachment.isDeleting }
            disabled  = { attachment.isLoading || attachment.isDownloading}
            color     = 'danger'
            style     = {{height: 28}}
            hidden    = {!attachment.modifiable}
            title     = 'Delete'
          >
          </SSButton>
        </Popconfirm>

        <SSButton
          size      = 'sm'
          iconClass = 'icon icon-download'
          loading   = { attachment.isDownloading }
          disabled  = { attachment.isDeleting || attachment.isLoading }
          className = 'ml-1'
          color     = 'success'
          style     = {{height: 28}}
          title     = 'Download File'
          onClick   = { attachment.downloadFile }
        >
        </SSButton>
      </td>
    </tr>
  )
})

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
                <GroupModal attachment={attachmentStore.selectedAttachment} /> }
              { this.renderList() }
            </Table>
          </CardBlock>
        </Card>
      </div>
    )
  }
}

const changeAttachmentVisibility = (attachment) => (newPrivacy) => {
  if(newPrivacy === 'groups'){
    attachmentStore.setSelectedAttachment(attachment)
    attachmentStore.setShowGroupsModal(true)
    return
  }

  if (attachment.visibility !== newPrivacy) {
    attachment.visibility = newPrivacy
    attachment.changeVisibility(newPrivacy)
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
