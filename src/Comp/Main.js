import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Dashoard from './Dashoard';
import Profile from './Profile';
import SearchBar from "./Searchbar";
import Game from './Game';
import Home from './home';
export default function Main() {
  return (
    <>
    
    <Routes>
        <Route path="/dashboard" element={<Dashoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/game" element={<Game />} />
        <Route path="/" element={<Home />} />
      </Routes>
      
    </>
  )
}
