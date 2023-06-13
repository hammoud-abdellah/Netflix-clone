import React, { useState, useEffect } from 'react';
import axios from '../axios';
import "./row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import ReactPlayer from 'react-player';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [SelectedMovie, setSelectedMovie] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const [youtubeUrl,setYoutubeUrl] = useState(null);

    useEffect(() => {
        async function fetchData(){
            const requests = await axios.get(fetchUrl);
            setMovies(requests.data.results);
            return requests;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl ||( SelectedMovie === movie) || showVideo) {
            setSelectedMovie(null)
            setTrailerUrl('');
            setShowVideo(false);
        } else {
            setSelectedMovie(movie);
        }
    };        

    const ShowTrailer = (movie) => {
      
        if (trailerUrl) {
          setTrailerUrl('');
        } else {
          movieTrailer(movie?.name || movie?.title  || movie?.original_name || movie?.id || "")
          .then( (url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
  
          })
          .catch((error) => {
          console.log(error)
          setTrailerUrl('');
          });
        }
    };
    const handlePlay = () => {
        setShowVideo(true);
        setYoutubeUrl("https://www.youtube.com/watch?v=H4vHc9iQc3c");
      };
        
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
   

    return (
        <div className="row" >
            <h2>{title}</h2>

            <div className="row_posters">
            
            {movies.map(movie => (
                <img
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name}         
                />
            ))}
            </div>
            {SelectedMovie && (<div className="movie__details" 
            style={{
             backgroundSize: "cover",
             backgroundImage:  `url(
                http://image.tmdb.org/t/p/original/${SelectedMovie?.backdrop_path })`,                         
             backgroundPosition: "center center"
             }}>

            {(!trailerUrl && !showVideo)? (
                <div className='movie__contents'>
                <h2 className='movie__title'>{SelectedMovie?.name || SelectedMovie?.title  || SelectedMovie?.original_name}</h2>
                <div className='movie__buttons'>
                    <button className='trailer__button' onClick={() => handlePlay()}>Play</button>
                    <button className='trailer__button' onClick={() => ShowTrailer(SelectedMovie)}>Trailer</button>
                </div>
                <p className='movie__desc'>{truncate(SelectedMovie?.overview , 150)}</p>
               </div>
               
               
               ) :  (<>
                {showVideo?(
                    <div className="vedio__details">
                        <ReactPlayer url={youtubeUrl} playing controls muted/>
                    </div>):(
                    <div className='movie__details' >
                        <YouTube videoId={trailerUrl} opts={opts} />
                    </div> 
                )
                
               }
               </>
                  )
            }
            {/* {showVideo &&(
                <div className="video-container">
                     <ReactPlayer url={youtubeUrl} playing controls />
                </div>
            )
            } */}
            </div>)}

            {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}

        </div>
    );
}


export default Row;

