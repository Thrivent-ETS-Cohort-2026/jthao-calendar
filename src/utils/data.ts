export interface User {
    id: number,
    email: string,
    password: string,
    fName: string,
    lName: string
}

export interface Event {
    id: number,
    title: string,
    description: string,
    dateTime: string,
    location: string,
    userId: string
}

export interface EventInvite {
    id: number,
    eventId: string,
    userId: string,
    invitedList: [],
    acceptedList: [],
    declineList: []
}
 export interface InvitedUser {
    id: number,
    userId: string,
    email: string,
    fName: string,
    lName: string
 }

 export type UpdateEventPayload = Partial<Omit<Event, 'id' | 'userId'>>;