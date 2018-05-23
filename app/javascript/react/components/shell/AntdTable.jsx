import { Table } from 'antd'
import styled    from 'styled-components'

const AntdTable = styled(Table)`
  & .ant-table-thead > tr > th {
    background-color: transparent;
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #eceeef;
  }

  & .ant-table-thead > tr.ant-table-row-hover > td,
  .ant-table-tbody > tr.ant-table-row-hover > td,
  .ant-table-thead > tr:hover > td,
  .ant-table-tbody > tr:hover > td {
    background-color: transparent;
  }

  & .ant-table-thead > tr:first-child > th:first-child {
    border-top-left-radius: 0;
  }

  & .ant-table-thead > tr:first-child > th:last-child {
    border-top-right-radius: 0;
  }
`

export default AntdTable
