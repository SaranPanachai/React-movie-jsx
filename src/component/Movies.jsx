import React, { Fragment, useEffect, useState, useContext, } from 'react'
import axios from 'axios'
import { AiFillPlayCircle } from 'react-icons/ai'
import { Container } from './Navbar'
import NoImg from '../img/Noimage.jpg'
import '../styles/Video.css'

function Movies() {
    const { toggle, inputValue } = useContext(Container)
    const input = inputValue              //avariable input value movie name 
    const [moviesData, setMoviesData] = useState([])
    const [trailer, setTrailer] = useState(true)
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
        MovieCall()
    }, [input])             
    console.log(moviesData)
    return (
        <Fragment>
            <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>          
                <div className='movies-container'>
                    {moviesData.map((movie) => {
                        return (
                            <Fragment>
                                
                                <div id={trailer ? 'container' : 'Nocontainer'}>              
                                    <AiFillPlayCircle color='green' fontSize={40} id="playIcon" />
                                    <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt='' />
                                    <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''}>{movie.title}</h3>
                                </div>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default Movies