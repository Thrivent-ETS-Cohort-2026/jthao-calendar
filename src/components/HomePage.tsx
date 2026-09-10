import { useState } from "react"
import { checkUserByEmailAndPassword, createUser, getUser } from '../api/user'
import type { User } from "../utils/data"
import Calendar from "./Calendar"

export default function HomePage() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [fName, setFName] = useState<string>("")
    const [lName, setLName] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

    async function handleLogIn(e: React.FormEvent) {
        e.preventDefault()
        
        const user: User[] = await checkUserByEmailAndPassword(email, password)
        
        if (!user || !user[0]) {
            setErrorMessage('Account not found with that email and password combination.')
            return
        }
        
        setLoggedInUser(user[0])
        setIsLoggedIn(true)
        setErrorMessage(null)
        setIsSignUp(false)
    }

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault()
        if (!isSignUp) {
            setIsSignUp(true)
            return;
        }
        
        successfulSignUp(e)
    }

    async function successfulSignUp(e: React.FormEvent) {
        e.preventDefault()
        const user: User[] = await getUser(email)
        if (user.length > 0) {
            setErrorMessage('Account already exists. Please log in.')
            return
        }
        if (!email.includes('@')) {
            setErrorMessage('Please input a valid email.')
            return
        }
        if (password.length < 8) {
            setErrorMessage('Password needs to be 8 or more characters.')
            return
        }
        if (fName === '' || lName === '') {
            setErrorMessage('Please enter your first and last name.')
            return
        }

        // Create user and update state cleanly
        const newUser = await createUser(email, password, fName, lName)
        setLoggedInUser(newUser)
        setErrorMessage(null)
        setIsLoggedIn(true)
        setIsSignUp(false)
    }

    function handleLogOut(e: React.FormEvent) {
        e.preventDefault()
        setIsLoggedIn(false)
        setLoggedInUser(null)
        setEmail('')
        setPassword('')
        setLName('')
        setFName('')
    }

    return (
        <>
            {!isLoggedIn && (
                <div>
                    {errorMessage && <p className="bg-red-300 text-black">{errorMessage}</p>}
                    <form>
                        <label htmlFor="email-input" className="m-1">Email:</label>
                        <input className="m-1" name="email-input" type="email" placeholder="@email.com" value={email} onChange={(text) => setEmail(text.target.value.trim())} />
                        <br />
                        <label htmlFor="password-input" className="m-1">Password:</label>
                        <input className="m-1" name="password-input" type="password" placeholder="Enter password" value={password} onChange={(text) => setPassword(text.target.value.trim())} />
                        {
                            isSignUp &&
                            <div>
                                <br />
                                <p>Enter your first name and your last name to sign up.</p>
                                <label htmlFor="firstName-input" className="m-1">First name:</label>
                                <input className="m-1" name="firstName-input" type="text" placeholder="First name" value={fName} onChange={(text) => setFName(text.target.value.trim())} />
                                <br />
                                <label htmlFor="lastName-input" className="m-1">Last name:</label>
                                <input className="m-1" name="lastName-input" type="text" placeholder="Last name" value={lName} onChange={(text) => setLName(text.target.value.trim())} />
                            </div>
                        }
                        <button className="m-1 p-1 border text-black border-emerald-600 bg-emerald-500" onClick={handleLogIn}>Log in</button>
                        <button className="m-1 p-1 border text-black border-emerald-600 bg-emerald-500" onClick={handleSignUp}>Sign up</button>
                    </form>
                </div>
            )}

            {isLoggedIn && loggedInUser && (
                <div>
                    <div className="flex justify-between items-center p-2">
                        <span>Hello, {loggedInUser.fName}!</span>
                        <button onClick={handleLogOut} className="p-1 m-1 bg-emerald-50 text-black border">Log out</button>
                    </div>

                    <Calendar currentUser={loggedInUser} />
                </div>
            )}
        </>
    )
}