import React from 'react'
import Body from './Body';
import Footer from './Footer';
import './Player.css';
import Sidebar from './Sidebar';
import SpotifyPlayer from 'react-spotify-web-playback';


function Player({ spotify, token }) {
  return (
    <div className='player'>
        <div className="player_body">
            {/* sidebar */}
            <Sidebar spotify={spotify}/>
            {/* body */}
            <Body spotify={spotify} token={token}/>
        </div>

      {/* footer */}
      
      <Footer spotify={spotify} token={token}/>
    </div>
  )
}

export default Player
