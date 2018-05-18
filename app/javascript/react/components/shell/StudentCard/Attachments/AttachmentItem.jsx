import React           from 'react'
import { observer }    from 'mobx-react'
import {  Badge }      from 'reactstrap'
import DateFormat      from 'helpers/DateFormat'
import attachmentStore from 'stores/AttachmentStore'
import PrivacyDropdown from './PrivacyDropdown'
import SSButton        from 'ui/shell/SSButton'
import { Popconfirm }  from 'antd'


const AttachmentItem = ({ attachment }) => {
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

      <td 
        className = 'text-right d-flex align-items-center justify-content-end'
        style     = {{minWidth: 161}}
      >
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

const visibilityOptions = [
  { label: 'Only Me',  visibility: 'private' },
  { label: 'Everyone', visibility: 'public'  },
  { label: 'Groups',   visibility: 'groups'  }
]

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

export default observer(AttachmentItem)
