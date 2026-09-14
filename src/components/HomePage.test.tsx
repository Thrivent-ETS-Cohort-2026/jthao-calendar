import { userEvent } from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import HomePage from './HomePage';

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
    test('should display the initial state correctly', () => {
        renderHomePage();

        const showSignUp = screen.queryByText('Enter your first name and your last name to sign up.');
        expect(showSignUp).not.toBeInTheDocument();
    });

    
})