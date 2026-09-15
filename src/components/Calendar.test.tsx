import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import Calendar from './Calendar';
import type { User } from '../utils/data';
import { getEvents } from '../api/events';

// Mocks Day component to avoid rendering it during tests
jest.mock('./Day', () => ({
    __esModule: true,
    default: () => <div data-testid="day">Day</div>,
}))

jest.mock('../api/events', () => ({
    __esModule: true,
    getEvents: jest.fn(() => Promise.resolve(
        [
            {
                id: 1,
                title: 'Test Event',
                description: 'This is a test event.',
                dateTime: new Date().toISOString(),
                location: 'Test Location',
                userId: 1,
                attendees: [
                    {
                        email: 'test1@gmail.com',
                        fName: 'John',
                        lName: 'Doe',
                        status: 'accepted'
                    }
                ]
            }
        ]
    ))
}))

function renderCalendar() {

    const testUser: User = {
        id: 1,
        email: 'test1@gmail.com',
        password: 'password123',
        fName: 'John',
        lName: 'Doe'
    }

    const user = userEvent.setup();

    const renderResult = render(<Calendar currentUser={testUser} />);

    return {
        user,
        ...renderResult,
    }
}

describe('Calendar Component', () => {
    beforeEach(() => {
        renderCalendar()
    })

    test('should display the initial state correctly', async() => {
        await waitFor(() => { // waiting for Day to render after events are fetched
            expect()
        });
        expect(screen.getByRole('button', { name: 'Previous week' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next week' })).toBeInTheDocument();
    });
});