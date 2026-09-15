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

    test('Calendar is not displayed by default and there is not log out button', () => {
        const calendar = screen.queryByTestId('calendar');
        const logoutBtn = screen.queryByRole('button', {name: 'Log out'});
        expect(calendar).not.toBeInTheDocument();
        expect(logoutBtn).not.toBeInTheDocument();
    });

    test('email and password is being captured', async () => {
        const emailInput = screen.getByPlaceholderText('@email.com');
        const passwordInput = screen.getByPlaceholderText('Enter password');

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password123');

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    
})