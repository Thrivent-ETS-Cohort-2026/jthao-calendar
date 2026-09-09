import { useEffect, useState } from "react"
import Day from './Day'


export default function Calendar() {

    const [calWeek, setCalWeek] = useState<Date[]>([])
    const [weekCount, setWeekCount] = useState<number>(0)


    function getSunday(count: number): Date[] {
        const today: Date = new Date()
        const currentDay: number = new Date().getDay()

        const sunday: Date = new Date(today)
        sunday.setDate(today.getDate() - currentDay)

        sunday.setDate(sunday.getDate() + count * 7)
        // console.log(sunday)

        const weekArr: Date[] = [];

        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(sunday);
            nextDay.setDate(sunday.getDate() + i);
            weekArr.push(nextDay);
        }

        return weekArr;
    }

    const currentWeek: Date[] = getSunday(weekCount)

    useEffect(() => {
        // const currentWeek: Date[] = getSunday(weekCount)
        console.log(currentWeek)
        // setCalWeek(currentWeek)
    }, [weekCount])


    function checkDateIsToday(date: Date): boolean {
        const today = new Date()
        return date.toDateString() === today.toDateString()
    }


    return (
        // display a 1 week calendar
        // users can toggle to go to the next week with an arrow button
        // Week will start with Sunday - Saturday
        <>
            <div>
                {/* btns to go to prev week or next week */}
                <button className="bg-emerald-600 text-black m-1 p-1" onClick={() => setWeekCount((prev) => prev - 1)} >Previous week</button>
                <button className="bg-emerald-600 text-black m-1 p-1" onClick={() => setWeekCount((next) => next + 1)} >Next week</button>

                {/* calendar days go here */}
                <div>
                    {currentWeek.map((date, index) => (
                        <Day key={index} date={date} isToday={checkDateIsToday(date)} />
                    ))}
                </div>
                {/* <Day date={}/> */}
            </div>

        </>
    )
}