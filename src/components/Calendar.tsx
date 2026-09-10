import { useEffect, useState } from "react"
import Day from './Day'
import { getEvents } from '../api/events'
import type { CalendarProps, Event as CalendarEvent } from "../utils/data"

export default function Calendar({ currentUser }: CalendarProps) {
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [weekCount, setWeekCount] = useState<number>(0)

    function getSunday(count: number): Date[] {
        const today: Date = new Date()
        const currentDay: number = new Date().getDay()

        const sunday: Date = new Date(today)
        sunday.setDate(today.getDate() - currentDay)

        sunday.setDate(sunday.getDate() + count * 7)

        const weekArr: Date[] = []

        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(sunday)
            nextDay.setDate(sunday.getDate() + i)
            weekArr.push(nextDay)
        }

        return weekArr
    }

    const currentWeek: Date[] = getSunday(weekCount)

    // Fetch all events from json-server
    async function loadEvents() {
        const fetchedEvents = await getEvents()
        if (fetchedEvents) {
            setEvents(fetchedEvents)
        }
    }

    useEffect(() => {
        loadEvents()
    }, [weekCount])

    return (
        <>
            <div className="flex justify-between items-center p-2">
                <button className="bg-emerald-600 text-black m-1 p-1" onClick={() => setWeekCount((prev) => prev - 1)} >Previous week</button>
                <button className="bg-emerald-600 text-black m-1 p-1" onClick={() => setWeekCount((next) => next + 1)} >Next week</button>
            </div>
            {currentWeek.map((date, index) => {
                const dayEvents = events.filter((event) => {
                    const eventDate = new Date(event.dateTime)
                    const isSameDate = eventDate.toDateString() === date.toDateString()
                    const isOwner = event.userId === currentUser.id
                    const isInvited = event.attendees?.find(attendee => attendee.email === currentUser.email)

                    return isSameDate && (isOwner || isInvited)
                })

                return (
                    <Day 
                        key={index} 
                        date={date} 
                        currentUser={currentUser}
                        events={dayEvents}
                        onEventChange={loadEvents}
                    />
                )
            })}
        </>
    )
}