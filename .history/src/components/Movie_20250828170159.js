import React, { useEffect } from 'react'

function Movie() {

    const getMovie = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc?api_key=8b9cadaddd5fdf77e1118c4b03b79f77")
        .then(res => res)
    }
}