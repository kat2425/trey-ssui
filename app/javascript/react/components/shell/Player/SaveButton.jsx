import React              from 'react'
import styled             from 'styled-components'
import { MdFileDownload } from 'react-icons/lib/md'
import { prop }           from 'styled-tools'

const SaveButton = ({src, size}) => {
  return (
    <a href={src}>
      <Save size={size} />
    </a>
  )
}

const getStyledIcon = (Icon) => styled(Icon)`
 width: ${prop('size', '26px')};
 height: ${prop('size', '26px')};
 margin-left: 15px;

 cursor: pointer; 
 color: #505050;
 &:hover{
  opacity: 0.9;
 }
`

const Save = getStyledIcon(MdFileDownload)

export default SaveButton
