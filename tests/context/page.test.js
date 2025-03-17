import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '../../context/Auth';
import UserLoginPage from '../../app/context/page';
import React from 'react';

import '@testing-library/jest-dom';

// Mock the useAuth hook
jest.mock('../../context/Auth', () => ({
    useAuth: jest.fn(),
}));

describe('UserLoginPage', () => {
    it('should render login page', () => {
        useAuth.mockReturnValue({ userName: '', setUserName: jest.fn() });
        render(<UserLoginPage />);

        expect(screen.getByText('Login page')).toBeInTheDocument();
        expect(screen.getByText('Please login')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('should render welcome message when user is logged in', () => {
        useAuth.mockReturnValue({ userName: 'John Doe', setUserName: jest.fn() });
        const { container } = render(<UserLoginPage />);

        expect(screen.getByText(/Welcome/)).toBeInTheDocument();
        expect(screen.getByText(/John Doe/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    it('should call setUserName on login', () => {
        const setUserName = jest.fn();
        useAuth.mockReturnValue({ userName: '', setUserName });
        render(<UserLoginPage />);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: /login/i });

        fireEvent.change(input, { target: { value: 'John Doe' } });
        fireEvent.click(button);

        expect(setUserName).toHaveBeenCalledWith('John Doe');
    });

    it('should call setUserName on logout', () => {
        const setUserName = jest.fn();
        useAuth.mockReturnValue({ userName: 'John Doe', setUserName });
        render(<UserLoginPage />);

        const button = screen.getByRole('button', { name: /logout/i });
        fireEvent.click(button);

        expect(setUserName).toHaveBeenCalledWith('');
    });
});
