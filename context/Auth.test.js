import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth } from './Auth';

const TestComponent = () => {
    const { userName, setUserName } = useAuth();
    React.useEffect(() => {
        setUserName('testUser');
    }, [setUserName]);
    return <div>{userName}</div>;
};

test('AuthProvider provides userName and setUserName', () => {
    render(
        <AuthProvider>
            <TestComponent />
        </AuthProvider>
    );
    expect(screen.getByText('testUser')).toBeInTheDocument();
});

test('useAuth throws error when not used within AuthProvider', () => {
    const consoleError = console.error;
    console.error = jest.fn(); // Suppress error output in test

    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within an AuthProvider');

    console.error = consoleError; // Restore original console.error
});
