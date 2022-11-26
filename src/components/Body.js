import React from 'react'
import './Body.css';
import Header from './Header'
import {useDataLayerValue} from './DataLayer'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SongRow from './SongRow';


function Body({ spotify, token }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();


  const playPlaylist = (id) => {
  

    spotify
      .play({
        context_uri: `spotify:playlist:${id}`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  function playSong(id) {

    document.getElementById('body').style.backgroundImage = 'linear-gradient(rgb(12, 12, 12) , rgba(0,0,0,1));';

    spotify.getMyCurrentPlayingTrack().then((r)=>{
      console.log(r)
    })
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
        });
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
        })
      });
  };

  if(discover_weekly?.images[0]){
    return (
      <div className='body' id = "body">
        <Header spotify={spotify} token ={token}/>
  
        <div className="body_info">
          <img src={discover_weekly?.images[0].url} alt="" />
          <div className="body_infoText">
            <strong>PLAYLIST</strong>
            <h2>{discover_weekly?.name}</h2>
            <p>{discover_weekly?.description}</p>
          </div>
        </div>
  
        <div className="body_songs">
          <div className="body_icons">
            <PlayCircleFilledRoundedIcon onClick={()=>{playPlaylist(discover_weekly?.id)}} className='body_shuffle' fontSize='large' />
            <FavoriteBorderRoundedIcon fontSize='large' className='favorite' />
            <MoreHorizRoundedIcon fontSize='large'/>
          </div>
  
          {discover_weekly?.tracks.items.map((item) => (
            <SongRow key={item.track.id} track={item.track} playSong={playSong} />
          ))}
        </div>
      </div>
    )
  }
else{
  return (
    <div className='body' id='body'>
      <Header spotify={spotify} />

      <div className="body_info">
        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" />
        <div className="body_infoText">
          <strong>PLAYLIST</strong>
          <h2>{discover_weekly?.name}</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledRoundedIcon onClick={playPlaylist} className='body_shuffle' fontSize='large' />
          <FavoriteBorderRoundedIcon fontSize='large' className='favorite' />
          <MoreHorizRoundedIcon fontSize='large'/>
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow key={item.track.id} track={item.track} playSong={playSong} />
        ))}
      </div>
    </div>
  )
        }
}

export default Body
