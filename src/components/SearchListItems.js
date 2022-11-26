import { Avatar, colors } from '@mui/material'
import React from 'react'
import Header from './Header'
import './SearchListItems.css'
import { motion, useAnimation } from "framer-motion";
import { useEffect } from 'react';

import { useInView } from "react-intersection-observer";

function SearchListItems({artist, url, name, playsong, id,color}) {


  const boxVariant = {
    visible: { opacity: 1,scale:1, rotate: 0 },
    hidden: { opacity: 0,scale:0, rotate:30 },
  }

  const control = useAnimation()
const [ref, inView] = useInView()
useEffect(() => {
  if (inView) {
    control.start("visible");
  } 
  else {
    control.start("hidden");
  }
}, [control, inView]);


  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      console.log(entry);
      if(entry.isIntersecting){
        entry.target.classList.add('show')
      }
      else{
        entry.target.classList.remove('show')
      }
    });
  });


  const hiddenelements = document.querySelectorAll('.hidden');
  hiddenelements.forEach((el)=>observer.observe(el));


  return (
    <motion.div
    ref={ref}
    variants={boxVariant}
  initial="hidden"
  animate={control} className='songs_list' id='song' onClick={()=>{playsong(id)}} style={{background:color}}>
      <Avatar id='img' src={url}/>
      <div className="songinfo">
        <span><strong>{name}</strong></span><br />
        <span>{artist}</span>
      </div>
    </motion.div>
  )
}

export default SearchListItems
