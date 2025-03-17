import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserLoginPage from '@/app/redux/page';
import { authenticate } from '@/redux/slices/user';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
let store;

beforeEach(() => {
  store = mockStore({
    user: {
      isAuthenticated: false,
      userName: '',
    },
  });

  store.dispatch = jest.fn();
});

test('renders login form when not authenticated', () => {
  render(
    <Provider store={store}>
      <UserLoginPage />
    </Provider>
  );

  expect(screen.getByPlaceholderText('user name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('dispatches authenticate action on login button click', () => {
  render(
    <Provider store={store}>
      <UserLoginPage />
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText('user name'), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'password' } });
  fireEvent.click(screen.getByText('Login'));

  expect(store.dispatch).toHaveBeenCalledWith(authenticate({ userName: 'testuser', password: 'password' }));
});

test('renders welcome message when authenticated', async () => {
  store = mockStore({
    user: {
      isAuthenticated: true,
      userName: 'testuser',
    },
  });

  render(
    <Provider store={store}>
      <UserLoginPage />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText('Welcome testuser')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});