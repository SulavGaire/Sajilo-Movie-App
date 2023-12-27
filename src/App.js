import {useEffect, useState} from "react"
import './App.css'
import axios from 'axios'
import Movie from "./components/Movie"
import Youtube from 'react-youtube'

function App() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = process.env.REACT_APP_TMD_API_KEY;
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})
    const [watchLaterMovies, setWatchLaterMovies] = useState([])
    const [COMPLETEDMovies, setCOMPLETEDMovies] = useState([])
    const [WATCHINGMovies, setWATCHINGMovies] = useState([])
    const [inWatchLater, setinWatchLater] = useState(false)
    const [COMPLETED, setCOMPLETED] = useState(false)
    const [WATCHING, setWATCHING] = useState(false)
    useEffect(() => {
        fetchMovies()
    }, [])

    const saveToWatchLater = (movie) => {
        setWatchLaterMovies([...watchLaterMovies, movie]);
        setinWatchLater(true);
        // console.log(watchLaterMovies);
    };
    const saveToCOMPLETED = (movie) => {
        setCOMPLETEDMovies([...COMPLETEDMovies, movie]);
        setCOMPLETED(true);
    };
    const saveToWatching = (movie) => {
        setWATCHINGMovies([...WATCHINGMovies, movie]);
        setWATCHING(true);
    };

    const removeFromWatchLater = (movie) => {
		const newFavouriteList = watchLaterMovies.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
		setWatchLaterMovies(newFavouriteList);
        setinWatchLater(false);
	};
    const removeFromCompleted = (movie) => {
		const newFavouriteList = COMPLETEDMovies.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
		setCOMPLETEDMovies(newFavouriteList);
        setCOMPLETED(false);
	};
    const removeFromWatching = (movie) => {
		const newFavouriteList = WATCHINGMovies.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
		setWATCHINGMovies(newFavouriteList);
        setWATCHING(false);
	};


    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        console.log(data.results[0])
        setMovies(data.results)
        setMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = (a) => (
        a.map(movie => (
            <Movie
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )


    return (
        <div className="App">
            <header className="center-max-size header">
            <span className={"brand"}>Sajilo Movie App </span>
                <a href="#WatchLater"><button>WATCH LATER</button></a>
                <a href="#COMPLETED"><button>COMPLETED</button></a>
                <a href="#WATCHING"><button>WATCHING</button></a>
                <form className="form" onSubmit={fetchMovies}>
                    <input className="search" type="text" id="search" placeholder="search..."
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"></button>
                </form>
            </header>
            {movies.length ?
                <main>
                    {movie ?
                        <div className="poster"
                             style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                            {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer.key}
                                        className={"youtube amru"}
                                        containerClassName={"youtube-container amru"}
                                        opts={
                                            {
                                                width: '100%',
                                                height: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 0,
                                                },
                                            }
                                        }
                                    />
                                    <button onClick={() => setPlaying(false)} className={"button close-video"}>Close
                                    </button>
                                </> :
                                <div className="center-max-size">
                                    <div className="poster-content">
                                        {trailer ?
                                            <button className={"button play-video"} onClick={() => setPlaying(true)}
                                                    type="button">Play Trailer</button>
                                            : 'Sorry, no trailer available'}
                                            {inWatchLater? <
                                                    button className={"button"} 
                                                    type="button" onClick={()=>removeFromWatchLater(movie)}>Remove Watch Later
                                                    </button>:
                                                    <button className={"button"} 
                                                    type="button" onClick={()=>saveToWatchLater(movie)}>Watch Later
                                                    </button>}
                                            {COMPLETED? <
                                                    button className={"button"} 
                                                    type="button" onClick={()=>removeFromCompleted(movie)}>Not Completed
                                                    </button>:
                                                    <button className={"button"} 
                                                    type="button" onClick={()=>saveToCOMPLETED(movie)}>Completed
                                                    </button>}
                                            {WATCHING? <
                                                    button className={"button"} 
                                                    type="button" onClick={()=>removeFromWatching(movie)}>Not Watching
                                                    </button>:
                                                    <button className={"button"} 
                                                    type="button" onClick={()=>saveToWatching(movie)}>Watching
                                                    </button>}
                                        <h1>{movie.title}</h1>
                                        <p>{movie.overview}</p>
                                    </div>
                                </div>
                            }
                        </div>
                        : null}

                    <div className={"center-max-size container"}>
                        {renderMovies(movies)}
                    </div>
                </main>
                : 'Sorry, no movies found'}
                <span className={"brand center-max-size header"} >WATCH LATER</span>
                <div id ="WatchLater" className={"center-max-size container"}>
                {renderMovies(watchLaterMovies)}
                </div>
                <span className={"brand center-max-size header"} >COMPLETED</span>
                <div id ="COMPLETED" className={"center-max-size container"}>
                {renderMovies(COMPLETEDMovies)}
                </div>
                <span className={"brand center-max-size header"} >WATCHING</span>
                <div id ="WATCHING" className={"center-max-size container"}>
                {renderMovies(WATCHINGMovies)}
                </div>
                <div/>
        </div>
    );
}
export default App;
