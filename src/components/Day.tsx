

interface DayProps {
    date: Date
    isToday?: boolean
}

export default function Day({date, isToday}: DayProps){
    const dayName: string = date.toLocaleDateString('en-US', {weekday: 'short'})
    const dayMonth: string = date.toLocaleDateString('en-US', {month: 'short'})
    const dayYear: string = date.toLocaleDateString('en-US', {year: 'numeric'})
    const dayNumber: number = date.getDate()

    console.log(dayName)
    console.log(dayMonth)
    console.log(dayYear)
    console.log(dayNumber)
    console.log(isToday)
    


    return(
        <>
        <div>
            <div className="card bg-emerald-200 p-1 m-1" >
                <div className="card-container text-black" >
                    <h2 className="course-title">{dayMonth}</h2>
                    <p className='course-duration'>{dayName}</p>
                    <p className='course-level'>{dayNumber}</p>
                    <button className="bg-green-300 p-1 m-1"> Create event</button>
                </div>
            </div>
        </div>
        </>
    )
}