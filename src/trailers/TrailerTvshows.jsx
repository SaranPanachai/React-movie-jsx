import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import '../styles/TrailerMovie.css'


function TrailerTvshows({ TvshowsTitle,toggle }) {
    const [video, setVideo] = useState("");
    const [videoURL, setVideoURL] =
        useState("");

    function handleSearch() {
        setVideo(TvshowsTitle)
        movieTrailer(video).then((res) => {
            setVideoURL(res);
        });
    }
    useEffect(() => {
        handleSearch()
    },[videoURL])
    return (
        <Fragment>
            <div className='Container'>
            </div>
            <div className='player'>
            <h1 id={toggle ? 'TrailerMovie-name-dark' : 'TrailerMovie-name-light'}>{TvshowsTitle}</h1>
                <ReactPlayer url={videoURL} controls={true} width={'1000px'} height={'700px'} muted="fales"/>
            </div>
        </Fragment>
    )
}

export default TrailerTvshows