import React        from 'react'
import PropTypes    from 'prop-types'
import _isEmpty     from 'lodash/isEmpty'
import { Tag }      from 'antd' 
import { observer } from 'mobx-react'
import renderIf     from 'render-if'

NoteInfo.propTypes = {
  note: PropTypes.object.isRequired
}

function NoteInfo({note}){
  if(_isEmpty(note)) return null

  return (
    <div className='mt-4'>
      {note.hasTags && 
        <div className='mb-3'>
          <strong>Tags: </strong> 
          {note.tags.map((t) => <Tag key={t.id}>{t.name}</Tag>)}
        </div>
      }
      <div><strong>Visible to:</strong> {getVisibleTo(note)}</div>
    </div>
  )
}

function getVisibleTo(note){
  return (
    <span>
      {renderIf(note.isGlobal)(<span><Tag key='2'>Everyone</Tag></span>)}
      {renderIf(note.hasGroups)(<span>{note.groups.map((g) => <Tag key={g.id}>{g.group_name}</Tag>)}</span>)}
      {renderIf(!note.hasGroups && !note.isGlobal)(<span><Tag key='1'>Just Me</Tag></span>)}
    </span>
  )
}

export default observer(NoteInfo)