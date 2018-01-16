import React        from 'react'
import {observer}   from 'mobx-react'
import styled       from 'styled-components'
import { MapModal } from 'ui/shell/SmartTags'
import { FaExpand } from 'react-icons/lib/fa'
import Panel        from 'ui/shell/Panel'

function MapSection({tagStore}){
  return (
    <Panel
      className    = "my-2 pt-4"
      title        = "Map"
      titleRight   = {() => <FaExpand onClick={tagStore.toggleMap} style={{cursor: 'pointer'}} />}
      contentStyle = {{minHeight: 'auto'}}
    >
      <Img
        src       = 'https://d32ogoqmya1dw8.cloudfront.net/images/sp/library/google_earth/google_maps_hello_world.jpg'
        className = "img-fluid"
        onClick={tagStore.toggleMap}
      />
      <MapModal 
        toggle={tagStore.toggleMap}
        isOpen={tagStore.showMap} 
        src='https://developers.google.com/maps/documentation/urls/images/map-no-params.png' 
      />
    </Panel>
  )
}

const Img = styled.img`
  &:hover{
    opacity: 0.5;
    cursor: pointer;
    cursor: -webkit-zoom-in;
    cursor: zoom-in;
  }
`

export default observer(MapSection)
