import styled     from 'styled-components'
import { Upload } from 'antd'

const Dragger = styled(Upload.Dragger)`
  display: flex;
  flex-flow: column nowrap;

  & .ant-upload-list {
    display: flex;
  }

  & .ant-upload-list-item {
    width: auto;
    max-width: 100%;
    margin-right: 8px;
    background-color: #f0fcff;
  }

  & .ant-upload-list-item-info {
    margin-right: 20px;
  }
`

export default Dragger
