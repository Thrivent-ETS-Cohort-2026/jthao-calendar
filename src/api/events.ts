import type { Event } from '../utils/data'

export async function getEvents(): Promise<Event[]> {
    try {
        const response = await fetch(`http://localhost:3000/events`)
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        const events: Event[] = await response.json()
        return events

    } catch (err) {
        console.error(err)
    }
}

export async function createEvent(userId: number, title: string, desc: string, dateTime: string, location: string) {
    try {
        const response = await fetch(`http://localhost:3000/events`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    title: title,
                    description: desc,
                    dateTime: dateTime,
                    location: location
                })
            }
        )
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        const events: Event[] = await response.json()
        return events

    } catch (err) {
        console.error(err)
    }
}

export async function deleteEvents(id: number) {
    try {
        const response = await fetch(`http://localhost:3000/events/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const events: Event[] = await response.json()
        return events

    } catch (err) {
        console.error(err)
    }
}
