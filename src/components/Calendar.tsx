import { useState } from "react"


export default function Calendar(){

    // const [calWeek, setCalWeek] = useState<string[]>([])
    

// function getWeek(){
//     const today = new Date

//     const sunday = new Date(today)
//     sunday.setDate(today.getDate() - today.getDay())

//     const saturday = new Date(today)
//     saturday.setDate(today.getDate() + (6 - today.getDay()))

//     // console.log(`Week Start: ${sunday.toLocaleDateString()}`);
//     // console.log(`Week End: ${saturday.toLocaleDateString()}`);

//     // create an array to hold the days of the week
//     // loop through the days to build the week.
//     // each day/card will be clickable to get the event details
//     // each card will have a button to add event
//         // each event will have button to invite, accept, reject, edit, or delete

// }
// getWeek()

function getSunday(){
    const today = new Date()
    const currentDay: number = new Date().getDay()
    
    const sunday = new Date(today)
    sunday.setDate(today.getDate() - currentDay)
    const weekArr: string[] = [];

    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(sunday);
        nextDay.setDate(sunday.getDate() + i);
        weekArr.push(nextDay.toLocaleDateString());
      }

    console.log(weekArr)
    
    // setCalWeek(weekArr)
}
getSunday()
// setCalWeek()
    


    return(
        // display a 1 week calendar
        // users can toggle to go to the next week with an arrow button
        // Week will start with Sunday - Saturday
        <>
        <div>

        </div>
        
        </>
    )
}