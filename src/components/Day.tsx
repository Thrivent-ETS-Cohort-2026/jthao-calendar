import { useState } from "react"
import { createEvent } from '../api/events'


interface DayProps {
    date: Date
    isToday?: boolean
}

export default function Day({ date, isToday }: DayProps) {

    const [isCreateEvent, setIsCreateEvent] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [dateTime, setDateTime] = useState<string>()
    const [eventLocation, setEventLocation] = useState<string>('')


    const dayName: string = date.toLocaleDateString('en-US', { weekday: 'short' })
    const dayMonth: string = date.toLocaleDateString('en-US', { month: 'short' })
    const dayYear: string = date.toLocaleDateString('en-US', { year: 'numeric' })
    const dayNumber: number = date.getDate()

    // console.log(dayName)
    // console.log(dayMonth)
    // console.log(dayYear)
    // console.log(dayNumber)
    // console.log(isToday)
    // console.log(title)
    // console.log(description)
    // console.log(dateTime)
    // console.log(eventLocation)

    function handleCreateEvent(event) {
        event.preventDefault()
        setIsCreateEvent(true)
        if (isCreateEvent){
            setIsCreateEvent(false)
        }
    }

    async function handleSubmit(event){
        event.preventDefault()

        const convertedDateTime = new Date(dateTime).toISOString()

        // send to create Event API
        await createEvent(title, description, convertedDateTime, eventLocation)
        setIsCreateEvent(false)
    }

    return (
        <>
            <div>
                <div className="card bg-emerald-200 p-1 m-1" >
                    <div className="card-container text-black" >
                        <h2 className="course-title">{dayMonth}</h2>
                        <p className='course-duration'>{dayName}</p>
                        <p className='course-level'>{dayNumber}</p>
                        <button className="bg-green-300 p-1 m-1" onClick={handleCreateEvent}> Create event</button>
                        {/* <button onClick={handleClick} className='bg-green-400 border border-green-500 hover:bg-green-800 hover:text-white' >View Details</button> */}
                        { isCreateEvent &&  
                        <form className="bg-white m-5 p-5">
                            <label htmlFor="event-title" className="m-1">Event title:</label>
                            <input name="event-title" type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="p-1 m-1 bg-gray-50 border border-black" />
                            <br />
                            <label htmlFor="event-description" className="m-1">Event description:</label>
                            <input name="event-description" type="text" placeholder="Event description" value={description} onChange={(e) => setDescription(e.target.value)} required className="p-1 m-1 bg-gray-50 border border-black" />
                            <br />
                            <label htmlFor="event-dateTime" className="m-1">Date and time:</label>
                            <input name="event-dateTime" type="datetime-local" placeholder="Event date and time" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required className="p-1 m-1 bg-gray-50 border border-black" />
                            <br />
                            <label htmlFor="event-location" className="m-1">Event location:</label>
                            <input name="event-location" type="text" placeholder="Event location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required className="p-1 m-1 bg-gray-50 border border-black" />
                            <br />
                            <button type="submit" className="bg-green-300 p-1" onClick={handleSubmit}>Submit</button>
                        </form>
}
                    </div>
                </div>
            </div>
        </>
    )
}