import React from 'react';
import './Login.css';
import './logo.png';
import {loginUrl} from './Infidio';

function Login() {
  return (
    <div className='login'>
      {/* Infidio Logo */}
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="" />
      {/* Login Using Spotify */}
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login
