import React from 'react';
import { fireEvent, getByTestId, getByText, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../login';
import ForgotPassword from '../forgot_password';

jest.mock('axios');

describe('Login component', () => {
  test('successful login', async () => {
    const mockRole = 'User';
    const mockToken = 'mocked_token';

    axios.post.mockResolvedValueOnce({ data: { role: mockRole, token: mockToken } });

    const { getByLabelText, getByTestId, history } = render(
      <Router>
        <Login />
      </Router>
    );

    const loginInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByTestId("submit-input");

    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/user/login', {
        login: 'testuser',
        password: 'testpassword',
      });
    });
  });

  test('password change', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const mockResponse = '200';

    axios.get.mockResolvedValueOnce({ data: mockResponse});

    const { getByLabelText, getByText } = render(
      <Router>
        <ForgotPassword />
      </Router>
    )
    const loginInput = getByLabelText('Your email:');
    const submitButton = getByText("OK");

    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/student/forgot_password/testuser');
    });
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith('New password sent on your email');
  });

});
