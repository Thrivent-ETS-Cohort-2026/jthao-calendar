import { useState } from "react"
import { checkUserByEmailAndPassword, createUser, getUser } from '../api/user'
import type { User } from "../utils/data"
import Calendar from "./Calendar"



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
            const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
            // const [logginError, setlogginError] = useState<boolean>(false)
            const [isSignUp, setIsSignUp] = useState<boolean>(false)
            const [errorMessage, setErrorMessage] = useState<string | null>(null)
            const [loggedInUser, setLoggedInUser] = useState<User | null>(null)


            async function handleLogIn(e){
                e.preventDefault()
                // remove after testing and working on Calendar
                setIsLoggedIn(true)
                const user: User = await checkUserByEmailAndPassword(email, password)
                if(!user[0]){
                    setErrorMessage('Account not found with that email and password combination.')
                    // setlogginError(true)
                    return
                }
                setLoggedInUser(user[0])
                setIsLoggedIn(true)
                setErrorMessage(null)
                // setlogginError(false)
                setIsSignUp(false)
            }

            async function handleSignUp(e){
                e.preventDefault()
                setIsSignUp(true)

                if(isSignUp){
                    successfulSignUp(e)
                }
            }

            async function successfulSignUp(e){
                e.preventDefault()
                const user: User[] = await getUser(email)
                if (user.length > 0) {
                    setErrorMessage('Account already exist. Please log in.')
                    return
                }
                 // check '@' in email
                if(!email.includes('@')) {
                    setErrorMessage('Please input an email.')
                    return
                } 
                 // check password length
                if(password.length < 8) {
                    setErrorMessage('Password needs to be 8 or more characters.')
                    return   
                } 
                // check if first and last name is entered
                if (fName === '' || lName === ''){
                    setErrorMessage('Please enter your first and last name.')
                    return 
                }

                // sign up is good
                setLoggedInUser(await createUser(email, password, fName, lName))
                console.log(loggedInUser)
                setErrorMessage(null)
                setIsLoggedIn(true)
                setIsSignUp(false)

            }

            function handleLogOut(e){
                e.preventDefault()
                setIsLoggedIn(false)
                setLoggedInUser(null)
                setEmail('')
                setPassword('')
                setLName('')
                setFName('')
                
            }


    return(
        <>
        { !isLoggedIn && (
            <div>
                {errorMessage && <p className="bg-red-300 text-black">{errorMessage}</p>}
                <form className=" ">
                    <label htmlFor="email-input" className="m-1">Email:</label>
                    <input className="m-1" name="email-input" type="email" placeholder="@email.com" value={email} onChange={(text) => setEmail(text.target.value.trim())}></input>
                    <br/>
                    <label htmlFor="password-input" className="m-1">Password:</label>
                    <input className="m-1" name="password-input" type="password" placeholder="Enter password" value={password} onChange={(text) => setPassword(text.target.value.trim())}></input>
                    { 
                        isSignUp &&
                        <div>
                        <br />
                        <p>Enter your first name and your last name to sign up.</p>
                        <label htmlFor="firstName-input" className="m-1">First name:</label>
                        <input className="m-1" name="firstName-input" type="text" placeholder="First name" value={fName} onChange={(text) => setFName(text.target.value.trim())}></input>
                        <br/>
                        <label htmlFor="lastName-input" className="m-1">Last name:</label>
                        <input className="m-1" name="lastName-input" type="text" placeholder="Last name" value={lName} onChange={(text) => setLName(text.target.value.trim())}></input>
                        
                    </div> }
                    <button className="m-1 p-1 border text-black border-emerald-600 bg-emerald-500" onClick={handleLogIn}>Log in</button>
                    <button className="m-1 p-1 border text-black border-emerald-600 bg-emerald-500" onClick={handleSignUp}>Sign up</button>
                    
                </form>
            </div> )
        }
        { isLoggedIn && 
        <div>
            <div>
                <span>Hello {}</span>
                <button onClick={handleLogOut} className=" p-1 m-1 bg-emerald-50 text-black">Log out</button>
                </div>
            <Calendar /> 
        </div>
        }
        </>
    )
}