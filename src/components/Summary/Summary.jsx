import './Summary.css'
import { ShowContext } from '../../App';
import { useContext, useState } from 'react';
import no_image from './../../assets/no-image.png'
import Form from '../Form/Form';
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

function Summary(){
    const [bookingSelected, setBookingSelected] = useState(false)
    function handleBooking(){
        setBookingSelected(!bookingSelected)
    }
    // use dangerouslySetInnerHTML={{__html: html_stored_string }} to render html stored in a string in reactjs
    const currentShowContext = useContext(ShowContext)
    return (
        <div className="summary-container">
            <div className="poster-container">
                {
                    currentShowContext.show.image
                    ?
                    <LazyLoadImage src={ currentShowContext.show.image.original} placeholderSrc={currentShowContext.show.image.original} effect='blur' className='poster-image' alt='poster' height='500px' width='500px' loading='lazy' />
                    :
                    <LazyLoadImage src={no_image} placeholderSrc={no_image} effect='blur' className='poster-image' alt='poster' height='500px' width='500px' />
                }
            </div>
            <div className="movie-info-container">
                <div className="movie-name">
                    {currentShowContext.show.name}
                </div>
                <div className="language">
                    {"Language: " + currentShowContext.show.language}
                </div>
                <div className="genre-list">
                    {
                        currentShowContext.show.genres
                        ?
                        <div className="genres">
                            {"Genre: "}
                            {
                            currentShowContext.show.genres.map((genre, index)=>(
                                <div className="genre" key={`${index}`}>
                                    { genre + " |"}
                                </div>
                            ))
                            }
                        </div>
                        :
                        ""
                    }
                </div>
                <div className="book-tickets-container">
                    <div className="book-tickets-button"
                    onClick={handleBooking}
                    >
                        Book tickets
                    </div>
                </div>
                {
                    bookingSelected
                    ?
                    <Form setBookingValue={handleBooking}/>
                    :
                    ""
                }
                <div className="movie-summary">
                {
                <div dangerouslySetInnerHTML={{__html: currentShowContext.show.summary }} className="summary">
                </div>
                }
                </div>
            </div>
        </div>
    )
}

export default Summary;