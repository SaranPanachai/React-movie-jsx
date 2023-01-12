import axios from 'axios'
import { Fragment, useEffect, useState, useContext } from 'react'
import { Container } from './Navbar'
import React from 'react'
import { AiOutlineClose, AiFillPlayCircle } from 'react-icons/ai'
import NoImg from '../img/Noimage.jpg'
import TrailerTrending from '../trailers/TrailerTrending'
import '../styles/Video.css'

function Trends() {
  const { toggle, inputValue } = useContext(Container)
  const input = inputValue
  const Api = `https://api.themoviedb.org/3`
  const TrendsShown = '/trending/all/week'
  const [trendArray, setTrendArray] = useState([])
  const [trendTitle, setTrendTitle] = useState('')
  const [trailer, setTrailer] = useState(true)
  const Images = 'https://image.tmdb.org/t/p/w500'
  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendsShown}`, {
      params: {
        api_key: 'eb57ca9006b2af8d8539e85f3ff6ae90',
        query: input
      }
    })
    const results = data.data.results
    setTrendArray(results)
  }

  useEffect(() => {
    setTimeout(() => {
      Trends()
    },100)
    
  }, [input])
  const TrendTitle = (trend) => {
    setTrendTitle(trend.title)
    setTrailer(!trailer)
  }
  return (

    <Fragment>
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className='movies-container'>
          {trendArray.map((trend) => {
            return (
              <div id={trailer ? 'container' : 'NoContainer'}>
                <AiFillPlayCircle color='green' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => TrendTitle(trend)} />
                <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg} alt='' onClick={() => TrendTitle(trend)} />
                <h3 id='smaller-Text' className={toggle ? 'mainColor' : 'secondaryColor'} >{trend.title}</h3>
              </div>
            )
          })}
          {trailer ? console.log : <TrailerTrending  TrendingTitle={trendTitle} toggle={toggle}/>}
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color="#fff" cursor={'pointer'} onClick={() => setTrailer(true)} />
        </div>
      </div>
    </Fragment>
  )
}

export default Trends