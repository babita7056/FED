//import React from 'react'
//random number---
// import LearnJSX from "./components/LearnJSX"
// //LearnJsx:
// function App(){
//   return <div>
//     <LearnJSX/>
//     </div>
// }
// export default App
//shopping-----

// import ShoppingList from './component/shoppingList/ShoppingList'

// function App(){
//   return ( 
//     <div>
//       <ShoppingList/>
//     </div>

//   )
// }

// export default App
//person------
// import React from 'react'
// import Person from './component/Person'
// const App = () => {
//   return (
//     <div>
//      <Person name ="Ram" age = "20" favcolor ="Yellow"/>
//      <Person name ="Yash" age = "21" favcolor ="Red"/>
//      <Person name ="Shyam" age = "22" favcolor ="Green"/>
//      <Person name ="Mayank" age = "23" favcolor ="Blue"/>
//     </div>
//   )
// }
//import React from 'react'
// import Projects from './component/projects/Project'


// function App() {
//   return (
//     <div>
//       <Projects/>
//     </div>
//   )
// }

// import React from 'react'
// import StateDemo from './component/StateDemo'

// function App() {
//   return (
//     <div>
//       <StateDemo/>
//     </div>
//   )
// }

// export default App
//import { load } from 'cheerio/lib/api/attributes';
// import { load } from 'cheerio';
// import React, { useState } from 'react';
// import './App.css';
// // import Navbar from './Components/Navbar';
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import Album from './Components/Album';
// import Home from './component/Home';
// import Music from './component/Music';
// export const MediaContext = React.createContext();

// function App() {
//   const [media, setMedia] = useState(JSON.parse(localStorage.getItem('patalu')) || ['https://aac.saavncdn.com/772/7d120511a717125960545ff982ed6d55_320.mp4']);
//   const value = {
//     media: media,
//     set : set
//   }
  
//   function set(data){
//     if(media[0] === data) return;
//     let media1 = media;
//     media.unshift(data);
//     setMedia(media1);
//     console.log(media1);
//     localStorage.setItem('patalu', JSON.stringify(media));
//     window.location.reload(false)
//   }

//   return (
//     <>
//       {/* <Router>
//         <Album/>
//         <Routes>
//           <Route path='/' element={<Album />} />
//           <Route path='/song' element={<Album />} />
//           <Route path='/album' element={<Album />} />
//           <Route path='/playlist' element={<Album />} />
//           <Route path='/trending' element={<Album />} />
//         </Routes>
//       </Router> */}
//       <>
//         <MediaContext.Provider value={value}>
//           <Home />
//           <Music />
//         </MediaContext.Provider>
//         {/* <Album /> */}
//       </>
//     </>
//   );
// }

// export default App;
// /*import react,{useState} from 'react'
// const App=()=>{
//   const [count]
// }



// */
// App.js
// import React, { useEffect } from "react";
// import Login from "./components/Login";
// import Spotify from "./components/Spotify";
// import { reducerCases } from "./utils/Constants";
// import { useStateProvider } from "./utils/StateProvider";
// export default function App() {
//   const [{ token }, dispatch] = useStateProvider();
//   useEffect(() => {
//     const hash = window.location.hash;
//     if (hash) {
//       const token = hash.substring(1).split("&")[0].split("=")[1];
//       if (token) {
//         dispatch({ type: reducerCases.SET_TOKEN, token });
//       }
//     }
//     document.title = "Spotify";
//   }, [dispatch, token]);
//   return <div>{token ? <Spotify /> : <Login />}</div>;
// }Remove-Item -Recurse node_modules -Force
// // Remove-Item package-lock.json -Force
// // npm install
// // 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import MusicContext from "./context/MusicContext";
import { useEffect, useState } from "react";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchedSongs, setSearchedSongs] = useState([]);

  const playMusic = async (
    music,
    name,
    duration,
    image,
    id,
    primaryArtists
  ) => {
    if (currentSong && currentSong.id === id) {
      if (isPlaying) {
        setIsplaying(false);
        currentSong.audio.pause();
      } else {
        setIsplaying(true);
        await currentSong.audio.play();
      }
    } else {
      if (currentSong) {
        currentSong.audio.pause();
        setIsplaying(false);
      }
      const newAudio = new Audio(music[4].link);
      setCurrentSong({
        name,
        duration,
        image: image[2].link,
        id,
        audio: newAudio,
        primaryArtists,
      });
      setIsplaying(true);
      console.log(currentSong);
      await newAudio.play();
    }
  };

  const nextSong = () => {
    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);
      if (index === songs.length - 1) {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[0];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      } else {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[index + 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      }
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);
      if (index === 0) {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[songs.length - 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      } else {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[index - 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        setSongs,
        playMusic,
        isPlaying,
        currentSong,
        nextSong,
        prevSong,
        setSearchedSongs,
        searchedSongs,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums/:id" element={<AlbumDetails />} />
        </Routes>
      </BrowserRouter>
    </MusicContext.Provider>
  );
}