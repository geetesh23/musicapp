import React from 'react'
import './sidebarOption.css'

function SidebarOptions({ title, Icon,changePlaylist, playlist_id }) {
  return (
    <div onClick={()=>{changePlaylist(playlist_id)}} className='sidebarOption'>
        {Icon && <Icon className="Icon"/>}
      {Icon ? <h4>{title}</h4>:<p>{title}</p>}
    </div>
  )
}

export default SidebarOptions
