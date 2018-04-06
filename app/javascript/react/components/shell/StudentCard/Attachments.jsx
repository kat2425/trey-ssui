import React, { Component}                from 'react'
import { observer }                       from 'mobx-react'

import { Upload }                         from 'antd'
import { Table, Card, CardBlock, Button } from 'reactstrap'

import SubmoduleHeader                    from 'ui/shell/SubmoduleHeader'
import DateFormat                         from 'helpers/DateFormat'
import StudentCardStore                   from 'stores/StudentCard'

import axios                              from 'axios'
import getFile                            from 'js-file-download'

const AttachmentItem = observer(({ attachment }) => {
  const bytesToSize = (bytes) => {
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB']

    if (bytes === 0) return 'n/a'

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
  }

  const downloadFile = (url, filename) => {
    axios.get(url).then((res) => getFile(res.data, filename))
  }

  const thumbnailStyle = {
    background:       `url("${attachment.thumbnail}") no-repeat center`,
    backgroundOrigin: 'content-box',
    backgroundSize:   'contain',
    height:           '64px',
    width:            '54px',
    padding:          2,
    margin:           '0 auto',
    border:           '1px solid #cacaca',
    boxShadow:        '0 1px 1px rgba(0,0,0,0.15)'
  }

  if (!attachment['is_call_recording?']) {
    return (
      <tr className='cursor-pointer' onClick={() => downloadFile(attachment.public_url, attachment.filename)}>
        <td style={{width: 70}}><div style={thumbnailStyle}/></td>
        <td><strong>{ attachment.filename }</strong></td>
        <td className='text-right text-muted'>{ bytesToSize(attachment.size) }</td>
        <td>{ DateFormat.timeAgo(attachment.created_at) }</td>
        <td></td>

        <td className='text-right'>
          <Button
            size = 'sm'
            hidden = {!(attachment.visibility === 'private')}
          >
            <span className='icon icon-lock'/>
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
    StudentCardStore.uploadFile(file.name, file)
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
                  <td className='border-0'><strong></strong></td>
                  <td className='border-0 text-right'></td>
                </tr>
              </thead>

              { this.renderList(this.props.attachments) }
            </Table>
          </CardBlock>
        </Card>
      </div>
    )
  }
}
