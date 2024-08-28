// src/components/SignInSide.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInSide from '../pages/Login';

// Mock dependencies
jest.mock('../Action/authDispatcher', () => ({
  signIN: jest.fn(() => (dispatch, callback) => callback({ success: true, message: 'Success', payload: { isPasswordVerifed: true } }))
}));

jest.mock('../Theme/ThemeContext', () => ({
  useThemeContext: () => ({
    theme: { palette: { mode: 'light' } },
    setCountry: jest.fn()
  })
}));

jest.mock('../Utils/index', () => ({
  validateUsername: jest.fn(() => true)
}));

// Test case: Render component and check if elements are displayed
test('renders Sign In component with required elements', () => {
  render(<SignInSide />);

  expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email \/ UserName/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
});

// Test case: Display an error message when invalid username is entered
test('displays error message when invalid username is entered', () => {
  render(<SignInSide />);

  fireEvent.change(screen.getByLabelText(/Email \/ UserName/i), { target: { value: 'invalid_username' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  // Adjust the error message based on your component's behavior
  expect(screen.getByText(/Invalid username for UAE/i)).toBeInTheDocument();
});

// Test case: Update country selection
test('updates country selection', () => {
  render(<SignInSide />);

  fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'India' } });

  expect(screen.getByLabelText(/Country/i).value).toBe('India');
});
