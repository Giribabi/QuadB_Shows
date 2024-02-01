import { useContext, useState } from 'react'
import { ShowContext } from '../../App'
import './Form.css'

function Form({setBookingValue}){
    const [ticketCount, setTicketCount] = useState(0)
    const currentShowContext = useContext(ShowContext)
    return (
        <div className="form-component">
            <div className="form-movie-name">
                Movie Name: {currentShowContext.show.name}
            </div>
            <div className="schedule">
                Scheduled at: {currentShowContext.show.schedule.time}
            </div>
            <div className="days-available">
                Shows available on: 
                {
                    currentShowContext.show.schedule.days.map((day,index)=>(
                        <div className="days" key={`${index}`}>
                            {day+" | "}
                        </div>
                    ))
                }
            </div>
            <div className="duration">
                Duration: {" "+ currentShowContext.show.runtime+" "} minutes
            </div>
            <div className="ticket-cost">
                Ticket price: Rs.200/-
            </div>
            <div className="tickets-count">
                Ticket Count: <input type='number' onChange={(e)=>setTicketCount(e.target.value)} className='input' min='1' max='200' />
            </div>
            <div className="total-cost">
                Total cost: Rs.{ticketCount*200}/-
                {localStorage.setItem('cost',ticketCount*200)}
            </div>
            <div className="buttons">
                <div className="proceed"
                onClick={setBookingValue}
                >
                    Proceed
                </div>
                <div className="go-back"
                onClick={setBookingValue}
                >
                    Go back
                </div>
            </div>
        </div>
    )
}

export default Form