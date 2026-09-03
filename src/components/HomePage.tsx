import { useState } from "react"



export default function HomePage(){

    // when user gets to home page
        // User can sign up or log in
        // default will show email and password to login
        // If user clicks on sign up btn,
          // dropdown will add first name and last name field
          // User will click on sign up btn again to sign up.
        // If user logs in,
          // check email and password
          // If good, then logs in
          // display their Calendar
          // else
            // show in red, "account not found with that email and password combination."
            

            const [email, setEmail] = useState<string>("")
            const [password, setPassword] = useState<string>("")
            const [fName, setFName] = useState<string>("")
            const [lName, setLName] = useState<string>("")
    

    return(
        <>
        <form className="flex ">
            <label htmlFor="email-input" className="m-1">Email:</label>
            <input className="m-1" name="email-input" type="email" placeholder="@email.com" value={email} onChange={(text) => setEmail(text.target.value.trim())}></input>
            <br/>
            <label htmlFor="password-input" className="m-1">Password:</label>
            <input className="m-1" name="password-input" type="password" placeholder="Enter password" value={password} onChange={(text) => setPassword(text.target.value.trim())}></input>
            {
            // If isSignUp = true
            // Then show first name and last name input
            <div>
            <label htmlFor="firstName-input" className="m-1">First name:</label>
            <input className="m-1" name="firstName-input" type="text" placeholder="First name" value={fName} onChange={(text) => setFName(text.target.value.trim())}></input>
            <br/>
            <label htmlFor="lastName-input" className="m-1">Last name:</label>
            <input className="m-1" name="lastName-input" type="text" placeholder="Last name" value={lName} onChange={(text) => setLName(text.target.value.trim())}></input>
            </div>
            }
        </form>


        {/* If user logs in, display <Calendar /> */}
        </>
    )
}