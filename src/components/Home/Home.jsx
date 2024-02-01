import { Link } from 'react-router-dom';
import './Home.css'
import { useEffect, useState } from 'react';
import { ShowContext } from '../../App';
import { useContext } from 'react';
import no_image_icon from './../../assets/no-image.png'
import stars from './../../assets/star.png'
import Loader from '../Loader/Loader';
import styled from 'styled-components'

const StyledLink = styled(Link)`
display: inline-block;
text-decoration: none;
color: rgb(0, 185, 255);
border: 2px solid rgb(0, 251, 255);
border-radius: 2em;
padding: 1%;
margin: 5%;
&:hover{
    background-color: rgb(0, 251, 255);
    color: white;
}
`

function Home(){
    // always use the context in the body of the component like below:
    const currentShowContext = useContext(ShowContext)
    // do not access the context(above line) in a separate function.
    const [shows, setShows] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    function HandleShowSelect(show){
        //console.log("clicked")
        currentShowContext.setShow(show)
    }

    useEffect(()=>{
        async function fetchShows(){
            try{
                setIsLoading(true)
                //console.log("loading")
                const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
                const arrayshows = await response.json()
                setShows(shows=>(arrayshows))
                //console.log(shows)
            }
            catch(err){
                console.log("no internet")
                setError(true)
                console.log(error)
            }
            finally{
                setIsLoading(false)
                //console.log("loading completed")
            }
        }
        fetchShows()
        //console.log(shows.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[shows.length])
    return (
        <div className="home-page">
            <div className="home">
            <div className="heading">QuadB Shows</div>
            {
                isLoading
                ?
                <Loader/>
                :
                <div className="movies-list-container">
                    <div className="movies-list">
                    {
                        shows.map((movie, index)=>(
                            <div className="movie-container" key={`${index}`}>
                                <div className="thumbnail-container">
                                {
                                    movie.show.image
                                    ?
                                    <img src={movie.show.image.medium} className='thumbnail' alt='thumbnail' height='300px' width='230px' />
                                    :
                                    <img src={no_image_icon} className='thumbnail' alt='thumbnail' height='300px' width='230px' /> 
                                }
                                </div>
                                <div className="movie-info">
                                    <div className="movie-name">
                                    <b> {movie.show.name} </b>
                                    </div>
                                    <div className="movie-rating">
                                    {
                                        movie.show.rating.average
                                        ?
                                        <div className="rating">
                                            <div className="rating-stars">
                                                <div className="rating-percentage">
                                                    <img src={stars} alt='rating-star' />
                                                </div>
                                            </div>
                                            <div className="numeric-rating">
                                                {movie.show.rating.average}/10
                                            </div>
                                        </div>
                                        :
                                        <div className="rating">
                                            No ratings yet...
                                        </div>
                                    }
                                    </div>
                                    <div 
                                    className="link"
                                    onClick={()=>HandleShowSelect(movie.show)}
                                    >
                                        <StyledLink to='summary'><div className="know-more-button">Know more</div></StyledLink>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            }
            </div>
        </div>
    )
}

export default Home;