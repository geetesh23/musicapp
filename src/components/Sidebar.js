import React from 'react';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SidebarOptions from './SidebarOptions';
import {useDataLayerValue} from './DataLayer'
import Body from './Body';

function Sidebar({spotify}) {

    const ChangeToLibrary = () =>{
      
    }

    const [{ playlists }, dispatch] = useDataLayerValue();
    const changePlaylist = (id)=>{
      let x = Math.random()*105;
    let y = Math.random()*100;
    let z = Math.random()*108;

    document.getElementById('body').style.background = `linear-gradient(rgb(${x}, ${y}, ${z}) 30%, rgba(0,0,0,1))`;
      console.log('clicked')
      spotify.getPlaylist(id).then((response) =>{
        dispatch({
          type:'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        })
      })

    }

  return (
    <div className='sidebar'>
        <div className="logo">
            <img src="https://www.logo.wine/a/logo/Beats_Music/Beats_Music-Logo.wine.svg" alt="" />
            <span>Infidio</span>
        </div>
        <SidebarOptions Icon={HomeIcon}  title="Home" />
        <SidebarOptions Icon={SearchIcon} title="Search" />
        <SidebarOptions Icon={LibraryMusicOutlinedIcon} onclick={ChangeToLibrary} title="Your Library" />
        <br />
        <strong className='playlistTitle'>Playlists</strong>
        <hr />

        <div className="playlistItems">
            {playlists?.items?.map(playlist =>(<SidebarOptions key={playlist.id} playlist_id={playlist.id} changePlaylist={changePlaylist} title={playlist.name} />))}
        </div>
    </div>
  )
}

export default Sidebar;
