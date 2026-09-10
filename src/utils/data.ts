export interface User {
    id: number
    email: string
    password: string
    fName: string
    lName: string
}

export interface InvitedUser {
    email: string
    fName: string
    lName: string
    status: "invited" | "pending" | "accepted"
}

export interface Event {
    id: number
    title: string
    description: string
    dateTime: string
    location: string
    userId: number
    attendees?: InvitedUser[]
}

export interface CalendarProps {
    currentUser: User
}