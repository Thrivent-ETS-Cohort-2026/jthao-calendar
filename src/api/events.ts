import type { Event } from '../utils/data'

export async function getEvents(): Promise <Event[]>{
    try{
        const response = await fetch(`http://localhost:3000/events`)
        if(!response.ok){
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        const events: Event[] = await response.json()
        return events

    } catch (err){
        console.error(err)
    }

}