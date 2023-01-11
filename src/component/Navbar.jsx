import React, { Fragment, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import { Routes, Route, NavLink } from 'react-router-dom'
import '../styles/NavbarStyle.css'
import Movies from './Movies'
import Tvshows from './Tvshows'
import Trends from './Trends'
import Pricing from './Pricing'
import Refferend from './Refferend'

export const Container = React.createContext()


function Navbar() {
    const [toggle, setToggle] = useState(true)
    const [inputValue, setInputValue] = useState('')
    console.log(toggle)
    return (
        <Container.Provider value={{toggle,inputValue}}>
        <Fragment>
            <nav className={toggle ? '' : 'navBarColor'}>
                <div className='nav-options'>
                    <NavLink >
                        <h1 id={toggle ? '' : 'heading'}>Movie</h1>
                    </NavLink>
                    <NavLink to={""} style={({isActive}) => {return { color:isActive ? '#fff':'#EE9B00'}}}>
                    <span id={toggle ? 'Movies' : 'MoviesLight'}>Movies</span>
                    </NavLink>
                    <NavLink to={"Tvshows"} style={({isActive}) => {return { color:isActive ? '#fff':'#EE9B00'}}}>
                    <span id={toggle ? 'Movies' : 'MoviesLight'}>Tv Shows</span>
                    </NavLink>
                    <NavLink to={"Trending"} style={({isActive}) => {return { color:isActive ? '#fff':'#EE9B00'}}}>
                    <span id={toggle ? 'Movies' : 'MoviesLight'}>Trending</span>
                    </NavLink>
                    <NavLink to={"Pricing"} style={({isActive}) => {return { color:isActive ? '#fff':'#EE9B00'}}}>
                    <span id={toggle ? 'Movies' : 'MoviesLight'}>Pricing</span>
                    </NavLink>
                    <NavLink to={"Refferend"} style={({isActive}) => {return { color:isActive ? '#fff':'#EE9B00'}}}>
                    <span id={toggle ? 'Movies' : 'MoviesLight'}>Refferend</span>
                    </NavLink>
                </div>
                <div className="input-group">
                    <input type="text" placeholder='Search Movies' onChange={(e) => setInputValue(e.target.value)}/>
                    <HiSearch fontSize={21} color="green" id="search" />
                    <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
                        <div id={toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>
                    </div>
                </div>
            </nav>
     
            <Routes>
                <Route path='' element={<Movies />} />
                <Route path='Tvshows' element={<Tvshows />} />
                <Route path='Trends' element={<Trends />} />
                <Route path='Pricing' element={<Pricing />} />
                <Route path='Refferend' element={<Refferend />} />

            </Routes>

        </Fragment>
        </Container.Provider>
    )
}

export default Navbar