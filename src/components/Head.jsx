import React from 'react';
import { MdScreenSearchDesktop } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from '../style/img/netflix_logo.png';
const Head = () => {
  return (
    <nav className='header'>
        <img src={logo} alt="" />
        <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recently">Recently Added</Link>
        <Link to="/mylist">My List</Link>
        </div>
        <MdScreenSearchDesktop/>
    </nav>
  ) 
}

export default Head