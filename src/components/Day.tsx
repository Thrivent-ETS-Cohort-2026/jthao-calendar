

export default function Day(){



    return(
        <>
        <div>
        <div className="card bg-green-100 p-1 m-1">
            <div className="card-container text-black" defaultValue={courseCard.title}>
                <h2 className="course-title">{courseCard.title}</h2>
                <p className='course-duration'>{courseCard.duration}</p>
                <p className='course-level'>{courseCard.level}</p>
                <button onClick={handleClick} className='bg-green-400 border border-green-500 hover:bg-green-800 hover:text-white' >View Details</button>
                {/* { showDetails && <CourseDetails courseCard={courseCard}/> } */}
            </div>
        </div>
        </div>
        </>
    )
}