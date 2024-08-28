// src/components/Profile.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../pages/profile';
import { Provider } from 'react-redux';
import { updateProfile } from '../Action/authDispatcher';
import store from '../redux/configureStore';
// Mock dependencies
jest.mock('../Action/authDispatcher', () => ({
  updateProfile: jest.fn(() => (dispatch, callback) => callback({ success: true, message: 'Profile updated' }))
}));

jest.mock('../Theme/ThemeContext', () => ({
  useThemeContext: () => ({
    theme: { palette: { mode: 'light' } },
    setCountry: jest.fn()
  })
}));


const renderWithProvider = (ui) => render(<Provider store={store}>{ui}</Provider>);

// Test case: Render component and check if elements are displayed
test('renders Profile component with required elements', () => {
  renderWithProvider(<Profile />);

  expect(screen.getByText(/update_profile/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument();
});

// Test case: Display an error message when update fails
test('displays error message when profile update fails', async () => {
  // Adjust the mock to return a failure response
  jest.mock('../Action/authDispatcher', () => ({
    updateProfile: jest.fn(() => (dispatch, callback) => callback({ success: false, message: 'Update failed' }))
  }));

  renderWithProvider(<Profile />);

  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'newpassword' } });
  fireEvent.click(screen.getByRole('button', { name: /Update/i }));

  await waitFor(() => {
    expect(screen.getByText(/Update failed/i)).toBeInTheDocument();
  });
});

// Test case: Form submission with correct payload
test('submits form with correct payload', () => {
  renderWithProvider(<Profile />);

  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'newpassword' } });

  fireEvent.click(screen.getByRole('button', { name: /Update/i }));

  // Check if updateProfile was called with the correct payload
  expect(updateProfile).toHaveBeenCalledWith({
    FirstName: 'Jane',
    LastName: 'Smith',
    cusTechRole: 'Customer',
    email: 'john.doe@example.com',
    pass: 'newpassword',
    Ispromotion: 0 // Assuming the promotion checkbox is unchecked
  }, expect.any(Function));
});
