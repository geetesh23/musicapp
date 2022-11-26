import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import { getTokenFromUrl } from './components/Infidio';
import Login from './components/Login';
import SpotifyWebApi from 'spotify-web-api-js'
import Spotify from 'spotify-web-api-js'
import Player from './components/Player';
import { useDataLayerValue } from './components/DataLayer';

const spotify = new SpotifyWebApi();

function App() {

  const [{ token }, dispatch] = useDataLayerValue();



  useEffect(() => {


    
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;
    if (_token) {


      



      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      

      


      spotify.setAccessToken(_token)

      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
        console.log(user)
      });
      // spotify.getMySavedAlbums().then(res=>{
      //   console.log(res)
      // })

      // spotify.getMySavedTracks().then(res=>{
      //   console.log(res)
      // });

      spotify.getUserPlaylists().then((_playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: _playlists,
        })
      })

      
      spotify.getPlaylist('37i9dQZEVXcBJvsVEwEJoM').then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        })
      })
      console.log(_token)
    }
  }, []);


//   spotify.getMyTopArtists().then((response) =>{
//         dispatch({
//           type: "SET_TOP_ARTISTS",
//           top_artists: response,
//         })
// });

 




  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify} token={token} />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
