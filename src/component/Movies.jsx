import React, { Fragment, useEffect, useState, useContext, } from 'react'
import axios from 'axios'
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai'
import { Container } from './Navbar'
import NoImg from '../img/Noimage.jpg'
import '../styles/Video.css'
import TrailerMovies from '../trailers/TrailerMovies'

function Movies() {
    const { toggle, inputValue } = useContext(Container)
    const input = inputValue              //avariable input value movie name 
    const [moviesData, setMoviesData] = useState([])
    const [trailer, setTrailer] = useState(true)
    const [movieTitle, setMovieTitle] = useState('')
    const Shown = input ? 'search' : 'discover'
    const Api = `https://api.themoviedb.org/3/${Shown}/movie`
    const Images = 'https://image.tmdb.org/t/p/w500'

    // call api imdb
    const MovieCall = async () => {
        const data = await axios.get(Api, {
            params: {
                api_key: 'eb57ca9006b2af8d8539e85f3ff6ae90',
                query: input
            }
        })
        const results = data.data.results
        setMoviesData(results)
    }
    useEffect(() => {      //input search call movie name
        setTimeout(() => {
        MovieCall()
        }, 100)
        
    }, [input])
    const MoviesTitle = (movie) => {
        setMovieTitle(movie.title)
        setTrailer(!trailer)
    }
    return (
        <Fragment>
            <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
                <div className='movies-container'>
                    {moviesData.map((movie) => {
                        return (
                            <Fragment>

                                <div id={trailer ? 'container' : 'NoContainer'}>
                                    <AiFillPlayCircle color='green' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => MoviesTitle(movie)} />
                                    <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt='' onClick={() => MoviesTitle(movie)} />
                                    <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'} >{movie.title}</h3>
                                </div>
                            </Fragment>
                        )
                    })}
                    {trailer ? console.log : <TrailerMovies  moviesTitle={movieTitle} toggle={toggle}/>}
                    <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color="#fff" cursor={'pointer'} onClick={() => setTrailer(true)} />
                </div>
            </div>
        </Fragment>
    )
}

export default Movies