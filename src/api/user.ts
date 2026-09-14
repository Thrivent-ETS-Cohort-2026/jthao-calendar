import type { User } from '../utils/data.ts'


export async function getUser(eMail: string): Promise<User[]> {
    try {
        const response = await fetch(`http://localhost:3001/users?email=${eMail}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        const user: User[] = await response.json()
        return user

    } catch (error) {
        console.error(error)
    }

}

export async function checkUserByEmailAndPassword(eMail: string, pass: string): Promise<User> {
    try {
        const response = await fetch(`http://localhost:3001/users?email=${eMail}&password=${pass}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        const user: User = await response.json()

        return user

    } catch (error) {
        console.error(error)
    }
}

export async function createUser(email: string, pass: string, firstName: string, lastName: string): Promise<User> {
    try {
        const response = await fetch(`http://localhost:3001/users/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                    fName: firstName,
                    lName: lastName
                })
            }
        )
        if (!response.ok) {
            throw new Error(`Failed to create user. Status: ${response.status}`);
        }
        const newUser = await response.json()

        return newUser
    } catch (error) {
        console.error(error)
    }
}