import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import HomePage from './HomePage';

// Mocks Calendar component to avoid rendering it during tests, as we are focusing on testing the HomePage component itself.
jest.mock('./Calendar', () => ({
    __esModule: true,
    default: () => <div data-testid="calendar">Calendar</div>,
}))

function renderHomePage(){
    const user = userEvent.setup();

    const renderResult = render(<HomePage />);

    return{
        user,
        ...renderResult,
    }
}

// test cases
describe('HomePage Component', () => {
    beforeEach(() => {
        renderHomePage()
    })
    test('should display the initial state correctly', () => {

        expect(screen.getByPlaceholderText('@email.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
    });

    test('does not show the sign up form by default', () => {
        const showSignUp = screen.queryByText('Enter your first name and your last name to sign up.');
        expect(showSignUp).not.toBeInTheDocument();
    });

    
})