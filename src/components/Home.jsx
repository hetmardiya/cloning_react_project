import axios from "axios";
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../style/Home.scss';

const apiKey = process.env.REACT_APP_TMDB_API;
const url = "https://api.themoviedb.org/3/movie";
const upcoming = "upcoming";
const popular = "popular";
const nowPlaying = "now_playing";
const topRated = "top_rated";
const imgUrl = "https://image.tmdb.org/t/p/original"

const Card = ({img}) => (
  <img className='card' src={img} alt="cover" />
)

const Row = ({title , arr = []})=>(
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {
        arr.map((item , index)=>(
          <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
        ))
      }
    </div>
  </div>
)


const Home = () => {


  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [PopularMovies, setPopularMovies] = useState([]);
  const [Now_Playing, setnowPlaying] = useState([]);
  const [Top_Rated, settopRated] = useState([]);
  const [Genre, setGenre] = useState([]);

  useEffect(() => {
    
    const fetchUpcoming = async () => {
      const {data : {results}} = await axios.get(`${url}/${upcoming}?api_key=${apiKey}`)
      setUpcomingMovies(results);
    }
    const fetchPopular = async () => {
      const {data : {results}} = await axios.get(`${url}/${popular}?api_key=${apiKey}`)
      setPopularMovies(results);
    }
    const fetchnowPlaying = async () => {
      const {data : {results}} = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`)
      setnowPlaying(results);
    }
    const fetchTopRated = async () => {
      const {data : {results}} = await axios.get(`${url}/${topRated}?api_key=${apiKey}`)
      settopRated(results);
    }

    const fetchGenre = async () => {
      const {data : {genres}} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      setGenre(genres);
    }
    fetchUpcoming();
    fetchPopular();
    fetchnowPlaying();
    fetchTopRated();
    fetchGenre();
  }, []);


  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage: PopularMovies[0]? `url(${`${imgUrl}/${PopularMovies[0].poster_path}`})` : "black"
      }} >
        {PopularMovies[0] && <h1>{PopularMovies[0].original_title}</h1>}
        {PopularMovies[0] && <p>{PopularMovies[0].overview}</p>}
        <div>
        <button> <FaPlay /> Play</button>
        <button> <AiOutlinePlus/> My List</button>
        </div>
      </div>

      <Row title={"Upcoming on netflix"} arr={upcomingMovies} />
      <Row title={"Popular on netflix"} arr={PopularMovies} />
      <Row title={"TV Shows"} arr={Now_Playing} />
      <Row title={"Top Rated on netflix"} arr={Top_Rated} />
      <Row title={"Recently Added"} />
      <Row title={"My List"} />

      <div className='genreBox'>
        {Genre.map((item)=>(
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>
    </section>
  )
}

export default Home
