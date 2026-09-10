import { useState } from "react"
import { createEvent, deleteEvents } from '../api/events'
import type { User, Event as CalendarEvent } from "../utils/data"

interface DayProps {
    date: Date
    currentUser: User
    events: CalendarEvent[]
    onEventChange: () => void
}

export default function Day({ date, currentUser, events, onEventChange }: DayProps) {

    const [isCreateEvent, setIsCreateEvent] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [dateTime, setDateTime] = useState<string>('')
    const [eventLocation, setEventLocation] = useState<string>('')


    const dayName: string = date.toLocaleDateString('en-US', { weekday: 'short' })
    const dayMonth: string = date.toLocaleDateString('en-US', { month: 'short' })
    const dayNumber: number = date.getDate()

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

        await createEvent(currentUser.id, title, description, convertedDateTime, eventLocation)
        
        setTitle('')
        setDescription('')
        setDateTime('')
        setEventLocation('')
        setIsCreateEvent(false)

        onEventChange()
    }

    async function handleDelete(id: number) {
        await deleteEvents(id)
        onEventChange()
    }

    return (
        <>
            <div>
                <div className="card bg-emerald-200 p-1 m-1" >
                    <div className="card-container text-black" >
                        <h2 className="course-title">{dayMonth}</h2>
                        <p className='course-duration'>{dayName}</p>
                        <p className='course-level'>{dayNumber}</p>

                        {events.map((evt) => (
                            <div key={evt.id} className="bg-white p-1 m-1 border border-black">
                                <p className="font-bold">{evt.title}</p>
                                <p>{evt.description}</p>
                                <p>{evt.location}</p>
                                <button className="bg-red-400 p-1 m-1 text-xs" onClick={() => handleDelete(evt.id)}>Delete</button>
                            </div>
                        ))}

                        <button className="bg-green-300 p-1 m-1" onClick={handleCreateEvent}> Create event</button>
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