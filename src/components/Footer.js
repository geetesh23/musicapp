import React, {useEffect, useState} from 'react'
import './Footer.css'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import { Grid, Slider } from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { useDataLayerValue } from './DataLayer';
import SpotifyPlayer from 'react-spotify-web-playback/lib';


function Footer({spotify , token}) {

  const [{ item, playing }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (!playing) {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    } else {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing:false,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
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
  });
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
  });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
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
    });
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  };


  return (
    // <SpotifyPlayer token={token}/>
    <div className='footer' id='footer'>
      <div className="footer_left">
        <img className='footer_albumLogo' src={item?.album.images[0].url} alt="" />
        
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer_center">
        <ShuffleRoundedIcon className='footer_purple' fontSize='small' />
        <SkipPreviousRoundedIcon onClick={skipPrevious} className='footer_white'fontSize='medium' />
        {playing ? (
          <PauseCircleOutlineOutlinedIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer_white"
          />
        ) : (
          <PlayCircleOutlinedIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer_white"
          />
        )}
        <SkipNextRoundedIcon onClick={skipNext} className='footer_white'fontSize='medium' />
        <RepeatRoundedIcon className='footer_purple' fontSize='small'/>
      </div>

      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon/>
          </Grid>
          <Grid item>
            <VolumeUpRoundedIcon/>
          </Grid>
          <Grid item xs>
          <Slider aria-labelledby="continuous-slider" aria-valuetext='auto' valueLabelDisplay='auto' />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Footer
