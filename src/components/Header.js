import React from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import {Avatar} from "@mui/material";
import {useDataLayerValue} from './DataLayer'
import { useState } from 'react';
import { useEffect } from 'react';
import SearchListItems from './SearchListItems';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import Footer from './Footer';


function Header({spotify , token}) {


  let color = `rgb(${Math.random()*110}, ${Math.random()*110}, ${Math.random()*110})`;
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [{user} , dispatch] = useDataLayerValue();
    function playsong(id) {

      
  
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
          
        });
    };

    function changecolor(){
      color = `rgba(${Math.random()*210}, ${Math.random()*410}, ${Math.random()*110},0.3)`;
    }

    useEffect(()=>{


      window.addEventListener('click',()=>{
        document.getElementById('searchlist').style.display = 'none'
      })
      

      if(search){
        
        spotify.searchTracks(search).then((res)=>{
          console.log(res)
          setSearchResults(res.tracks.items)
        })
        document.getElementById('searchlist').style.display = "flex"
        
      } 
      if(!token){
        return;
      }
      else{
      return (
        setSearchResults([])
      );
      }
    }, [search])
  return (
    <div className='header' id='header'>
      <div className="header_left">
        <SearchIcon />
        <input placeholder='Search for Artists, Songs, Albums' type="text" name="" id="search" value={search} onChange={e=>{
          setSearch(e.target.value);
        }} />
      </div>
      <div className="searchlist" id='searchlist'>
        <h2 className='text-yellow'>Songs - Top Results</h2>
        
        <div className="searchlist-1">
        {searchResults?.map(track  =>(<SearchListItems key={track.id} name={track?.name} url={track?.album?.images[0].url} artist = {track.artists[0].name} playsong={playsong} id={track.id} color={color} />),
        )}
        </div>
      
      </div>

      <div className="header_right">
        <Avatar src={user?.images[0]?.url} alt="user"/>
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  )
}

export default Header