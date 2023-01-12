import axios from 'axios'
import { Fragment, useEffect, useState, useContext } from 'react'
import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import NoImg from '../img/Noimage.jpg'
import { Container } from './Navbar'
import TrailerTvshows from '../trailers/TrailerTvshows'
import '../styles/Video.css'

function Tvshows() {
  const { toggle, inputValue } = useContext(Container)
  const input = inputValue
  const [showData, setShowData] = useState([])
  const [trailer, setTrailer] = useState(true)
  const Shown = input ? 'search' : 'discover'
  const [title, setTitle] = useState('')
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`
  const Images = 'https://image.tmdb.org/t/p/w500'

  const Tvshows = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: 'eb57ca9006b2af8d8539e85f3ff6ae90',
        query: input
      }
    })
    const results = (data.data.results)
    setShowData(results)

  }
  useEffect(() => {
    setTimeout(() => {
      Tvshows()
    },100)
    
  }, [input])
  console.log(showData)
  const TvshowTitle = (shows) => {
    setTitle(shows.name)
    setTrailer(!trailer)

  }
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className='movies-container'>
          {showData.map((shows) => {
            return (
              <Fragment key={shows.id}>
                <div id={trailer ? 'container' : 'NoContainer'}>
                  <AiFillPlayCircle color='green' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => TvshowTitle(shows)} />
                  <img src={shows.poster_path ? `${Images}${shows.poster_path}` : NoImg} alt='' onClick={() => TvshowTitle(shows)} />
                  <h3 id={shows.name.length > 28 ? 'smaller-Text' : ''} className={toggle ? "mainColor" : 'secondaryColor'}>{shows.name}</h3>
                </div>
              </Fragment>
            )
          })}
          {trailer ? console.log : <TrailerTvshows TvshowsTitle={title} toggle={toggle}/>}
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color="#fff" cursor={'pointer'} onClick={() => setTrailer(true)} />
        </div>
      </div>
    </Fragment>
  )
}

export default Tvshows